const service = require("./hello.service");
const aeb = require("../errors/asyncErrorBoundary");

const list = async(req, res, next) => {
  const data = await service.list();
  res.json({data})
}

const create = async(req, res, next) => {
  const newHello = { hello: "hello" }
  await service.create(newHello)
  res.json({data: "hello :3"})
}
module.exports = {
  list: [aeb(list)],
  create: [aeb(create)]
};
