angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/components/404/404.tpl.html","<h1>404</h1>\n<h2>Page non trouvée</h2>\n");
$templateCache.put("app/components/charity-choice/charity-choice.tpl.html","<section class=\"container\" id=\"charity-choice\">\n  <section class=\"forms-container\">\n    <section class=\"form-wrapper\">\n      <header>\n        <h1>Quelle association souhaitez-vous soutenir ?</h1>\n      </header>\n      <div class=\"form-body\">\n        <div id=\"charity-choice-wrapper\">\n          <div id=\"charity-choice-side\">\n            <ul id=\"charity-choice-list\">\n              <li class=\"charity-choice-list-item\" ng-repeat=\"charity in charities\" >\n                <div class=\"charity-choice-list-item-wrapper\" ng-class=\"{\'selected\': charity.urn == selected_charity.urn}\" ng-click=\"selectCharity(charity)\">\n                  <img class=\"charity-choice-list-item-icon\" ng-src=\"{{charity.icon}}\">\n                  <div class=\"charity-choice-list-item-name\">{{charity.name}}</div>\n                  <div class=\"charity-choice-list-item-check\"></div>\n                </div>\n                <div class=\"charity-choice-list-item-caret\">\n                  <img src=\"assets/img/caret_right.png\" alt=\"\" / ng-show=\"(charity.urn == selected_charity.urn)\">\n                </div>\n              </li>\n            </ul>\n          </div>\n          <div id=\"charity-choice-content\">\n            <div id=\"charity-choice-content-title\">\n              {{selected_charity.title}}\n            </div>\n            <img id=\"charity-choice-content-picture\" ng-src=\"{{selected_charity.picture}}\">\n            <div id=\"charity-choice-content-hangs\">\n              {{selected_charity.hangs}}\n            </div>\n            <div id=\"charity-choice-content-description\">\n              {{selected_charity.description}}\n            </div>\n            <div id=\"charity-choice-content-usages-title\">\n              À quoi vont servir les dons :\n            </div>\n            <ul id=\"charity-choice-content-usages\">\n              <li ng-repeat=\"usage in selected_charity.usages\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> {{usage}}</li>\n            </ul>\n            <a href=\"{{selected_charity.url}}\" id=\"charity-choice-content-url\" target=\"_blank\">{{selected_charity.url}}</a>\n          </div>\n        </div>\n        <div class=\"button\" ng-click=\"sumbitSelectedCharity()\">Valider</div>\n      </div>\n    </section>\n</section>\n");
$templateCache.put("app/components/dashboard/dashboard.tpl.html","\n");
$templateCache.put("app/components/login/login.tpl.html","<section class=\"container\" id=\"login\">\n  <section class=\"forms-container\">\n\n    <section class=\"form-wrapper reverse\">\n      <header>\n        <h1>Rentrez vos identifiants</h1>\n      </header>\n      <div class=\"form-body\">\n        <form class=\"form-text\" name=\"formText\" ng-submit=\"login(user)\" novalidate>\n          <input type=\"email\" ng-model=\"user.email\" placeholder=\"Votre adresse email\"/><br />\n          <input type=\"password\" ng-model=\"user.password\" placeholder=\"Votre mot de passe\"/ ng-minlength=\"6\">\n          <div class=\"form-next-wrapper\">\n            <button class=\"button\" type=\"submit\" ng-disabled=\"formText.$invalid\"/>Connexion</button>\n          </div>\n        </form>\n      </div>\n    </section>\n    \n  </section>\n</section>\n");
$templateCache.put("app/components/register/register.tpl.html","<section class=\"container\">\n  <section class=\"forms-container\">\n    <section class=\"form-wrapper reverse\" ng-if=\"step == 1\">\n      <header>\n        <h1>Vous êtes quelqu\'un d\'incroyable</h1>\n        <h2>Le monde caricatif à besoin de gens comme vous !</h2>\n      </header>\n      <div class=\"form-body\">\n        <form class=\"form-text\" name=\"formRegisterMail\" ng-submit=\"submitFormRegisterMail()\" novalidate>\n          <label>Votre e-mail pour être alerté des sondages à venir :</label>\n          <input type=\"email\" ng-model=\"userCredentials.email\" ng-required=\"true\" placeholder=\"mon email\" />\n          <div class=\"form-next-wrapper\">\n            <!-- <div class=\"left-col\" id=\"register-mail\">TEST</div> -->\n            <button class=\"button\" type=\"submit\" ng-disabled=\"formRegisterMail.$invalid\" />Valider</button>\n          </div>\n        </form>\n      </div>\n\n    </section>\n\n    <section class=\"form-wrapper reverse\" ng-if=\"step == 2\">\n      <header>\n        <h1>Créez votre mot de passe</h1>\n        <h2>Pour un mot de passe efficace, 6 caractères minimum ;)</h2>\n      </header>\n      <div class=\"form-body\">\n        <form class=\"form-text\" name=\"formRegisterPassword\" ng-submit=\"submitFormRegisterPassword()\" novalidate>\n          <input type=\"password\" ng-model=\"userCredentials.password\" ng-required=\"true\" placeholder=\"Mon mot de passe\" ng-minlength=\"6\" />\n          <div class=\"form-next-wrapper\">\n            <button class=\"button\" type=\"submit\" ng-disabled=\"formRegisterPassword.$invalid\" />Valider</button>\n          </div>\n        </form>\n      </div>\n    </section>\n  </section>\n</section>\n");
$templateCache.put("app/components/survey/survey.tpl.html","\n<section class=\"container\" ui-view id=\"item-form-view\">\n  <form-wrapper></form-wrapper>\n</section>\n<form-progress-bar></form-progress-bar>\n");
$templateCache.put("app/partials/header/header.tpl.html","<header>\n  <div id=\"header-blue-border\">\ntest\n  </div>\n  <div id=\"header-wrapper\">\n    <div class=\"container\">\n      <img id=\"logo\" src=\"assets/img/abibao_logo.png\" srcset=\"assets/img/abibao_logo@2x.png 2x,\n            assets/img/abibao_logo@3x.png 3x\" alt=\"\" />\n      <nav>\n        <ul>\n          <!-- <li><a href=\"#\">Qui sommes-nous ?</a></li> -->\n          <!-- <li><a href=\"#\">Télécharger l\'application</a></li> -->\n          <li id=\"signin\" ng-hide=\"isLoggedIn\"><a ui-sref=\"register\">S\'inscrire</a></li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n</header>\n");
$templateCache.put("app/common/directives/forms-directives/forms.directive.tpl.html","<!--\nABIBAO_COMPONENT_MULTIPLE_CHOICE\nABIBAO_COMPONENT_NUMBER\nABIBAO_COMPONENT_DROPDOWN\n\nABIBAO_COMPONENT_SHORT_TEXT\nABIBAO_COMPONENT_LONG_TEXT\nABIBAO_COMPONENT_YES_NO\n -->\n\n<section class=\"forms-container\">\n  <section class=\"form-wrapper\" ng-class=\"{reverse:reverse}\">\n    <header>\n      <img\n        ng-if=\"progress.current > 1\"\n        class=\"form-nav previous\"\n        src=\"assets/img/survey/fleche_retour.png\"\n        srcset=\"assets/img/survey/fleche_retour@2x.png 2x,\n              assets/img/survey/fleche_retour@3x.png 3x\"\n        alt=\"\"\n        ng-click=\"previous()\"/>\n      <img\n        ng-if=\"progress.maxIndex > progress.current\"\n        class=\"form-nav next\"\n        src=\"assets/img/survey/fleche_suivant.png\"\n        srcset=\"assets/img/survey/fleche_suivant@2x.png 2x,\n              assets/img/survey/fleche_suivant@3x.png 3x\"\n        alt=\"\"\n        ng-click=\"next()\"/>\n      <h1>{{item.question}}</h1>\n      <h2>{{item.description}}</h2>\n    </header>\n    <div class=\"form-body\">\n      <div ng-switch=\"item.type\">\n        <div ng-switch-when=\"ABIBAO_COMPONENT_NUMBER\" form-number></div>\n        <form-multiple-choice ng-switch-when=\"ABIBAO_COMPONENT_MULTIPLE_CHOICE\" item=\"item\" submit-answer=\"submitAnswer\"></form-multiple-choice>\n        <form-dropdown ng-switch-when=\"ABIBAO_COMPONENT_DROPDOWN\" item=\"item\" submit-answer=\"submitAnswer\"></form-dropdown>\n        <div ng-switch-when=\"ABIBAO_COMPONENT_YES_NO\" form-yes-no></div>\n        <div ng-switch-when=\"ABIBAO_COMPONENT_SHORT_TEXT\" form-text></div>\n      </div>\n    </div>\n  </section>\n</section>\n");
$templateCache.put("app/components/messages/all-finished/all-finished.tpl.html","<section class=\"container message-page\" id=\"thank-you\">\n  <section class=\"forms-container\">\n    <section class=\"form-wrapper reverse\">\n      <header>\n        <h1>Bravo !</h1>\n        <h2>Vous faites partie des gens exceptionnels qui ont complétés tous leurs centres d’intérêts.</h2>\n      </header>\n      <div class=\"form-body\">\n        <div id=\"message-page-wrapper\">\n          <div class=\"message-page-col col-1\">\n            <div class=\"message-page-col-thumb\">\n              <img src=\"assets/img/survey/thumb_up.png\" alt=\"\" />\n            </div>\n            <h3 class=\"message-page-col-title\">Vous n’avez rien à faire, on s’occupe de tout</h3>\n            <p class=\"message-page-col-description\">\n              Notre job c’est maintenant de trouver des entreprises pour diffuser des sondages auprès d’un profil comme le vôtre. Dès que l’occasion se présentera, vous recevrez un E-MAIL avec un lien pour répondre directement.\n            </p>\n          </div>\n        </div>\n      </div>\n    </section>\n</section>\n");
$templateCache.put("app/components/messages/email-sended/email-sended.tpl.html","<section class=\"container message-page\" id=\"email-sended\">\n  <section class=\"forms-container\">\n    <section class=\"form-wrapper reverse\">\n      <header>\n        <h1>Vous êtes admirable !</h1>\n        <h2>C’est avec des gens comme vous que de grandes choses sont possibles.</h2>\n      </header>\n      <div class=\"form-body\">\n        <div id=\"message-page-wrapper\">\n          <div class=\"message-page-col col-1\">\n            <div class=\"message-page-col-thumb\">\n              <img src=\"assets/img/survey/mail.png\" alt=\"\" />\n            </div>\n            <h3 class=\"message-page-col-title\">Un email vous a été envoyé,<br />pour vous montrer à quel point c’est facile !</h3>\n            <p class=\"message-page-col-description\">\n              Quand un sondage correspond à vos centres d’intérêts, nous vous alertons par email. Vous n’avez rien à faire, on s’occupe de tout. Pour vérifier que tout fonctionne correctement, nous venons de vous envoyer un message à votre adresse. Cela vous donnera un aperçu de la facilité avec laquelle vous allez pouvoir aider de beaux projets.\n            </p>\n          </div>\n        </div>\n      </div>\n    </section>\n</section>\n");
$templateCache.put("app/components/messages/thank-you-1/thank-you-1.tpl.html","<section class=\"container message-page\" id=\"thank-you\">\n  <section class=\"forms-container\">\n    <section class=\"form-wrapper reverse\">\n      <header>\n        <h1>Vous voilà membre d\'Abibao</h1>\n        <h2>Merci ! Le plus dur est fait, mais vous pouvez aller plus loin pour aider votre associations.</h2>\n      </header>\n      <div class=\"form-body\">\n        <div id=\"message-page-wrapper\">\n          <div class=\"message-page-col col-1\">\n            <div class=\"message-page-col-thumb\">\n              <img src=\"assets/img/survey/recolte.png\" alt=\"\" />\n            </div>\n            <h3 class=\"message-page-col-title\">Encore quelques questions pour la bonne cause</h3>\n\n            <p class=\"message-page-col-description\">\n              Savoir si vous aimez le café, si vous avez un jardin ou encore si vous préférez les chats nous permet de convaincre plus facilement les entreprises de diffuser leurs sondages sur Abibao. Plus nous avons d’informations sur vos habitudes, plus vous avez de chances de recevoir des sondages.\nPS : Toutes vos réponses restent anonymes. Vous pouvez nous faire confiance.\n            </p>\n          </div>\n        </div>\n        <div class=\"button\" ng-click=\"nextState()\">Répondre aux questions</div>\n      </div>\n    </section>\n</section>\n");
$templateCache.put("app/common/directives/forms-directives/form-progress-bar/forms.progress-bar.tpl.html"," <div ng-if=\"progress && progress.current && progress.current <= progress.max\" class=\"progress\" style=\"min-width:{{progressWidth}}%;\">\n  QUESTION {{progress.current}}/{{progress.max}}\n </div>\n");
$templateCache.put("app/common/directives/forms-directives/form-components/dropdown/form.dropdown.tpl.html","<form id=\"form-dropdown\"\n  name=\"$ctrl.formDropdown\"\n  novalidate\n  ng-submit=\"$ctrl.submitChoice($ctrl.selected)\">\n  <select\n    ng-options=\"choice.urn as choice.text for choice in $ctrl.item.choices\" ng-class=\"{default:!$ctrl.selected}\"\n    ng-model=\"$ctrl.selected\"\n    ng-required=\"true\">\n    <option ng-if=\"$ctrl.item.placeholder\" value=\"\">{{$ctrl.item.placeholder}}</option>\n  </select>\n  <button class=\"button\" type=\"submit\" ng-disabled=\"$ctrl.formDropdown.$invalid\"/>Suivant</button>\n</form>\n");
$templateCache.put("app/common/directives/forms-directives/form-components/multiple-choice/form.multiplechoice.tpl.html","<form id=\"form-multiple-choice\" novalidate>\n  <div class=\"choices-wrapper\">\n    <button ng-repeat=\"choice in $ctrl.item.choices\" class=\"button choice\" ng-click=\"$ctrl.selectChoice(choice)\" ng-class=\"{\'selected\' : choice.selected}\">{{choice.text}}</button>\n  </div>\n  <button\n    class=\"button submit\"\n    ng-if=\"$ctrl.item.multipleSelections\"\n    ng-click=\"$ctrl.submitChoice()\"\n    >\n    Valider\n  </button>\n</form>\n");
$templateCache.put("app/common/directives/forms-directives/form-components/number/form.number.directive.tpl.html","<form id=\"form-number\" name=\"formNumber\" ng-submit=\"submitAnswer({label:item.label, answer:answer})\" novalidate>\n  <input\n    type=\"number\"\n    ng-model=\"answer\"\n    min=\"{{item.minimum}}\"\n    ng-required=\"{{item.required}}\"\n    placeholder=\"{{item.placeholder}}\"\n  />\n  <button class=\"button\" type=\"submit\" ng-disabled=\"formNumber.$invalid\"/>Valider</button>\n</form>\n");
$templateCache.put("app/common/directives/forms-directives/form-components/text/form.text.directive.tpl.html","<form class=\"form-text\" name=\"formText\" ng-submit=\"submitAnswer({label:item.label, answer:answer})\" novalidate>\n  <label>{{item.inputLabel}}</label>\n  <input\n    type=\"text\"\n    ng-model=\"answer\"\n    ng-required=\"{{item.required}}\"\n    placeholder=\"{{item.placeholder}}\"\n    ng-minlength=\"{{item.minlength}}\"\n    ng-maxlength=\"{{item.maxlength}}\"\n  />\n  <!-- ng-pattern=\"{{item.pattern}}\" -->\n\n  <div class=\"form-next-wrapper\">\n    <div ng-switch=\"item.leftcol\">\n      <div ng-switch-when=\"LEFT_COL_REGISTER_MAIL\" class=\"left-col\" id=\"register-mail\">\n          TEST\n      </div>\n    </div>\n    <button class=\"button\" type=\"submit\" ng-disabled=\"formText.$invalid\"/>Valider</button>\n  </div>\n</form>\n");
$templateCache.put("app/common/directives/forms-directives/form-components/yes-no/form.yes-no.tpl.html","<form id=\"form-yes-no\" novalidate>\n  <button class=\"button\" type=\"submit\" ng-click=\"submitAnswer({label:item.label, answer:\'yes\'})\"/>Oui</button>\n  <button class=\"button\" type=\"submit\" ng-click=\"submitAnswer({label:item.label, answer:\'no\'})\"/>Non</button>\n</form>\n");}]);