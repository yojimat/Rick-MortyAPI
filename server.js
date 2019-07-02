const express = require("express")
	,bcrypt = require("bcrypt-nodejs")
	,knex = require("knex")
	,path = require("path")
	,db = knex({
		client: "pg",
  		connection: {
    	connectionString: process.env.DATABASE_URL,
    	ssl: true
  		}
	})
	,app = express()
	,register = require("./controllers/register")
	,signin = require("./controllers/signin")
	,auth = require("./controllers/authorization")
	,{ handleProfileGet } = require("./controllers/profile");

app.use(express.static(path.resolve(__dirname, "./frontend-tlo/build")));

//User Routes
app.post("/register", register.registerAuthentication(db, bcrypt));
app.post("/signin", signin.signinAuthentication(db, bcrypt));

app.get("/profile/:id", auth.requireAuth, (req, res) => {
    profile.handleProfileGet(req, res, db);
  });
app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./frontend-tlo/build", "index.html")
    );
});

app.listen(5000, () => {
  console.log('Listening on port 5000!');
});