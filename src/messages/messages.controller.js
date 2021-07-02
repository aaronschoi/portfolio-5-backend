const service = require("./messages.service");
const aeb = require("../errors/asyncErrorBoundary");

const messageIDExists = async (req, res, next) => {
  const { message_id } = req.body.data;
  if (message_id) {
    const data = await service.read(message_id);
    res.locals.message = data;
    return next();
  } else {
    return next({
      message: "No such message exists",
      status: 404,
    });
  }
};

const create = async (req, res, next) => {
    const newMessage = {...req.body.data, status:"open"}
    const data = await service.create(newMessage);
    res.json({data})
};

const update = async (req, res, next) => {
  const updatedMessage = { ...res.locals.message, status: "closed" };
  const data = await service.update(updatedMessage);
  res.json({ data });
};

const list = async (req, res, next) => {
  const data = await service.list();
  res.json({ data });
};

module.exports = {
  create: [aeb(create)],
  update: [aeb(messageIDExists), aeb(update)],
  list: [aeb(list)],
};
