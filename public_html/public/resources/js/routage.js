/*
 *---------------------- Routage de angular JS ---------------------------------
 */

var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/login/login.html"
        })
        .when("/accueil", {
            templateUrl: "pages/accueil/accueil.html"
        })
        .when("/allabsences/:id", {
            templateUrl: "pages/allabsences/allabsences.html"
        })
        .when("/allretars/:id", {
            templateUrl: "pages/allretars/allretars.html"
        })
        .when("/retard/:id", {
            templateUrl: "pages/retard/retard.html"
        })
        .when("/sanctions/:id", {
            templateUrl: "pages/sanctions/sanctions.html"
        })
        .when("/notes/:id", {
            templateUrl: "pages/notes/notes.html"
        })
        .when("/informations/:id", {
            templateUrl: "pages/informations/informations.html"
        })
        .when("/paiements/:id", {
            templateUrl: "pages/paiements/paiements.html"
        })
        .when("/etablissement/:id", {
            templateUrl: "pages/etablissement/etablissement.html"
        })
        .when("/classe/:idclasse/:id", {
            templateUrl: "pages/classe/classe.html"
        })
        .when("/salle/:idsalle/:id/:idclasse", {
            templateUrl: "pages/salle/salle.html"
        })
        .when("/absences/:idsalle/:id/:matiere", {
            templateUrl: "pages/absences/absences.html"
        })
        .when("/sms", {
            templateUrl: "pages/sms/sms.html"
        })
        .otherwise({
            redirectTo: '/'
        });
});



