import React, { useState } from 'react';
import SaveAuthTokeInSession from "../helpers/saveAuthTokeInSession";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Validacao from "../helpers/validacao";
import { fetchRegister, atualizaVisita } from "../../routes/fetch";

const valoresInicias = {
	nome: "",
	email: "",
	senha: "",
	confirmaSenha: ""
};

const Register = ({onRouteChange, setIsSignedIn}) => {

	const [credenciaisErro, setcredenciaisErro] = useState(false);

	const handleSubmit = async (values,{setSubmitting}) => {

		const { nome, email, senha} = values;

		const data = await fetchRegister(nome,email,senha);

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
		} else{
			setcredenciaisErro(true);
		}

		setSubmitting(false);
    	return;
  	}

	return (
		<section className="br3 ba b--black-20 cr mb3 shadow-5 center mw6 bg-black white">
			<Formik
				initialValues={valoresInicias}
				validate={Validacao}
				onSubmit={handleSubmit}
				render={FormikProps => {
					return(
						<Form>
							<fieldset className="b--transparent">
								<legend className="f2 fw6 ph0 mh0">Registro</legend>
								{credenciaisErro &&
									<p>
										<span>
											<i>E-mail já está sendo utilizado</i>
										</span>
									</p>
								}
								<ErrorMessage name="nome" component="small" className="orange"/>
								<br />
								<label htmlFor="nomeRegistro">nome:</label>
								<Field 
								    type="text" 
								    name="nome" 
								    id="nomeRegistro"
								    placeholder="nome completo" 
								    className='pa1 ba hover-orange br3 w-50 mb2 input-reset'
								    disabled={FormikProps.isSubmitting}
								/>
								<br />
								<ErrorMessage name="email" component="small" className="orange"/>
								<br />
								<label htmlFor="emailRegistro">e-mail:</label>
								<Field 
								    type="email" 
								    name="email" 
								    id="emailRegistro"
								    placeholder="e-mail de contato" 
								    className='pa1 ba hover-orange br3 w-50 mb2 input-reset'
								    disabled={FormikProps.isSubmitting}
								/>						
								<br />
								<ErrorMessage name="senha" component="small" className="orange"/>
								<br />
								<label htmlFor="senhaRegistro">senha:</label>
								<Field 
								    type="password" 
								    name="senha" 
								    id="senhaRegistro"
								    placeholder="insira uma senha" 
								    className='pa1 ba hover-orange br3 w-50 mb2 input-reset'
								    disabled={FormikProps.isSubmitting}
								/>
								<br />
								<ErrorMessage name="confirmaSenha" component="small" className="orange"/>
								<br />
								<label htmlFor="confirmaSenhaRegistro">confirmar senha:</label>
								<Field 
								    type="password" 
								    name="confirmaSenha" 
								    id="confirmaSenhaRegistro"	
								    placeholder="repita a senha" 
								    className='pa1 ba hover-orange br3 w-50 mb2 input-reset'
								    disabled={FormikProps.isSubmitting}
								/>
								<br />
								{FormikProps.isSubmitting ?
									<>
										<h3 className="white">Aguarde um momento, verificando dados...</h3>
										<div className="loader" ></div>
									</>
									:
									<button 
										className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib br3 mt3" 
										type="submit"
									>
										Registrar
									</button>
								}
							</fieldset>
						</Form>
					);
				}}
			/>		
		</section>
	);
}

export default Register;