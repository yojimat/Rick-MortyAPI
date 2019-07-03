import React, { useState } from 'react';
import SaveAuthTokeInSession from "../helpers/saveAuthTokeInSession";
import { fetchSignin, atualizaVisita } from "../../routes/fetch";

const Signin = ({onRouteChange, setIsSignedIn}) => {

	const [credenciaisErro, setcredenciaisErro] = useState(false)
		,[waitingLogin, setWaitingLogin] = useState(false);

	//testa login
	const submitLogin = async () => {

		setWaitingLogin(true);

		const email = document.getElementById("emailLogin").value,
			senha = document.getElementById("senhaLogin").value;

		const data = await fetchSignin(email, senha);

        if (data.userId && data.sucess === 'true') {

			SaveAuthTokeInSession(data.token);

            const visita = await atualizaVisita(data.userId, data.token);

            if(visita) {

	        	setcredenciaisErro(false);
	        	setIsSignedIn(true);
	        	onRouteChange("home");
        	} else {

        		setcredenciaisErro(true);
        	}

            setWaitingLogin(false);
        } else {
        	
            setcredenciaisErro(true);
            setWaitingLogin(false);
        }
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
					{credenciaisErro &&
						<p>
							<span>
								<i>E-mail ou senha incorretos</i>
							</span>
						</p>
					}
					<label htmlFor="emailLogin">e-mail:</label>
					<input
						type="text" 
						id="emailLogin"
						name="emailLogin"
						className="pa1 ba hover-orange
							br3 w-50 mb3 input-reset"
						placeholder="e-mail de contato" 
					/>
					<br />
					<label htmlFor="senhaLogin">senha:</label>
					<input 
						type="password" 
						id="senhaLogin"
						name="senhaLogin"
						className="pa1 ba hover-orange
							br3 w-50 input-reset"
						placeholder="insira uma senha"
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

export default Signin;