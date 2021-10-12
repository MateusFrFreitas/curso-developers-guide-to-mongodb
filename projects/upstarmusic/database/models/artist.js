const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AlbumSchema = require('./album');

const ArtistSchema = new Schema({
  name: { type: String, text: true },
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema],
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
