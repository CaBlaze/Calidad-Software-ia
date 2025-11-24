// backend/src/routes/scores.routes.js

import express from 'express';
import { createScore, getTopScores } from '../controllers/scores.controller.js';
import { validateScore } from '../validators/scores.validator.js';

const router = express.Router();

// POST /api/scores
router.post('/scores', validateScore, createScore);

// GET /api/scores
router.get('/scores', getTopScores);

export default router;
