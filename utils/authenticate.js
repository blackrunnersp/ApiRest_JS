const authenticate = (req, res, next) => {
    const apiKey = req.headers['api_key'];
    if (apiKey && apiKey === process.env.API_KEY) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied.' });
    }
  };
  
  export default authenticate;