const asyncHandler = require('express-async-handler')
const db = require("../db/queries.js")
const bcryptjs = require("bcryptjs")

exports.signUp = asyncHandler(async(req, res, next) => {
    const user = await db.findUser(req.body.name)

    if (!user) {
        const createdUser = await db.createUser(req.body.name, req.body.password)
    }
})