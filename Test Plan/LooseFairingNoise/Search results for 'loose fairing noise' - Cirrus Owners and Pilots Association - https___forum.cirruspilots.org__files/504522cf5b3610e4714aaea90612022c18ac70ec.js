(function () {
  if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
    var __theme_name__ = "New Like icon";
    var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(30);
    var themePrefix = function themePrefix(key) {
      return 'theme_translations.30.' + key;
    };

    Discourse._registerPluginCode('0.8', function (api) {
      try {

        api.replaceIcon('d-liked', 'thumbs-up');
        api.replaceIcon('d-unliked', 'far-thumbs-up');
        api.replaceIcon('notification.liked', 'far-thumbs-up');
        api.replaceIcon('notification.liked_2', 'far-thumbs-up');
        api.replaceIcon('notification.liked_many', 'far-thumbs-up');
        api.replaceIcon('notification.liked_consolidated', 'far-thumbs-up');
        api.replaceIcon('heart', 'thumbs-up');
      } catch (err) {
        var rescue = require("discourse/lib/utilities").rescueThemeError;
        rescue(__theme_name__, err, api);
      }
    });
  }
})();