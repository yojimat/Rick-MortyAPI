const pickleRick = require('rickmortyapi');

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

exports.getListaByPage = async (req, res) => {

  const { id } = req.params;

  const data = await pickleRick.getCharacter({ page: id })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => data);
    console.log(data)

  if(data) {
    const results = data.results
    ,pages = data.info.pages;

    return res.json({results, pages});
  } else{

    return res.status(400).json("Erro ao chamar api");
  }

};