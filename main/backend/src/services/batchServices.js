const database = require('../../database')
const { v4 } = require('uuid')
const { getCurrentDateTime } = require('../helpers/helper')
const { imageUploader } = require('../helpers/ImageUploader')

// create
exports.create = async (req) => {
  try {
    if (!req.body?.name || !req.body?.courseId || !req.body?.courseBatchImg || !req.body?.end || !req.body?.start || !req.body?.enrollmentEnd) return { status: 0, code: 200, data: "Fill all the data" }

    let uid = v4()
    let dates = getCurrentDateTime()
    let query = `INSERT INTO batch (id, name, courseId, start, end, enrollmentEnd, createdAt, updatedAt, published) VALUES (?,?,?,?,?,?,?,?,?)`
    let data = [uid, req.body?.name, req.body?.courseId, req.body?.start, req.body?.end, req.body?.enrollmentEnd, dates, dates, parseInt(req.body?.published)]

    let result = await database.execute(query, data)

    if (result[0]['affectedRows'] == 1) {
      let imageUrl = await imageUploader(req.body?.courseBatchImg)
      if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };
      let getData = await database.execute(`update batch set courseBatchImg = '${imageUrl}' where id = "${uid}"`)
      return { status: 1, code: 200, data: "batch created" }
    }

    return { status: 0, code: 200, data: "could not create batch" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// update
exports.update = async (req) => {
  try {
    let query = `UPDATE batch SET name = ?, courseBatchImg = ?, start = ?, end = ?, enrollmentEnd = ?, published = ?, createdAt = ?, updatedAt = ? WHERE id = "${req.params?.id}" AND courseId = "${req.params?.course}";`;


  } catch (error) {

  }
}

// delete
exports.delete = async (req) => {
  try {

  } catch (error) {

  }
}

// get batch
exports.getBatch = async (req) => {
  try {
    let id = req.headers?.id
    if (!id) id = req.params.id

    let query = `SELECT 
        c.id AS id,
        c.name AS name,
        c.published AS published,
        c.createdAt AS createdAt,
        c.updatedAt AS updatedAt,
        CASE
            WHEN COUNT(b.id) = 0 THEN JSON_ARRAY()
            ELSE JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', b.id,
                    'name', b.name,
                    'published', b.published
                )
            )
        END AS batches
    FROM course c
    LEFT JOIN batch b ON c.id = b.courseId
    WHERE c.instructor = '${id}'
    GROUP BY c.id, c.name, c.published;`

    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}