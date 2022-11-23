const SkyeQ = {

    interval: null,
    identifier: null,
    queue: null,

    init: function () {

        // Udate timestamp
        SkyeQ.interval = setInterval(function () {
            modelMaster.refresh(true);
        }, 1000);

    },

    calcWaitingTime: function () {

        if (!SkyeQ.queue) return;

        let numInQueue = 0;
        let index = 0;

        modelMaster.oData.master.forEach(function (data) {

            // Filter
            if (data.status === 3) return;
            if (data.queue !== SkyeQ.queue.id) return;

            index++;

            if (data.identifier === SkyeQ.identifier) {
                if (data.status === 1) data.highlight = "Warning";
                if (data.status === 2) data.highlight = "Success";
                numInQueue = index;
            }

        });

        statusHeader.setNumber(numInQueue);
        modelMaster.refresh(true);

    },

    setQueueStatus: function () {

        const maxQueueNew = 20;
        const maxQueuePro = 20;

        let status = {};


        modelMaster.oData.master.forEach(function (data) {
            if (!status[data.queue]) status[data.queue] = { new: 0, pro: 0 };
            if (data.status === 1) status[data.queue].new++;
            if (data.status === 2) status[data.queue].pro++;
        });

        modelMaster.oData.queue.forEach(function (data) {

            if (!status[data.id]) status[data.id] = { new: 0, pro: 0 };

            data.totNew = status[data.id].new;
            data.totPro = status[data.id].pro;

            data.percentNew = (100 / maxQueueNew) * data.totNew;
            data.percentPro = (100 / maxQueuePro) * data.totPro;
        });

        modelMaster.refresh(true);

    },

    completeOrder: function () {

        oApp.to(oPageStart);
        diaCompleted.open();

    },

    controller: function (payload) {

        switch (payload.process) {

            case "updateQueue":
                ModelData.Update(modelMaster.oData.master, "id", payload.data.id, payload.data);

                if (payload.data.identifier === SkyeQ.identifier && payload.data.status === 3) {
                    SkyeQ.completeOrder();
                } else {
                    SkyeQ.calcWaitingTime();
                }

                SkyeQ.setQueueStatus();
                break;

            case 'leaveQueue':
                ModelData.Delete(modelMaster.oData.master, "id", payload.data.id);
                SkyeQ.setQueueStatus();
                SkyeQ.data = null;
                break;

            case 'rateOrder':
                break;

            default:
                console.log('process not handled');
                break;
        }


    },

    leaveQueue: function () {

        oApp.to(oPageStart);

        triggerEventServer({
            process: "leaveQueue",
            data: {
                identifier: SkyeQ.identifier
            }
        });

    },

    enterQueue: function () {

        inoSimpleFormname.setValueState("None");

        if (!modeloPageUser.oData.name) {
            inoSimpleFormname.setValueState("Error");
            return;
        }

        statusHeader.setIntro(SkyeQ.queue.name);
        statusHeader.setIcon(SkyeQ.queue.icon);
        tabStatus.getBinding("items").filter([new sap.ui.model.Filter("queue", "EQ", SkyeQ.queue.id), new sap.ui.model.Filter("status", "NE", 3)]);
        oApp.to(oPageQueue);

        SkyeQ.identifier = ModelData.genID();

        triggerEventServer({
            process: "updateQueue",
            data: {
                name: modeloPageUser.oData.name,
                phone: modeloPageUser.oData.phone,
                email: modeloPageUser.oData.email,
                note: modeloPageUser.oData.note,
                queue: SkyeQ.queue.id,
                identifier: SkyeQ.identifier,
                status: 1
            }
        });

    }

}
