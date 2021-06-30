const knex = require('../db/connection');

const create = (newMessage) => {
    return knex('messages')
    .insert(newMessage, '*')
    .then(created => created[0]);
}

const read = (message_id) => {
    return knex('messages')
    .where({message_id})
    .first();
}

const update = async (updatedMessage) => {
    const { message_id } = updatedMessage;
    await knex('messages')
    .where({message_id})
    .update(updatedMessage, '*');

    return read(message_id);
}

const list = () => {
    return knex('messages')
    .where({status: "open"})
}


module.exports = {
    create,
    read,
    update,
    list,
}