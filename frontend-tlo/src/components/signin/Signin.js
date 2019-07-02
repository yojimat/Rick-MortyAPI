import React from 'react';
import './Signin.css';
import { FormErrors } from '../formErrors/formErrors';
import { Spinner } from "reactstrap";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			formErrors: {Email: '', Password: ''},
    		emailValid: false,
    		passwordValid: false, 
    		formValid: false,
    		credenciasIncorretas: false,
    		isLoadingLogin: false
		}
	}

	onEmailChange = (event) => {
		let signInEmailname = event.target.name;
		let signInEmailvalue = event.target.value;

		this.setState({signInEmail: event.target.value},() => { this.validateField(signInEmailname, signInEmailvalue ) });
	}

	onPasswordChange = (event) => {
		let signInPasswordname = event.target.name;
		let signInPasswordvalue = event.target.value;

		this.setState({signInPassword: event.target.value},() => { this.validateField(signInPasswordname,signInPasswordvalue ) });
	}

	saveAuthTokeInSession = (token) => {
		window.localStorage.setItem('token', token);
	}

	validateField(fieldName, value) {
	    let fieldValidationErrors = this.state.formErrors;
	    let emailValid = this.state.emailValid;
	    let passwordValid = this.state.passwordValid;

	    switch(fieldName) {
	      case 'signInEmail':
	        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	        fieldValidationErrors.Email = emailValid ? '' : ' Email inválido.';
	        break;
	      case 'signInPassword':
	        passwordValid = value.length >= 3;
	        fieldValidationErrors.Password = passwordValid ? '' : ' Senha tem que ter no mínimo 3 digitos.';
	        break;
	      default:
	        break;
	    }
	    this.setState({formErrors: fieldValidationErrors,
	                    emailValid: emailValid,
	                    passwordValid: passwordValid
	                  }, this.validateForm);
    }

    validateForm() {
    	this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  	}

  	errorClass(error) {
    	return(error.length === 0 ? '' : 'tem algum erro.');
  	}

	onSubmitSignIn = () => {
		this.setState(prevState => ({
        	...prevState,
        	isLoadingLogin: true
      	}));

		fetch('/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				senha: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.userId && data.sucess === 'true') {
				this.saveAuthTokeInSession(data.token);
            	fetch(`/profile/${data.userId}`, {
              		method: 'get',
              		headers: {
			            'Content-Type': 'application/json',
			            'Authorization': data.token
              		}
            	})
              		.then(resp => resp.json())
              		.then(user => {
                		if (user && user.email) {
                			this.setState(prevState => ({
        						...prevState,
        						isLoadingLogin: false
      						}));

			                this.props.loadUser(user);
			                this.props.onRouteChange('home');
                		}
              		});
			} else {
				this.credenciasIncorretas(true);
				this.props.onRouteChange('signin');
			}
		});
	}

	credenciasIncorretas = (bool) => {
		return this.setState({ 
			credenciasIncorretas: bool, 
			isLoadingLogin: false
		});
	}

	render() {
		const { onRouteChange } = this.props;

		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				{this.state.isLoadingLogin === false ?
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Acesso</legend>
					      {this.state.credenciasIncorretas === true &&
						      <span className="white">
						      	<i>E-mail ou senha incorretos.</i>
						      </span>
					      }
					      <div className="f6 f6-m f6-l fw3 w-100 mt0 lh-copy">
          					<FormErrors formErrors={this.state.formErrors} />
          				  </div>
					      <div className={`mt3 ${this.errorClass(this.state.formErrors.Email)}`}>
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
					        <input  
					        	className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="email" 
					        	name="signInEmail"  
					        	id="email-address"
					        	placeholder="e-mail"
					        	value={this.state.signInEmail}
					        	onChange={this.onEmailChange}
					        />
					      </div>
					      <div className={`mv3 ${this.errorClass(this.state.formErrors.Password)}`}>
					        <label className="db fw6 lh-copy f6" htmlFor="password">Senha</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="password" 
					        	name="signInPassword"  
					        	id="password"
					        	placeholder="senha"
					        	value={this.state.signInPassword}
					        	onChange={this.onPasswordChange} 
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
						      className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
						      type="submit" 
						      value="Logue" 
						      onClick={this.onSubmitSignIn}
						      disabled={!this.state.formValid}
					      />
					    </div>
					    <div className="lh-copy mt3">
					      <p 
					      	onClick={() => onRouteChange('register')} 
					      	className="f6 link dim white db pointer">
					      	Registre-se
					      	</p>
					    </div>
					</div>
					:
					<React.Fragment>
                		<h1 className="white">Aguarde um momento, verificando dados...</h1>
                		<Spinner color="warning" />
              		</React.Fragment>
				}
				</main>
			</article>
		);
	}	
}
export default Signin;