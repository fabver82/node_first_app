// Most simple Route for an Express server
//
// Because this file is seperate from the index.js we export it as a module
// You will notice when we use this module that app is given as a variable
// The technical term for this is currying
const jsonfile = require("jsonfile");
module.exports = (app) => {
  // Route is accessible as GET: /demo
  // req is the parameter that refers to the request data
  // res is the parameter that refers to the request's sender
  //

  app.get("/users", (req, res) => {
    console.log("fetching all users");

    // jsonfile reading
    jsonfile.readFile("./DB/user.json", function (err, content) {
      // send file contents back to sender
      res.send(content);
    });
  });
};
