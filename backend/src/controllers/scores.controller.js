import { saveScore, getTopScores as getScores } from '../services/scores.service.js';

// Crear un nuevo puntaje
export const createScore = async (req, res) => {
  try {
    const { nickname, score } = req.body;
    const result = await saveScore(nickname, score);

    res.status(201).json({
      success: true,
      message: 'Score saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error creating score:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving score',
      error: error.message
    });
  }
};

// Obtener los mejores puntajes
export const getTopScores = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const scores = await getScores(limit);

    res.status(200).json({
      success: true,
      data: scores
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching scores',
      error: error.message
    });
  }
};