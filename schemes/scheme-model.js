const knex = require('knex');
const db = require('../data/migrations/dbConfig.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where({id}).first()
}

function findSteps(schemeId){
    return db('steps')
    .join('schemes', 'steps.scheme_id', '=', 'schemes.id')
    .select('steps.id', 'steps.step_number', 'steps.instructions', 'scheme_name')
    .where('scheme_id', schemeId)
}

function add(scheme) {
    return db('schemes')
    .insert(scheme, 'id')
    .then(ids => ({ id: ids[0] }))
}

function update(changes, id){
    return db('schemes')
    .where({id})
    .update(changes)
}

function remove(id){
    return db('schemes')
    .where({id})
    .del()
}