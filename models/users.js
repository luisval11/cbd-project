const mongoose = require('mongoose');
const Schema = mongoose.Schema;


LibraryItemSchema = new Schema({
  author: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String},
  mark: {type: String, enum: ['masterpiece', 'great', 'good', 'bad', 'horrible', 'pending']}


});


UserSchema = new Schema({

  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true, minlength: 3},
  password: {type: String, required: true, minlength: 3},
  dni: {type: String},

  music: [LibraryItemSchema],
  films: [LibraryItemSchema],
  videogames: [LibraryItemSchema]

});

module.exports = mongoose.model('Users', UserSchema);
