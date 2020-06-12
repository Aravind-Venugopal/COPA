(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(23, {"Header_Links":"COPA Website, Go to COPA website, https://copa.idramp.com/saml20/endpoint/idpinit/838c34fcc4014593bb8c04b1632c3169, vdm, self, keep","Links_Position":"right"});
  }
})();
(function () {
  if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
    var __theme_name__ = "COPA Header";
    var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(23);
    var themePrefix = function themePrefix(key) {
      return 'theme_translations.23.' + key;
    };

    Discourse._registerPluginCode('0.8.20', function (api) {
      try {

        var copaHeaderLinks = settings.Header_Links;
        var linksPosition = settings.Links_Position === "right" ? "header-buttons:before" : "home-logo:after";

        if (!copaHeaderLinks.length) return;

        var h = require("virtual-dom").h;
        var headerLinks = [];

        copaHeaderLinks.split("|").map(function (i) {
          var seg = $.map(i.split(","), $.trim);
          var linkText = seg[0];
          var linkTitle = seg[1];
          var linkHref = seg[2];
          var deviceClass = '.' + seg[3];
          var linkTarget = seg[4] === "self" ? "" : "_blank";
          var keepOnScrollClass = seg[5] === "keep" ? ".keep" : "";
          var linkClass = '.' + linkText.trim().toLowerCase().replace(/\s/gi, '-');

          if (!linkTarget) {
            headerLinks.push(h('li.headerLink' + deviceClass + keepOnScrollClass + linkClass, h("a", {
              title: linkTitle,
              href: linkHref
            }, linkText)));
          } else {
            headerLinks.push(h('li.headerLink' + deviceClass + keepOnScrollClass + linkClass, h("a", {
              title: linkTitle,
              href: linkHref,
              target: linkTarget
            }, linkText)));
          }
        });

        api.decorateWidget(linksPosition, function (helper) {
          return helper.h("ul.copa-header-links", headerLinks);
        });

        api.decorateWidget("home-logo:after", function (helper) {
          var titleVisible = helper.attrs.minimized;
          if (titleVisible) {
            $(".d-header").addClass("hide-menus");
          } else {
            $(".d-header").removeClass("hide-menus");
          }
        });
      } catch (err) {
        var rescue = require("discourse/lib/utilities").rescueThemeError;
        rescue(__theme_name__, err, api);
      }
    });
  }
})();