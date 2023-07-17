const mongoose = require('mongoose');

const queSchema = new mongoose.Schema({
  title: { type: String, required: true },
  answerOptions: [{ type: String, required: true }],
  correctOptions: [{ type: Number, required: true }]
});

const quizSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [queSchema],
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = {Quiz};
