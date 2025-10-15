const adminMiddlewares = (request, response, next) => {
  const isUserAdmin = request.userIsAmin;

  if (!isUserAdmin) {
    return response.status(401).json({ error: 'No admin' });
  }

  return next();
};

export default adminMiddlewares;
