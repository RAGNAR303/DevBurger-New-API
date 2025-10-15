import JWT from 'jsonwebtoken';
import authConfing from '../../config/auth.js';

const authMiddlewares = (request, response, next) => {
  const authtoken = request.headers.authorization;

  if (!authtoken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authtoken.split(' ')[1];

  try {
    JWT.verify(token, authConfing.secret, (error, decoded) => {
      if (error) {
        throw Error();
      }

      request.userId = decoded.id;
      request.userName = decoded.name;
      request.userIsAmin = decoded.admin;
    });
  } catch (_error) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
  return next();
};

export default authMiddlewares;
