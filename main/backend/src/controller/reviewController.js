const review = require('../services/reviewService')

/*-------------------------------
    Instructor review
---------------------------------- */

// review create
exports.instructorReviewCreate = async (req, res) => {
    const result = await review.postInstructorReview(req);
    res.status(200).json(result);
}

// review delete
exports.instructorReviewDelete = async (req, res) => {
    const result = await review.deleteInstructorReview(req);
    res.status(200).json(result);
}

// review create
exports.instructorReview = async (req, res) => {
    const result = await review.getInstructorReview(req);
    res.status(200).json(result);
}


/*-------------------------------
    course review
---------------------------------- */

// review create
exports.courseReviewCreate = async (req, res) => {
    const result = await review.postCourseReview(req);
    res.status(200).json(result);
}

// review delete
exports.courseReviewDelete = async (req, res) => {
    const result = await review.deleteCourseReview(req);
    res.status(200).json(result);
}

// review create
exports.courseReview = async (req, res) => {
    const result = await review.getCourseReview(req);
    res.status(200).json(result);
}


/*-------------------------------
    site review
---------------------------------- */
// review create
exports.siteReviewCreate = async (req, res) => {
    const result = await review.postSiteReview(req);
    res.status(200).json(result);
}

// review delete
exports.siteReviewDelete = async (req, res) => {
    const result = await review.deleteSiteReview(req);
    res.status(200).json(result);
}

// review create
exports.siteReview = async (req, res) => {
    const result = await review.getSiteReview(req);
    res.status(200).json(result);
}