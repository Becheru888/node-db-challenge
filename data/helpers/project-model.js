const db = require('../dbConfig');

module.exports = {
  get,
  getWithActions,
  addProject,
  update,
  remove
};

function get(id) {
  let query = db('project');
  if (id) return query.where({ id: Number(id) }).first();
  return query;
}

function getWithActions(id) {
  return db('action')
    .select('id', 'description', 'notes', 'completed')
    .where({ project_id: Number(id) });
}

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }))
}

function update(id, project) {
  return db('project')
    .where({ id: Number(id) })
    .update(project);
}

function remove(id) {
  return db('project')
    .where({ id: Number(id) })
    .del();
}