const review = require('../services/reviewService')

/*-------------------------------
    Instructor review
---------------------------------- */

// review create
exports.instructorReviewCreate = async (req, res) => {
    const result = await course.instructorReviewCreate(req);
    res.status(200).json(result);
}

// review delete
exports.instructorReviewDelete = async (req, res) => {
    const result = await course.instructorReviewDelete(req);
    res.status(200).json(result);
}

// review create
exports.instructorReview = async (req, res) => {
    const result = await course.instructorReview(req);
    res.status(200).json(result);
}


/*-------------------------------
    course review
---------------------------------- */

// review create
exports.courseReviewCreate = async (req, res) => {
    const result = await course.courseReviewCreate(req);
    res.status(200).json(result);
}

// review delete
exports.courseReviewDelete = async (req, res) => {
    const result = await course.courseReviewDelete(req);
    res.status(200).json(result);
}

// review create
exports.courseReview = async (req, res) => {
    const result = await course.courseReview(req);
    res.status(200).json(result);
}