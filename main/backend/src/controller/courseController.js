const course = require('../services/courseService')

// create course
exports.createCourse = async (req, res) => {
    const result = await course.create(req);
    res.status(200).json(result);
}

// update course
exports.updateCourse = async (req, res) => {
    const result = await course.update(req);
    res.status(200).json(result);
}

// delete course
exports.deleteCourse = async (req, res) => {
    const result = await course.delete(req);
    res.status(200).json(result);
}

// get course (public)
exports.getAllCourse = async (req, res) => {
    const result = await course.getCoursePublic(req);
    res.status(200).json(result);
}

// get course by instructor
exports.getCourseByInstructor = async (req, res) => {
    const result = await course.getCourseInstructor(req);
    res.status(200).json(result);
}