(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(27, {"Alternative_logo_url":"https://discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/1/a/1af8f78e6a71039c0f4b560047aa12457471737f.png","Alternative_small_logo_url":"https://discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/4/f/4f42a4d33e16f726c41e4117562c65adabaeb083.png","Alternative_mobile_logo_url":"https://discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/1/a/1af8f78e6a71039c0f4b560047aa12457471737f.png","theme_uploads":{"Copa-horizontal-white":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/1/a/1af8f78e6a71039c0f4b560047aa12457471737f.png","copa-symbol-white":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/4/f/4f42a4d33e16f726c41e4117562c65adabaeb083.png"}});
  }
})();
(function () {
  if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
    var __theme_name__ = "Alternative Logos";
    var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(27);
    var themePrefix = function themePrefix(key) {
      return 'theme_translations.27.' + key;
    };

    Discourse._registerPluginCode('0.8.25', function (api) {
      try {

        api.reopenWidget("home-logo", {
          logoUrl: function logoUrl() {
            return settings.Alternative_logo_url || "";
          },
          mobileLogoUrl: function mobileLogoUrl() {
            return settings.Alternative_mobile_logo_url || "";
          },
          smallLogoUrl: function smallLogoUrl() {
            return settings.Alternative_small_logo_url || "";
          }
        });
      } catch (err) {
        var rescue = require("discourse/lib/utilities").rescueThemeError;
        rescue(__theme_name__, err, api);
      }
    });
  }
})();