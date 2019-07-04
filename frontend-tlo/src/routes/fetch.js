exports.fetchSignin = (email="", senha="", token ="") => {
	return fetch('/signin', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({
			email,
			senha
		})
	})
	.then(response => response.json())
	.then(data => data)
    .catch(err => console.error(`error:${err}`));
}

exports.fetchRegister = (nome,email,senha) => {

	return fetch('/register', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			senha,
			nome
		})
	})
	.then(response => response.json())
	.then(data => data)
	.catch(err => console.error(`error:${err}`));
};

exports.atualizaVisita = (userId, token) => {

	return fetch(`/profile/${userId}`, {
	    method: 'get',
	    headers: {
			'Content-Type': 'application/json',
			'Authorization': token
	    }
	    })
	    .then(resp => resp.json())
	    .then(visita => visita)
	    .catch(err => console.error(`error:${err}`));
};

exports.getListaByPage = (page, token) => {

	return fetch(`/page/${page}`, {
		method: "get",
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(resp => resp.json())
	.then(data => data)
	.catch(err => console.error(`error:${err}`));
}