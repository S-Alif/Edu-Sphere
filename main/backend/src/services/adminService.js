const database = require('../../database')
const { v4 } = require('uuid')
const { encryptPass, comparePass } = require('../helpers/passEncryptor')
const { getCurrentDate } = require('../helpers/helper')
const sendEmail = require('../utility/sendMail')


// chart data
exports.chartData = async (req) => {
  try {
    // student
    let query = `SELECT 
    DATE_FORMAT(registerDate, '%Y-%m-%d') AS registration_date,
        SUM(CASE WHEN role = 0 THEN 1 ELSE 0 END) AS new_students
    FROM users
    GROUP BY DATE_FORMAT(registerDate, '%Y-%m-%d')
    ORDER BY DATE_FORMAT(registerDate, '%Y-%m-%d');`

    // teachers
    let query2 = `SELECT 
    DATE_FORMAT(registerDate, '%Y-%m-%d') AS registration_date,
        SUM(CASE WHEN role = 1 THEN 1 ELSE 0 END) AS new_teachers
    FROM users
    GROUP BY DATE_FORMAT(registerDate, '%Y-%m-%d')
    ORDER BY DATE_FORMAT(registerDate, '%Y-%m-%d');`

    let result = await database.execute(query)
    let result2 = await database.execute(query2)

    return { status: 1, code: 200, data: {students: result[0], instructors: result2[0]} };


  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}

// notify instructor
exports.notify = async (req) => {
  try {
    let email = req.params?.email
    let subject = req.body?.subject
    let text = req.body?.text

    await sendEmail(email, text, subject)

    return { status: 1, code: 200, data: "Email sent" };
    
  } catch (error) {
    return { status: 0, code: 200, data: "something went wrong", errorCode: error };
  }
}