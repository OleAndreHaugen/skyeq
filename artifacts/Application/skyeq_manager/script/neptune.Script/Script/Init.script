// Init
jQuery.sap.require("sap.ui.core.format.DateFormat")
jQuery.sap.require('sap.ui.layout.cssgrid.GridBoxLayout');

sap.ui.getCore().attachInit(function (startParams) {

    setTimeout(function () {

        gridNew.setCustomLayout(new sap.ui.layout.cssgrid.GridBoxLayout({
            boxWidth: "15.6rem"
        }));

        gridNew.getBinding("items").filter([new sap.ui.model.Filter("status", "EQ", 1)]);

        gridNew.getBinding("items").sort(new sap.ui.model.Sorter("queue", false, function (context) {
            var data = context.getObject();
            var rec = ModelData.FindFirst(modelMaster.oData.queue, "id", data.queue);
            return { key: rec.name, text: rec.name };
        }));


        gridProcessing.setCustomLayout(new sap.ui.layout.cssgrid.GridBoxLayout({
            boxWidth: "15.6rem"
        }));

        gridProcessing.getBinding("items").filter([new sap.ui.model.Filter("status", "EQ", 2)]);

        gridProcessing.getBinding("items").sort(new sap.ui.model.Sorter("queue", false, function (context) {
            var data = context.getObject();
            var rec = ModelData.FindFirst(modelMaster.oData.queue, "id", data.queue);
            return { key: rec.name, text: rec.name };
        }));


        gridCompleted.setCustomLayout(new sap.ui.layout.cssgrid.GridBoxLayout({
            boxWidth: "15.6rem"
        }));

        gridCompleted.getBinding("items").filter([new sap.ui.model.Filter("status", "EQ", 3)]);

        gridCompleted.getBinding("items").sort(new sap.ui.model.Sorter("queue", false, function (context) {
            var data = context.getObject();
            var rec = ModelData.FindFirst(modelMaster.oData.queue, "id", data.queue);
            return { key: rec.name, text: rec.name };
        }));


    }, 100);

});

// Start
SkyeQ.init();