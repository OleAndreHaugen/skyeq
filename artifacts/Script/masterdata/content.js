try {

    result.data = {
        status: await entities.skyeq_status.find(),
        queue: await entities.skyeq_queue.find(),
        master: await entities.skyeq_master.find({
            select: ["id", "name", "note", "createdAt", "status", "queue", "identifier", "rating"],
            order: { createdAt: "ASC" },
            cache: false
        }),
    }

    complete();

} catch (e) {

    result.data = {
        status: "Error",
        description: e
    };

    complete();
}

