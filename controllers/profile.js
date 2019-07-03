exports.handleVisitas = (req, res, db) => {

  const { id } = req.params;

  db("usuarios")
    .where({ id })
    .increment("visitas", 1)
    .returning("visitas")
    .then(visita => {

      if (visita.length) {

        return res.json(visita);
      } else {

        return res.status(400).json("Usuario Inexistente");
      }
    })
    .catch(error => res.status(400).json("Erro ao encontrar usuario"));
};