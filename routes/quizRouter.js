const express = require("express")

const {Quiz}= require("../models/quize")


const routerQuiz = express.Router()

routerQuiz.get('/', async (req, res) => {
    try {
        const quiz = await Quiz.find().populate('creator', 'username');
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


routerQuiz.post('/', async (req, res) => {
    try {
        const { creator, title, description, questions } = req.body;
        const quizQuestion = await Quiz.create({ creator, title, description, questions });
        res.json(quizQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


routerQuiz.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const quizQuestion = await Quiz.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!quizQuestion) {
            return res.status(404).json({ error: 'Not found quiz' });
        }
        res.json(quizQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

routerQuiz.delete('/:id', async (req, res) => {
    try {
        const quizQuestion = await Quiz.findByIdAndDelete(req.params.id);
        if (!quizQuestion) {
            return res.status(404).json({ error: 'Not found quiz' });
        }
        res.json({ message: 'Successfully deleted quiz' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

routerQuiz.get('/:id/leaderboard', async (req, res) => {
    try {
        const quizQuestion = await Quiz.findById(req.params.id).populate('leaderboard.user', 'username');
        if (!quizQuestion) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const leaderboard = quizQuestion.leaderboard.sort((a, b) => b.score - a.score);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { routerQuiz }