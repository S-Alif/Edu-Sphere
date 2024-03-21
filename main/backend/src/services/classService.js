const database = require('../../database')
const { v4 } = require('uuid')
const { getCurrentDateTime } = require('../helpers/helper')

// assignment create
exports.assignmentCreate = async (req) => {
  try {

    let checks = await database.execute(`SELECT COUNT(*) as total FROM assignments WHERE moduleId = '${req.body?.moduleId}';`)
    if (checks[0][0].total > 0) return { status: 0, code: 200, data: "assignment already is created" }

    let uid = v4()
    let query = `INSERT INTO assignments (id, name, moduleId, starts, ends, createdAt) VALUES (?,?,?,?,?,?)`
    let data = [uid, req.body?.name, req.body?.moduleId, req.body?.starts, req.body?.ends, getCurrentDateTime()]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "assignment created" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// assignment update
exports.assignmentUpdate = async (req) => {
  try {
    let id = req.params?.id
    let moduleId = req.params?.module

    let query = `UPDATE assignments SET name = ?, starts = ?, ends = ? WHERE id = "${id}" AND moduleId = "${moduleId}"; `
    let data = [req.body?.name, req.body?.starts, req.body?.ends]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "assignment updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// assignment delete
exports.assignmentDelete = async (req) => {
  try {
    let id = req.params?.id
    let moduleId = req.params?.module

    let query = `DELETE FROM assignments WHERE id = "${id}" AND moduleId = "${moduleId}";`
    let data = [req.body?.name, req.body?.starts, req.body?.ends]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "assignment deleted" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// assignment get
exports.getAssignment = async (req) => {
  try {
    let result = await database.execute(`SELECT * FROM assignments WHERE moduleId = "${req.params.moduleId}"`)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}


// live class create
exports.liveCreate = async (req) => {
  try {
    let uid = v4()
    let query = `INSERT INTO live_class (id, link, topic, moduleId, description, start, end, createdAt) VALUES (?,?,?,?,?,?,?,?);`
    let data = [uid, req.body?.link, req.body?.topic, req.body?.moduleId, req.body?.description, req.body?.start, req.body?.end, getCurrentDateTime()]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "live class created" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// live class update
exports.liveUpdate = async (req) => {
  try {
    let id = req.params?.id
    let moduleId = req.params?.module

    let query = `UPDATE live_class SET link = ?, topic = ?, description = ?, start = ?, end = ? WHERE id = "${id}" AND moduleId = "${moduleId}"; `
    let data = [req.body?.link, req.body?.topic, req.body?.description, req.body?.start, req.body?.end]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "live class updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// live class delete
exports.liveDelete = async (req) => {
  try {
    let id = req.params?.id
    let moduleId = req.params?.module

    let query = `DELETE FROM live_class WHERE id = "${id}" AND moduleId = "${moduleId}";`
    let data = [req.body?.name, req.body?.starts, req.body?.ends]

    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "live deleted" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// live class get by id
exports.getLiveId = async (req) => {
  try {
    let result = await database.execute(`SELECT * FROM live_class WHERE id = "${req.params?.id}" AND moduleId = "${req.params?.moduleId}"`)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// live class all
exports.getLives = async (req) => {
  try {
    let result = await database.execute(`SELECT id, moduleId, topic, description, start, end FROM live_class WHERE moduleId = "${req.params?.moduleId}" ORDER BY start ASC;`)
    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// assignment get
exports.getAssignmentStudent = async (req) => {
  try {
    let result = await database.execute(`SELECT id, moduleId, starts, ends FROM assignments WHERE moduleId = "${req.params?.moduleId}";`)
    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}