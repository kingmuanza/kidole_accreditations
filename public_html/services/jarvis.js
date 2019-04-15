/* 
 Récupère des informations
 Calcule des équations : calcul complexes
 Participe aux tâches de conception et d'ingénierie
 */

app.factory('jarvis', function () {

    //Récupération de firebase
    const db = firebase.firestore();

    // JavaScript Promise pour récupérer les informations dans la base de données
    var getCollection = function (collection) {
        var liste = []
        return new Promise(function (resolve, reject) {
            db.collection(collection).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    liste.push(doc.data())
                });
                resolve(liste);
            }).catch((error) => {
                reject(error)
            })
        });
    }


    const jarvis = {
        getCollection: getCollection
    }

    return jarvis;

});


