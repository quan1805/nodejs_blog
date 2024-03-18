const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(course =>
        res.render('courses/show', { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .then(course =>
        res.render('courses/edit', { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [PATCH] /courses/:id
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  store(req, res, next) {
    req.body.image = `https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png`;
    const course = new Course(req.body);
    course.save().then(() => res.redirect('/').catch(error => {}));
    // res.send('Course Save!')
  }

  // [POST] /courses/handle-form-actions
  handleFormactions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }
}

module.exports = new CoursesController();
