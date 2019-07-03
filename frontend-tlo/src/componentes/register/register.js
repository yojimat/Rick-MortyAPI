import React from 'react';

const Register = () => {
	return (
		<section className="br3 ba b--black-20 cr mb3 shadow-5 center mw6 bg-black white">
			<form>
				<fieldset className="b--transparent">
					<legend className="f2 fw6 ph0 mh0 mb3">Registro</legend>
					<label htmlFor="email">nome:</label>
					<input 
						type="text" 
						id="nome"
						name="nome"
						className="pa1 ba hover-orange
							br3 w-50 mb3 input-reset"
					/>
					<br />
					<label htmlFor="email">e-mail:</label>
					<input 
						type="text" 
						id="email"
						name="email"
						className="pa1 ba hover-orange
							br3 w-50 mb3 input-reset"
					/>
					<br />
					<label htmlFor="senha">senha:</label>
					<input 
						type="password" 
						id="senha"
						name="senha"
						className="pa1 ba hover-orange
							br3 w-50 input-reset"
					/>
					<br />
					<button 
						className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib br3 mt3" 
						type="button" 
					>
						Registrar
					</button>
				</fieldset>
			</form>
		</section>
	);
}

export default Register;