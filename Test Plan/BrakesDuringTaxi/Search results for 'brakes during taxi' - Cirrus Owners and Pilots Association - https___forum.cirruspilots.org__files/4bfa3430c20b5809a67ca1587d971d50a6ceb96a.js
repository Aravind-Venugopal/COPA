define("discourse/pre-initializers/theme-31-translations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "theme-31-translations",
    initialize: function initialize() {
      /* Translation data for theme 31 (en)*/
      var data = { "en": { "darkmode": { "disable_dark_mode": "Disable automatic Dark Mode theme switching", "enable_dark_mode": "Enable automatic Dark Mode theme switching", "modal_title": "Switching themes", "modal_body": "Please wait while the page reloads..." } } };

      for (var lang in data) {
        var cursor = I18n.translations;
        var _arr = [lang, "js", "theme_translations"];
        for (var _i = 0; _i < _arr.length; _i++) {
          var key = _arr[_i];
          cursor = cursor[key] = cursor[key] || {};
        }
        cursor[31] = data[lang];
      }
    }
  };
});