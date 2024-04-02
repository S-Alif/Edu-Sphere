const database = require('../../database')
const { v4 } = require('uuid')
const { getCurrentDateTime } = require('../helpers/helper')
const { imageUploader, imgDeleter, extractPublicId } = require('../helpers/ImageUploader')

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
    // image update
    if (req.body?.newCourseBatchImg != "") {
      let id = extractPublicId(req.body?.courseBatchImg)
      let deleter = await imgDeleter(id)

      if (deleter == true) {
        let imageUrl = await imageUploader(req.body.newCourseBatchImg)
        if (!imageUrl) return { status: 0, code: 200, data: "something went wrong" };
        req.body.courseBatchImg = imageUrl
      } else {
        return { status: 0, code: 200, data: "could not update profile" }
      }
    }

    let query = `UPDATE batch SET name = ?, courseId = ?, courseBatchImg = ?, start = ?, end = ?, enrollmentEnd = ?, published = ?, updatedAt = ? WHERE id = "${req.params?.id}" AND courseId = "${req.params?.course}";`;

    let data = [req.body?.name, req.body?.courseId, req.body?.courseBatchImg, req.body?.start, req.body?.end, req.body?.enrollmentEnd, parseInt(req.body?.published), getCurrentDateTime()]
    let result = await database.execute(query, data)

    return { status: 1, code: 200, data: "batch updated" }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
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
        c.createdAt as createdAt,
        c.updatedAt as updatedAt,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', b.id,
                'name', b.name,
                'published', b.published
            )
        ) AS batches
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

// batch by id
exports.batchByID = async (req) => {
  try {
    let course = req.params?.course
    let id = req.params?.id

    if (!course || !id) return { status: 0, code: 200, data: "Insufficient data" }

    let query = `SELECT * FROM batch WHERE id = '${id}' AND courseId = '${course}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// get batch by only id
exports.batchId = async (req) => {
  try {
    let id = req.params?.id

    let query = `SELECT * FROM batch WHERE id = '${id}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0][0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// batch by course
exports.batchCourse = async (req) => {
  try {
    let course = req.params?.course

    let query = `SELECT id, name, published FROM batch WHERE courseId = '${course}';`
    let result = await database.execute(query)

    return { status: 1, code: 200, data: result[0] }

  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}