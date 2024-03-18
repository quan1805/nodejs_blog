const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, maxLength: 255, require: true },
    description: { type: String },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);
// Override all methods
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
