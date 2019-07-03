const redisClient = require("./signin").redisClient
  ,getAuthTokenId = require("./signin").getAuthTokenId
  ,createSessions = require("./signin").createSessions;

const handleRegister = (db, bcrypt, req, res) => {

  const { email, nome, senha } = req.body
    ,hash = bcrypt.hashSync(senha);

  if (!email || !nome || !senha) {

    return Promise.reject("Formulário incorreto.");
  }

  return db.transaction(trx => {
      trx.insert({

          email: email,
          hash: hash
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("usuarios")
            .returning("*")
            .insert({
              
              email: loginEmail[0],
              nome: nome,
              visitas: 0,
              inscricao: new Date()
            })
            .then(user => user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(error => Promise.reject("Não pode se inscrever"));
};

const registerAuthentication = (db, bcrypt) => (req, res) => {

  const { authorization } = req.headers;

  return authorization
    ? getAuthTokenId(req, res)
    : handleRegister(db, bcrypt, req, res)
        .then(data => {

          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = {
  registerAuthentication
};
