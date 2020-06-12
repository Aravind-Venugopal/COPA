(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(31, {"dark_theme_id":"1","dark_theme_switch_on_by_default":true});
  }
})();
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["dark-mode/connectors/user-preferences-interface/add-darkmode-options"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[4,\"if\",[[24,[\"isCurrentUser\"]]],null,{\"statements\":[[4,\"if\",[[24,[\"darkThemeSwitchOnByDefault\"]]],null,{\"statements\":[[0,\"  \\t\"],[1,[28,\"preference-checkbox\",null,[[\"labelKey\",\"checked\"],[[28,\"theme-prefix\",[31,\"darkmode.disable_dark_mode\"],null],[24,[\"model\",\"disableDarkMode\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \\t\"],[1,[28,\"preference-checkbox\",null,[[\"labelKey\",\"checked\"],[[28,\"theme-prefix\",[31,\"darkmode.enable_dark_mode\"],null],[24,[\"model\",\"enableDarkMode\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{}});
  }
})();

define("dark-mode/connectors/user-preferences-interface/add-darkmode-options", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var __theme_name__ = "Discourse Dark Mode";
	var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(31);
	var themePrefix = function themePrefix(key) {
		return "theme_translations.31." + key;
	};
	function prefValue(name) {
		var pref = localStorage.getItem(name);
		if (pref !== null && pref === "true") {
			return true;
		}
		return false;
	}

	exports.default = {
		setupComponent: function setupComponent(args, component) {
			if (component.currentUser.id === component.model.id) {
				component.set("isCurrentUser", true);
			}

			component.set("darkThemeSwitchOnByDefault", settings.dark_theme_switch_on_by_default);

			component.set("model.disableDarkMode", prefValue("disableDarkMode"));
			component.set("model.enableDarkMode", prefValue("enableDarkMode"));
		}
	};
});
define("discourse/initializers/dark-mode", ["exports", "discourse/lib/theme-selector", "discourse/lib/plugin-api", "discourse/lib/show-modal", "discourse/models/site"], function (exports, _themeSelector, _pluginApi, _showModal, _site) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var __theme_name__ = "Discourse Dark Mode";
	var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(31);
	var themePrefix = function themePrefix(key) {
		return "theme_translations.31." + key;
	};
	exports.default = {
		name: "discourse-dark-mode",
		initialize: function initialize() {
			(0, _pluginApi.withPluginApi)("0.8.31", function (api) {
				var currentUser = api.getCurrentUser();
				var selectedUserSetting = settings.dark_theme_switch_on_by_default ? "disableDarkMode" : "enableDarkMode";

				var browserInDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

				var themes = _site.default._current.user_themes;

				function defaultThemeId() {
					var default_theme = themes.filter(function (theme) {
						return theme.default === true;
					})[0];

					if (default_theme.theme_id) {
						return parseInt(default_theme.theme_id);
					}

					return -1;
				}

				function switchingDisabled() {
					var pref = localStorage.getItem(selectedUserSetting);

					if (selectedUserSetting === "disableDarkMode") {
						if (pref !== null && pref === "true") {
							return true;
						}
						return false;
					} else {
						if (pref !== null && pref === "true") {
							return false;
						}
						return true;
					}
				}

				function toggleDarkTheme(e) {
					if (!currentUser) return;

					var darkThemeId = parseInt(settings.dark_theme_id),
					    currentThemeId = _themeSelector.default.currentThemeId();

					if (switchingDisabled() || !darkThemeId || defaultThemeId() === darkThemeId) {
						return;
					}

					var dark_theme = themes.filter(function (theme) {
						return theme.theme_id === darkThemeId;
					});
					if (dark_theme.length !== 1) {
						return;
					}

					if (browserInDarkMode.matches && currentThemeId !== darkThemeId && currentThemeId === defaultThemeId()) {
						setTheme(darkThemeId);
					}

					if (!browserInDarkMode.matches && currentThemeId === darkThemeId) {
						setTheme(defaultThemeId());
					}
				}

				function setTheme(themeId) {
					setTimeout(function () {
						// delay and visibilityState check
						// needed because of a Safari iOS bug
						// that triggers matchMedia listener
						// while turning off screen
						if (document.visibilityState !== "hidden") {
							currentUser.findDetails().then(function (user) {
								var seq = user.get("user_option.theme_key_seq");
								_themeSelector.default.setLocalTheme([themeId], seq);
								(0, _showModal.default)("dark-mode-modal");
								window.location.reload();
							});
						}
					}, 500);
				}

				browserInDarkMode.addListener(toggleDarkTheme);

				var domReady = function domReady(callback) {
					document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
				};

				domReady(function () {
					toggleDarkTheme();
				});

				api.modifyClass("controller:preferences/interface", {
					actions: {
						save: function save() {
							this._super();
							if (this.get("model.username") === currentUser.get("username")) {
								localStorage.setItem(selectedUserSetting, this.get("model." + selectedUserSetting).toString());
							}
						}
					}
				});
			});
		}
	};
});
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["modal/dark-mode-modal"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[4,\"d-modal-body\",null,[[\"class\",\"title\"],[\"dark-mode-modal\",[28,\"theme-prefix\",[31,\"darkmode.modal_title\"],null]]],{\"statements\":[[0,\"\\t\"],[1,[28,\"i18n\",[[28,\"theme-prefix\",[31,\"darkmode.modal_body\"],null]],null],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}","meta":{}});
  }
})();

