const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class MeController {
  // [GET] /trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then(courses => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}),
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, deletedCount]) =>
        res.render('me/stored-courses', {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
