module.exports = values => {

	let errors = {};
	
	if(!values.email || !isValidEmail(values.email)) errors.email = 'e-mail válido é necessário'; 
	if(!values.nome) errors.nome = "Insira um nome, por favor";
	if(!values.senha || values.senha.length <= 3) errors.senha = "Insira uma senha maior que 3 dígitos, por favor";
	if(values.confirmaSenha !== values.senha) errors.confirmaSenha = "Senhas não conferem";

    return errors;
};

const isValidEmail = email => {

	const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email.match(emailRegEx)) return true;

	return false;
};