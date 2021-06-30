const router = require("express").Router();
const controller = require("./messages.controller");
const methodNotAllowed = require('../errors/methodNotAllowed');

router
.route('/')
.get(controller.list)
.put(controller.update)
.post(controller.create)
.all(methodNotAllowed);

module.exports = router;