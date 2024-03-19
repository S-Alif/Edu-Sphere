const database = require('../../database')
const { v4 } = require('uuid')

// create
exports.create = async (req) => {
  try {
    if (!req.body?.name || !req.body?.courseId || !req.body?.batchId || !req.body?.detail || !req.body?.startAt || !req.body?.endAt) return { status: 0, code: 200, data: "Fill all the data" }
    let uid = v4()

    let query = `INSERT INTO modules (id, name, courseId, batchId, detail, startAt, endAt) VALUES (?,?,?,?,?,?,?);`
    let data = [uid, req.body?.name, req.body?.courseId, req.body?.batchId, req.body?.detail, req.body?.startAt, req.body?.endAt]

    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "module created" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// update
exports.update = async (req) => {
  try {
    let id = req.params?.id
    let batchId = req.params?.batch

    let query = `UPDATE modules SET name = ?, detail= ?, startAt= ?, endAt = ?  WHERE id = "${id}" AND batchId = "${batchId}";`
    let data = [req.body?.name, req.body?.detail, req.body?.startAt, req.body?.endAt]
    
    let result = await database.execute(query, data)
    return { status: 1, code: 200, data: "module updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// delete
exports.delete = async (req) => {
  try {

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// moduleById
exports.moduleById = async (req) => {
  try {
    let id = req.params?.id
    let batchId = req.params?.batch

    let query = `SELECT * FROM modules WHERE id = "${id}" AND batchId = "${batchId}";`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// all module
exports.modules = async (req) => {
  try {
    let courseId = req.params?.course
    let batchId = req.params?.batch

    let query = `SELECT * FROM modules WHERE courseId = "${courseId}" AND batchId = "${batchId}" ORDER BY startAt ASC;`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}