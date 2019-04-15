/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CompetitionsController = app.controller('CompetitionsController', function ($scope, $interval, jarvis, ultron, vision) {


    console.log("CompetitionsController");
    controller = this;
    controller.competitions;
    jarvis.getCollection("competitions").then((competitions)=>{
        console.log(competitions)
    })

});


