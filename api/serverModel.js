const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
};

async function insert(message) {
  return db("test")
    .insert(message, "id")
    .then(ids => ids[0]);
}

function remove(id) {
  return db("test")
  .where({ id })
  .del();
}

function getAll() {
  return db('test');
}

