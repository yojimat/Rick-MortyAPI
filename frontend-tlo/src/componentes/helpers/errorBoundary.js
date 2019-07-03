import React, { Component } from 'react';

//Classe especial para pegar erros
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return <span>Erro de conexão, verifique sua conexão com a internet.</span>;
    }

    return this.props.children; 
  }
}
export default ErrorBoundary;