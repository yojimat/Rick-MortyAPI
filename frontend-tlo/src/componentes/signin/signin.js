import React, { useState } from 'react';

const Signin = ({onRouteChange, setIsSignedIn}) => {

	const [credenciasErro, setcredenciasErro] = useState(false)
		,[waitingLogin, setWaitingLogin] = useState(false);

	const atualizaVisita = () => {

		fetch(`/profile/${data.userId}`, {
            method: 'get',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': data.token
            }
        })
        .then(resp => resp.json())
        .then(visita => {
            console.log(visita)
           	if(visita) {
           		
            	setcredenciasErro(false);
            	setIsSignedIn(true);
            	onRouteChange("home");
            }
        })
        .catch(err => console.error(`error:${err}`));
	}

	const submitLogin = () => {

		setWaitingLogin(true);

		const email = document.getElementById("email").value,
			senha = document.getElementById("senhaLogin").value;
		fetch('/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email,
				senha
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.userId && data.sucess === 'true') {

				saveAuthTokeInSession(data.token);

            	atualizaVisita(data.userId, data.token);
            } 
            else {
            	setcredenciasErro(true);
            }
        })
        .catch(err => console.error(`error:${err}`));

		setWaitingLogin(false);
	}

	return (
		<section className="br3 ba b--black-20 cr mb3 shadow-5 center mw6 bg-black white">
			{ waitingLogin ?
				<>
					<h2 className="white">Aguarde um momento, verificando dados...</h2>
					<div className="loader" ></div>
				</>
				:
				<form>
				<fieldset className="b--transparent">
					<legend className="f2 fw6 ph0 mh0 mb2">Login</legend>
					{credenciasErro &&
						<p>
						<span>
							<i>E-mail ou senha incorretos</i>
						</span>
						</p>
					}
					<label htmlFor="email">e-mail:</label>
					<input 
						type="text" 
						id="email"
						name="email"
						className="pa1 ba hover-orange
							br3 w-50 mb3 input-reset"
					/>
					<br />
					<label htmlFor="senhaLogin">senha:</label>
					<input 
						type="password" 
						id="senhaLogin"
						name="senhaLogin"
						className="pa1 ba hover-orange
							br3 w-50 input-reset"
					/>
					<br />
					<button 
						className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib br3 mt3" 
						type="button"
						onClick={() => submitLogin()}
					>
						acessar
					</button>
				</fieldset>
			</form>
			}
		</section>
	);
}

const saveAuthTokeInSession = (token) => {
	window.localStorage.setItem('token', token);
}

export default Signin;