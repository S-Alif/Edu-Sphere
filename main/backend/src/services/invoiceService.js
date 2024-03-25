const database = require('../../database')
const { v4 } = require('uuid');
const { getCurrentDateTime } = require('../helpers/helper');
const { default: axios } = require('axios');


// calculate invoice
exports.CalculateInvoice = async (req) => {
  try {

    // Invoice Calculation
    let user_id = req.headers.id;
    let cus_email = req.headers.email;
    let courseId = req.body.courseId
    let batchId = req.body.batchId

    let checkEnroll = await database.execute(`SELECT COUNT(*) as total FROM enrollment WHERE courseId = '${courseId}' AND batchId = '${batchId}' AND studentId = '${user_id}';`)
    let total = checkEnroll[0][0]
    if (total?.total != 0) return { status: 0, code: 200, data: "Already enrolled in course" };


    let payAmount = await database.execute(`SELECT price, discount FROM course WHERE id = '${courseId}';`)
    let course = payAmount[0][0]
    let fee = parseInt(course?.price) - parseInt(course?.discount)

    let payable = fee;
    let tran_id = Math.floor(100000000 + Math.random() * 900000000);
    let val_id = 0;
    let delivery_status = "pending";
    let payment_status = "pending";

    let profileData = await database.execute(`SELECT id, firstName, lastName, address, phone, email FROM users WHERE id = '${user_id}';`)
    let Profile = profileData[0]

    // Customer Shipping Details
    let cus_details = `Name: ${Profile[0].firstName} ${Profile[0].lastName}, Email: ${Profile[0].email}, Address: ${Profile[0].address}, Phone: ${Profile[0].phone}`
    let ship_details = `Name: ${Profile[0].firstName} ${Profile[0].lastName}, Address: ${Profile[0].address}, Phone: ${Profile[0].phone}`


    // Pending Payment Invoice Create
    let invoiceId = v4()
    let invoiceQuery = "INSERT INTO invoices (id, userId, payable, cus_details, ship_details, tran_id, val_id, delivery_status, payment_status, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?);"
    let invoiceData = [invoiceId, user_id, payable, cus_details, ship_details, tran_id, val_id, delivery_status, payment_status, getCurrentDateTime()]

    let createInvoice = await database.execute(invoiceQuery, invoiceData)


    // Invoice Product List Insert
    let invoice_products_id = v4()
    let insertInvoiceProductQuery = "INSERT INTO invoice_products (id, userId, invoiceId, courseId, batchId, price) VALUES (?,?,?,?,?,?);"
    let insertInvoiceProductData = [invoice_products_id, user_id, invoiceId, courseId, batchId, payable]

    let insertInvoiceProduct = await database.execute(insertInvoiceProductQuery, insertInvoiceProductData)


    // SSL Commerce Payment Gateway Call - Get Payment URL

    // 1 Payment Settings

    let Settings = await database.execute(`SELECT * FROM payment_setting`);
    let PaymentSetting = Settings[0]

    const form = new FormData();

    form.append('store_id', PaymentSetting[0]['store_id']);
    form.append('store_passwd', PaymentSetting[0]['store_password']);
    form.append('total_amount', payable.toString());
    form.append('currency', PaymentSetting[0]['currency']);
    form.append('tran_id', tran_id);
    form.append('success_url', `${PaymentSetting[0]['success_url']}/${tran_id}`);
    form.append('fail_url', `${PaymentSetting[0]['fail_url']}/${tran_id}`);
    form.append('cancel_url', `${PaymentSetting[0]['cancel_url']}/${tran_id}`);
    form.append('ipn_url', `${PaymentSetting[0]['ipn_url']}/${tran_id}`);

    form.append('cus_name', Profile[0].firstName);
    form.append('cus_email', cus_email);
    form.append('cus_add1', Profile[0].address);
    form.append('cus_add2', Profile[0].address);
    form.append('cus_city', Profile[0].address);
    form.append('cus_state', Profile[0].address);
    form.append('cus_postcode', Profile[0].address);
    form.append('cus_country', "Bangladesh");
    form.append('cus_phone', Profile[0].phone);
    form.append('cus_fax', Profile[0].phone);

    form.append('shipping_method', 'YES');
    form.append('ship_name', Profile[0].ship_name);
    form.append('ship_add1', Profile[0].ship_add);
    form.append('ship_add2', Profile[0].ship_add);
    form.append('ship_city', Profile[0].ship_city);
    form.append('ship_state', Profile[0].ship_state);
    form.append('ship_country', Profile[0].ship_country);
    form.append('ship_postcode', Profile[0].ship_postcode);
    form.append('product_name', 'product_name');
    form.append('product_category', 'category');
    form.append('product_profile', 'profile');
    form.append('product_amount', '1');

    let SSLRes = await axios.post(PaymentSetting[0]['init_url'], form)
    return { status: 1, code: 200, data: SSLRes.data }
  }
  catch (e) {
    console.log(e)
    return { status: 0, code: 200, data: "Something Went Wrong" }
  }
}


