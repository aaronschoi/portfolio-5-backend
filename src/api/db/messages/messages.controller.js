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

const fromOfMessageExists = (req, res, next) => {
  const { from } = req.body.data;
  if(from){
    if(/\S/.test(from)){
      return next();
      }
      else{
        return next({
          message:"There is insufficient information regarding who sent this message.",
          status: 400,
        })
      }
  }
  else{
    return next({
      message: "Please let me know who this message is from. Thank You!",
      status:400,
    })
  }
}

const bodyOfMessageExists = (req, res, next) => {
  const { message } = req.body.data;
  if(message) {
    if(/\S/.test(message)){
    return next();
    }
    else{
      return next({
        message:"The message cannot be left blank. Thank you!",
        status: 400,
      })
    }
  }
  else{
    return next({
      message:"A message body is required to send. Thank you!",
      status: 400,
    })
  }
}

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
  create: [aeb(fromOfMessageExists),aeb(bodyOfMessageExists),aeb(create)],
  update: [aeb(messageIDExists), aeb(update)],
  delete: [],
  list: [aeb(list)],
};
