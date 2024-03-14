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

// get all course
exports.courses = async (req, res) => {
    const result = await course.getAllCourse(req);
    res.status(200).json(result);
}

// get course by instructor
exports.courseByInstructor = async (req, res) => {
    const result = await course.getCourseByInstructor(req);
    res.status(200).json(result);
}

// get course by subject
exports.courseBySubject = async (req, res) => {
    let result = await course.getCourseBySubject(req);
    res.status(200).json(result);
}

// get course by class
exports.courseByClass = async (req, res) => {
    let result = await course.getCourseByClass(req);
    res.status(200).json(result);
}

// get course names
exports.courseNames = async (req, res) => {
    let result = await course.getCourseNames(req);
    res.status(200).json(result);
}