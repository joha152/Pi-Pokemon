const { Router } = require('express');
const getAllTypes = require("../handlers/typeHandler")

const typeRouter = Router();

typeRouter.get("/", getAllTypes)


module.exports = typeRouter;