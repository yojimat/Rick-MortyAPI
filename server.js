const express = require("express")
	,bcrypt = require("bcrypt-nodejs")
	,knex = require("knex")
	,path = require("path")
	,bodyParser = require("body-parser")
	,cors = require("cors")
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
	,{ handleVisitas, getListaByPage } = require("./controllers/profile");

app.use(express.static(path.resolve(__dirname, "./frontend-tlo/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//User Routes
app.post("/register", register.registerAuthentication(db, bcrypt));
app.post("/signin", signin.signinAuthentication(db, bcrypt));

app.get("/profile/:id", auth.requireAuth, (req, res) => {
    handleVisitas(req, res, db);
  });
app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./frontend-tlo/build", "index.html")
    );
});
app.get("/page/:id", auth.requireAuth, (req, res) => {
    getListaByPage(req, res, db);
  });

app.listen(process.env.PORT || 5000, () => {

  console.log(`Listening on port ${process.env.PORT || 5000}`);
});