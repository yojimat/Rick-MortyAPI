exports.handleProfileGet = (req, res, db) => {

  const { id } = req.params;

  db.select("*")
    .from("usuarios")
    .where({ id })
    .then(user => {

      if (user.length) {

        return res.json(user[0]);
      } else {

        return res.status(400).json("Não encontrado.");
      }
    })
    .catch(error => res.status(400).json("Erro ao encontrar usuario."));
};