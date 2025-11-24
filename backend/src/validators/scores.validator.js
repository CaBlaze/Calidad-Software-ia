export const validateScore = (req, res, next) => {
  const { nickname, score } = req.body;

  // Validar que nickname existe y no está vacío
  if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Nickname is required and cannot be empty'
    });
  }

  // Validar longitud del nickname (máximo 15 caracteres)
  if (nickname.length > 15) {
    return res.status(400).json({
      success: false,
      message: 'Nickname cannot exceed 15 characters'
    });
  }

  // Validar que nickname sea alfanumérico
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(nickname)) {
    return res.status(400).json({
      success: false,
      message: 'Nickname must be alphanumeric'
    });
  }

  // Validar que score existe y es un número válido
  if (score === undefined || score === null) {
    return res.status(400).json({
      success: false,
      message: 'Score is required'
    });
  }

  const scoreNum = Number(score);
  if (isNaN(scoreNum) || scoreNum < 0) {
    return res.status(400).json({
      success: false,
      message: 'Score must be a non-negative number'
    });
  }

  // Si todas las validaciones pasan, continuar
  next();
};