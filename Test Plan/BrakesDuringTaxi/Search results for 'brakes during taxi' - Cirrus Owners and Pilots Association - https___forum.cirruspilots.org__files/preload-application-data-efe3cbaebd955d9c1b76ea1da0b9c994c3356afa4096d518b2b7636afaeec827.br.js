!function(){var s=require("preload-store").default,e=document.getElementById("data-preloaded"),r=document.getElementById("data-discourse-setup").dataset;if(e){var o=JSON.parse(e.dataset.preloaded);Object.keys(o).forEach(function(e){s.store(e,JSON.parse(o[e])),"true"===r.debugPreloadedAppData&&console.log(e,s.get(e))})}window.Logster=window.Logster||{},window.Logster.enabled="true"===r.enableJsErrorReporting,Discourse.CDN=r.cdn,Discourse.BaseUrl=r.baseUrl,Discourse.BaseUri=r.baseUri,Discourse.Environment=r.environment,Discourse.SiteSettings=s.get("siteSettings"),Discourse.ThemeSettings=s.get("themeSettings"),Discourse.LetterAvatarVersion=r.letterAvatarVersion,Discourse.MarkdownItURL=r.markdownItUrl,Discourse.ServiceWorkerURL=r.serviceWorkerUrl,I18n.defaultLocale=r.defaultLocale,Discourse.start(),Discourse.set("assetVersion",r.assetVersion);var t=require("discourse/models/session").default;t.currentProp("disableCustomCSS","true"===r.disableCustomCss),r.safeMode&&t.currentProp("safe_mode",r.safeMode),Discourse.HighlightJSPath=r.highlightJsPath,Discourse.SvgSpritePath=r.svgSpritePath,"development"===Discourse.Environment&&(Discourse.SvgIconList=r.svgIconList),r.s3BaseUrl&&(Discourse.S3CDN=r.s3Cdn,Discourse.S3BaseUrl=r.s3BaseUrl),Ember.RSVP.configure("onerror",function(e){e&&"TransitionAborted"===e.message||("development"===Discourse.Environment&&(e?e.message||e.stack?(console.log(e.message),console.log(e.stack)):console.log("Uncaught promise: ",e):console.log("A promise failed but was not caught.")),window.onerror(e&&e.message,null,null,null,e))})}();
//# sourceMappingURL=https://sjc5.discourse-cdn.com/copa/assets/preload-application-data-efe3cbaebd955d9c1b76ea1da0b9c994c3356afa4096d518b2b7636afaeec827.js.map