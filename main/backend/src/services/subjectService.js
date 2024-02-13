const database = require('../../database')
const { v4 } = require('uuid')

//  create
exports.create = async (req) => {
    try {
        
        if(req.headers.role === "11"){
            let uid = v4()
            let qeury = "INSERT INTO subject (id, name, code, class) VALUES (?,?,?,?);"
            let data = [uid, req.body.name, req.body.code, req.body.class]
            let result = await database.execute(qeury, data)

            return { status: 1, code: 200, data: "subject created" }
        }
        return { status: 0, code: 200, data: "Admin access needed" }

    } catch (error) {
        return { status: 0, code: 200, data: "could not create subject", errorCode: error };
    }
}

//  update
exports.update = async (req) => {
    try {

        if (req.headers.role === "11") {
            let uid = v4()
            let qeury = "UPDATE subject SET name= ?, code = ?, class = ? WHERE id = ?;"
            let data = [req.body.name, req.body.code, req.body.class, req.params.id]
            let result = await database.execute(qeury, data)

            return { status: 1, code: 200, data: "subject updated" }
        }
        return { status: 0, code: 200, data: "Admin access needed" }

    } catch (error) {
        return { status: 0, code: 200, data: "could not update subject", errorCode: error };
    }
}

//  delete
exports.delete = async (req) => {
    try {

        if (req.headers.role === "11") {
            let uid = v4()
            let qeury = "DELETE FROM subject WHERE id = ?;"
            let data = [req.params.id]
            let result = await database.execute(qeury, data)

            return { status: 1, code: 200, data: "subject deleted" }
        }
        return { status: 0, code: 200, data: "Admin access needed" }

    } catch (error) {
        return { status: 0, code: 200, data: "could not delete subject", errorCode: error };
    }
}

//  get Subjects
exports.getSubjects = async (req) => {
    try {

        let query = "SELECT * FROM subject;"
        let result = await database.execute(query)
        return { status: 1, code: 200, data: result[0] };

    } catch (error) {
        return { status: 0, code: 200, data: "could not fetch subjects", errorCode: error };
    }
}