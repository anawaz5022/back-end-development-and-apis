const inputCleaner = (req, res, next) => {
  if (req.body) {
    // 1. Convert username to lowercase
    if (req.body.username) {
      req.body.username = req.body.username.toLowerCase();
    }
    // 2. Strip HTML tags from comment using regex
    if (req.body.comment) {
      req.body.comment = req.body.comment.replace(/<[^>]*>/g, '');
    }
  }
  next();
};

const inputValidator = (req, res, next) => {
  // Check if username exists and is at least 3 characters
  if (req.body && req.body.username && req.body.username.length >= 3) {
    return next();
  }
  
  // Otherwise redirect with an error query parameter
  res.redirect('/form?error=Username must be at least 3 characters');
};

module.exports = {
  inputCleaner,
  inputValidator
};