// payment success
exports.PaymentSuccessService = async (req) => {
  try {
    let trxID = req.params.trxID;

    // update invoice status
    await database.execute(`UPDATE invoices SET delivery_status = "success", payment_status = "success" WHERE tran_id = '${trxID}';`)

    // get invoice data
    let invoice = await database.execute(`SELECT ip.*
                        FROM invoices AS i
                        JOIN invoice_products AS ip ON i.id = ip.invoiceId
                        WHERE i.tran_id = '${trxID}';`)
    let invoiceProduct = invoice[0][0]

    // enroll in course
    let uid = v4()
    let enrollCourseQuery = `INSERT INTO enrollment (id, courseId, batchId, studentId, paid, payDue, enrollDate) VALUES (?,?,?,?,?,?,?);`
    let enrollData = [uid, invoiceProduct?.courseId, invoiceProduct?.batchId, invoiceProduct?.userId, invoiceProduct?.price, "0", getCurrentDateTime()]

    let enroll = await database.execute(enrollCourseQuery, enrollData)

    // update invoice add enroll id
    await database.execute(`UPDATE invoices SET enrollId = '${uid}' WHERE tran_id = '${trxID}';`)

    return { status: 1, code: 200, data: "Payment success" }
  } catch (e) {
    return { status: 0, code: 200, data: "Something Went Wrong" }
  }
}

// payment fails
exports.PaymentFailService = async (req) => {
  try {
    let trxID = req.params.trxID;
    console.log(trxID, "fail")
    await database.execute(`UPDATE invoices SET delivery_status = "fail", payment_status = "fail" WHERE tran_id = '${trxID}';`)
    return { status: 0, code: 200, data: "Payment fail" }
  } catch (e) {
    return { status: 0, code: 200, data: "Something Went Wrong" }
  }
}

// payment cancels
exports.PaymentCancelService = async (req) => {
  try {
    let trxID = req.params.trxID;
    console.log(trxID, "cancel")
    await database.execute(`UPDATE invoices SET delivery_status = "cancel", payment_status = "cancel" WHERE tran_id = '${trxID}';`)
    return { status: 0, code: 200, data: "Payment cancel" }
  } catch (e) {
    return { status: 0, code: 200, data: "Something Went Wrong" }
  }
}

// payment instant notification
exports.PaymentIPNService = async (req) => {
  try {
    let trxID = req.params.trxID;
    let status = req.body['status']
    await database.execute(`UPDATE invoices SET delivery_status = "fail", payment_status = "fail" WHERE tran_id = '${trxID}';`)
    console.log(status, "ipn")
    return { status: 1, code: 200, data: "Payment " + status }
  } catch (e) {
    return { status: 1, code: 200, data: "Something Went Wrong" }
  }
}