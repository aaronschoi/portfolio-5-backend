const knex = require('../db/connection');

const list = () => {
    return knex("hello")
    .select("*")
}

const create = (newHello) => {
   return knex("hello")
    .insert(newHello, "*")
}


module.exports = {
    list,
    create
}