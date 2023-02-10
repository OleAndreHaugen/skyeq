const { In } = operators;

try {

    let EventRes = {
        process: payload.process,
        data: null
    };

    switch (payload.process) {

        case "updateQueue":
            const recUpdate = await entities.skyeq_master.save(payload.data);
            EventRes.data = await entities.skyeq_master.findOne({ id: recUpdate.id });
            break;

        case "leaveQueue":
            const recDelete = await entities.skyeq_master.findOne({ identifier: payload.data.identifier });
            await entities.skyeq_master.delete({ identifier: payload.data.identifier });
            EventRes.data = recDelete;
            break;

        case "rateOrder":
            let recRating = await entities.skyeq_master.findOne({ identifier: payload.data.identifier });
            recRating.rating = payload.data.rating;

            const recSaved = await entities.skyeq_master.save(recRating);
            EventRes.data = recSaved;
            break;

        default:
            log.error("SkyeQ: Process not handled", payload.process);
            break;
    }

    // Trigger Event for Clients
    await p9.events.publish("SkyeQClient", EventRes);

    complete();

} catch (e) {
    log.error("SkyeQ: Error in processing", e);
    complete();
}
