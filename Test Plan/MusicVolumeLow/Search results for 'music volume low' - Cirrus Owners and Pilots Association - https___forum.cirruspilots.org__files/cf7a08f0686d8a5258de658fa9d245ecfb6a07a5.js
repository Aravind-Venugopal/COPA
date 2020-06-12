(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(26, {"Footer_Logo":"https://discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/2/d/2d859868bc267d482875ef56cbeef185e6f5d5b8.png","Footer_Heading":"About COPA","Show_Heading":false,"Footer_Summary":"The Cirrus Owners \u0026 Pilots Association (aka, \"COPA\") is a 501(c)7 non-profit corporation dedicated to serving its members. COPA® is not in any way affiliated with Cirrus Aircraft, the manufacturer. Cirrus is a registered trademark of Cirrus Aircraft.","Link_Sections":"Menu 1, First Menu Column|Menu 2, Second Menu Column","Links":"Menu 1, COPA, https://new.cirruspilots.org/COPA, blank, Visit COPA Website|Menu 1, Articles, https://new.cirruspilots.org/Articles, blank, Read COPA Articles|Menu 1, Events, https://new.cirruspilots.org/Events, blank, See COPA Events|Menu 2, Safety, https://new.cirruspilots.org/Safety, blank, Review COPA Safety|Menu 2, Forums, https://forum.cirruspilots.org, self, Visit COPA Forums|Menu 2, Donate, https://new.copasafety.org, blank, Donate to COPA","Small_Links":"Privacy Policy, https://new.cirruspilots.org/Privacy-Policy, blank|Media Usage, https://new.cirruspilots.org/Online-Media-Usage, blank","Social_Links":"Facebook, Join us on Facebook, https://www.facebook.com/groups/CirrusPilots/, blank, fab-facebook|YouTube, See latest videos on YouTube, https://www.youtube.com/channel/UCnmB9NiMaOqzHe3QyCSZjIQ, blank, fab-youtube","svg_icons":"fab-facebook|fab-instagram|fab-twitter|fab-youtube|fab-linkedin","Copyright":"©2020 Cirrus Owners \u0026 Pilots Association","theme_uploads":{"copalogo":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/copa/original/3X/2/d/2d859868bc267d482875ef56cbeef185e6f5d5b8.png"}});
  }
})();
(function() {
  if ('Ember' in window) {
    Ember.TEMPLATES["/connectors/below-footer/custom-footer"] = Ember.HTMLBars.template({"id":null,"block":"{\"symbols\":[],\"statements\":[[0,\"\\n  \"],[7,\"div\",true],[10,\"style\",\"border-top: 1px solid #DCDCDC; margin-bottom: 20px; width: 100%;\"],[8],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"wrap\"],[8],[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"flexbox\"],[8],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"first-box\"],[8],[0,\"\\n        \"],[7,\"img\",true],[11,\"src\",[29,[[28,\"theme-setting\",[26,\"Footer_Logo\"],null]]]],[10,\"alt\",\"Cirrus Owners & Pilots Association\"],[10,\"style\",\"float: left; margin-right: 40px; display: block; max-width: 100%; height: auto;\"],[8],[9],[0,\"\\n\"],[4,\"if\",[[28,\"theme-setting\",[26,\"Show_Heading\"],[[\"deprecated\"],[true]]]],null,{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"show\"],[8],[0,\"\\n            \"],[1,[28,\"theme-setting\",[26,\"Footer_Heading\"],null],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"hide\"],[8],[0,\"\\n            \"],[1,[28,\"theme-setting\",[26,\"Footer_Heading\"],null],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[7,\"div\",true],[10,\"class\",\"footer-summary\"],[8],[0,\"\\n          \"],[1,[28,\"theme-setting\",[26,\"Footer_Summary\"],null],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"second-box\"],[8],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"links\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"third-box\"],[8],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"social\"],[8],[9],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"footer-links\"],[10,\"style\",\"margin-right: 1em;\"],[8],[9],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"copyright\"],[8],[1,[28,\"theme-setting\",[26,\"Copyright\"],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"footer-dots\"],[8],[9],[0,\"\\n  \"]],\"hasEval\":false}","meta":{}});
  }
})();
(function () {
  if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
    var __theme_name__ = "COPA Footer";
    var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(26);
    var themePrefix = function themePrefix(key) {
      return 'theme_translations.26.' + key;
    };

    Discourse._registerPluginCode('0.8.25', function (api) {
      try {
        var _require = require("discourse-common/lib/icon-library"),
            iconHTML = _require.iconHTML;

        $(document).ready(function () {
          var sec = "",
              seg = "",
              rawMain = "",
              mainUl = "",
              socUl = "",
              footerUl = "",
              parentBase = "";

          sec = $.map(settings.Link_Sections.split("|"), $.trim);
          seg = $.map(settings.Links.split("|"), $.trim);
          soc = $.map(settings.Social_Links.split("|"), $.trim);
          fot = $.map(settings.Small_Links.split("|"), $.trim);

          $.each(sec, function () {
            var sec = $.map(this.split(","), $.trim);
            klass = sec[0].replace(/\s+/g, "-").toLowerCase();
            rawMain += '<div class="list"><span class="' + klass + ' hide" title="' + sec[1] + '">' + sec[0] + '</span><div id="' + klass + '"><ul></ul></div></div>';
          });

          $(".custom-footer .links").html(rawMain);

          $.each(sec, function () {
            var sec = $.map(this.split(","), $.trim),
                parentBase = sec[0].replace(/\s+/g, "-").toLowerCase(),
                mainUl = $("#" + parentBase + " ul").html();

            $.each(seg, function () {
              var seg = $.map(this.split(","), $.trim),
                  parentForItem = seg[0].replace(/\s+/g, "-").toLowerCase(),
                  klass = seg[1];

              if (parentBase == parentForItem) {
                if (seg[3] == "blank") {
                  seg[3] = "_blank";
                  klass += " blank ";
                } else {
                  seg[3] = "";
                }
                if (seg[4] == null || seg[5] == " ") {
                  seg[4] = "";
                }
                mainUl += '<li class="footer-section-link-wrapper ' + klass + '"><a target="' + seg[3] + '" title="' + seg[4] + '" class="footer-section-link" href="' + seg[2] + '">' + seg[1] + "</li>";
                $("#" + parentBase + " ul").html(mainUl);
              }
            });
          });

          $.each(soc, function () {
            var soc = $.map(this.split(","), $.trim);
            klass = soc[0].replace(/\s+/g, "-").toLowerCase();
            iconName = soc[4] || soc[0].toLowerCase();

            if (soc[3] == "blank") {
              target = "_blank";
            } else {
              target = "";
            }
            socUl += '<a class="social-link ' + klass + '" title="' + soc[1] + '" target="' + target + '"href="' + soc[2] + '">' + iconHTML(iconName) + "</a>";
          });

          $(".custom-footer .social").html(socUl);

          $.each(fot, function () {
            var fot = $.map(this.split(","), $.trim);
            klass = fot[0].replace(/\s+/g, "-").toLowerCase();
            if (seg[2] == "blank") {
              target = "_blank";
            } else {
              target = "";
            }
            footerUl += '<a class="small-link ' + klass + '" title="' + fot[1] + '" href="' + fot[1] + '" target="' + target + '">' + fot[0] + "</a>";
          });

          $(".custom-footer .footer-links").html(footerUl);
        });
      } catch (err) {
        var rescue = require("discourse/lib/utilities").rescueThemeError;
        rescue(__theme_name__, err, api);
      }
    });
  }
})();