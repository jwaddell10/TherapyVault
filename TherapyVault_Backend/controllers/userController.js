const asyncHandler = require('express-async-handler')
const db = require("../db/queries.js")

exports.signUp = asyncHandler(async(req, res, next) => {
    const user = await db.findUser(req.body.name)
})