app.factory('jarvis', function () {

    var etablissement = localStorage.getItem('etablissement')
    etablissement = JSON.parse(etablissement)
    firebase.firestore().settings({ timestampsInSnapshots: true })
    var db = firebase.firestore();
    var userString = localStorage.getItem('EduUser');
    var userJSON = JSON.parse(userString)
    console.log("user")
    console.log(userString)
    console.log(userJSON)

    var language = {
        "sProcessing": "Chargement...",
        "sLengthMenu": "Afficher _MENU_ élements",
        "sZeroRecords": "Aucun résultat",
        "sEmptyTable": "Aucune donnée disponible",
        "sInfo": "De _START_ à _END_ sur un total de _TOTAL_ éléments",
        "sInfoEmpty": "De 0 à 0 sur un total de 0 éléments",
        "sInfoFiltered": "",
        "sInfoPostFix": "",
        "sSearch": "Rechercher : ",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Suivant",
            "sPrevious": "Précédent"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }


    var jarvis = {
        etablissement: etablissement,
        periode: 2000,
        db: db,
        getLocalEleves: function () {
            var elevesString = localStorage.getItem('eleves')
            if (elevesString) {
                return JSON.parse(elevesString)
            } else {
                return []
            }
        },
        getEleves: function (code) {
            console.log("JARVIS JARVIS JARVIS")
            console.log("recherche des eleves...")
            db.collection("eleve")
                //.where("etablissement", "==", controller.etablissement.code)
                .get().then((querySnapshot) => {
                    var eleves = []
                    querySnapshot.forEach((doc) => {
                        //console.log(doc.id);
                        var eleve = doc.data();
                        //console.log(eleve);
                        eleves.push(eleve)
                    });
                    localStorage.setItem('eleves', JSON.stringify(eleves));
                });
        },
        uid: function () {
            var firstPart = (Math.random() * 466560123) | 0;
            var secondPart = (Math.random() * 466560123) | 0;
            var s3 = (Math.random() * 466560123) | 0;
            var s4 = (Math.random() * 466560123) | 0;
            firstPart = ("000" + firstPart.toString(36)).slice(-3);
            secondPart = ("000" + secondPart.toString(36)).slice(-3);
            s3 = ("000" + s3.toString(36)).slice(-3);
            s4 = ("000" + s4.toString(36)).slice(-3);
            return firstPart + secondPart + s3 + s4
        },
        formatDateDay: function (timestamp) {
            //console.log(timestamp.seconds);
            var d = new Date(timestamp.seconds * 1000);
            return d.toISOString().split('T')[0];
        },
        initDataTable: function (id_table, id_creation, controller, colonnes) {
            var data = controller.items
            var columns = []
            for (var i = 0; i < colonnes.length; i++) {
                var col = { "data": colonnes[i] }
                columns.push(col)
            }
            columns.push({ "data": "user" })
            console.log("Init datatable")
            var table = $(id_table).DataTable({
                language: language,
                order: [[0, "desc"], [1, "asc"]],
                destroy: true,
                data: data,
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Nouveau',
                        className: "btn btn-dark btn-sm btn-muanza",
                        action: function (e, dt, node, config) {
                            $(id_creation).modal('show')
                        }
                    },
                    {
                        text: 'Actualiser',
                        className: "btn btn-dark btn-sm btn-muanza",
                        action: function (e, dt, node, config) {
                            controller.getAll(controller.collection);
                        }
                    },
                    {
                        extend: 'excel',
                        text: 'Exporter Excel',
                        className: 'btn btn-dark btn-sm'
                    },
                    {
                        extend: 'pdf',
                        text: 'Exporter PDF',
                        className: 'btn btn-dark btn-sm'
                    }

                ],
                "columns": columns,
                "createdRow": function (row, data, index) {
                    $(row).data("item", data)
                }
            });
            $('.dt-button').addClass("btn btn-dark btn-sm btn-muanza")
            $('.paginate_button').addClass("btn btn-dark btn-sm btn-muanza no-radius")

        },
        getUser:function(){
            if(userJSON){
                return userJSON.email
            }else{
                return "Aucun utilisateur"
            }
        },
        save: function (item, crtl) {
            item["user"] = userJSON.email
            db.collection(crtl.collection).doc(item.id).set(item).then((e) => {
                //Réinitialisation 
                crtl.init()
            })
        },
        supprimer: function (item, ctrl) {
            if (confirm("Etes-vous sûr de vouloir supprimer ?")) {
                db.collection(ctrl.collection).doc(item.id).delete().then(function () {
                    console.log("Information successfully deleted!")
                    ctrl.init()
                })
            }
        },
        formatPrix: function (prix) {
            return accounting.formatNumber(prix, 0, " ")
        }
    }
    return jarvis
});