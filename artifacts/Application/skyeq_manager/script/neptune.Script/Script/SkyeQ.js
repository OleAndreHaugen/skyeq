const SkyeQ = {

    interval: null,

    init: function () {

        // Udate timestamp
        // SkyeQ.interval = setInterval(function () {
        //     modelMaster.refresh(true);
        // }, 1000);

    },

    controller: function (payload) {

        switch (payload.process) {

            case "updateQueue":
            case "enterQueue":
            case "rateOrder":
                ModelData.Update(modelMaster.oData.master, "id", payload.data.id, payload.data);
                modelMaster.refresh(true);
                break;

            case "leaveQueue":
                ModelData.Delete(modelMaster.oData.master, "id", payload.data.id);
                modelMaster.refresh(true);
                break;

            default:
                console.log('process not handled', payload);
                break;
        }


    },


}
