const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");

exports.getDemographics = expressAsyncHandler(async (req, res, next) => {
	const demographics = await db.findDemographics();
	if (demographics) {
		return res.json(demographics);
	}
});

exports.getTopics = expressAsyncHandler(async(req, res, next) => {
    const topics = await db.findTopics()
    if (topics) {
        return res.json(topics)
    }
})
