// Most simple Route for an Express server
//
// Because this file is seperate from the index.js we export it as a module
// You will notice when we use this module that app is given as a variable
// The technical term for this is currying
const jsonfile = require("jsonfile");
const file_path = "./DB/user.json";
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

  app.post("/users/new", (req, res) => {
    // console.log(req.body);
    let { email, username } = req.body;

    jsonfile.readFile(file_path, function (err, content) {
      content.push({ email, username });
      console.log("added " + email + " to DB");
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });
      res.sendStatus(200);
    });
  });

  app.delete("/users/destroy", (req, res) => {
    let email = req.body.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop();
        }
      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  app.put("/user", (req, res) => {
    let user;
    let username = req.body.username;
    let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {
          console.log(
            "updated user " +
              req.query.email +
              " has now username : " +
              username
          );

          user = content[i];
          user.username = username;
        }
      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });
    });
    res.send(user);
  });

  app.get("/user", (req, res) => {
    let user;
    let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("found user" + content[i]);
          console.log(content[i]);
          user = content[i];
        }
      }

      res.send(user);
    });
  });
};
