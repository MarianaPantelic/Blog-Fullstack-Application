//middleware for the CORS settings

exports.setCors = (req, res, next) => {
  //set headers in the response for CORS settings
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //allow this website to access my backend
  //localhost:3000 can send only this headers with a request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  //client can send only these methods
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
