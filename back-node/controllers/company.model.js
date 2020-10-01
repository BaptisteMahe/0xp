const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  creationDate: { type: Date },
  description: { type: String, required: true },
  taille: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  srcImage: { type: String, required: true },
  isPartner: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', schema);