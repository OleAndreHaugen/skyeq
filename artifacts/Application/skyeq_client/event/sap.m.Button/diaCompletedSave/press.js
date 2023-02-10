triggerEventServer({
    process: "rateOrder",
    data: {
        identifier: SkyeQ.identifier,
        rating: inRating.getValue()
    }
});

diaCompleted.close();