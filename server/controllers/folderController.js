const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js")

exports.postFolder = expressAsyncHandler(async(req, res, next) => {
    const folder = await db.createFolder(req.body.name)
})
