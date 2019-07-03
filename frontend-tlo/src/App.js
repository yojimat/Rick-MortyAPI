import React, { useState, lazy, Suspense } from 'react';
import './App.css';
import Navigation from './componentes/navigation/navigation';
import Signin from './componentes/signin/signin';
import Register from './componentes/register/register';
import SocialSVG from "./componentes/helpers/svgComponent";
import ErrorBoundary from "./componentes/helpers/errorBoundary";

const ListaRickMorty = lazy(() => import('./componentes/lista/listaContainer'));

const App = () => {

  const [route, setRoute] = useState("signin")
    ,[isSignedIn, setIsSignedIn] = useState(false)
    ,[isLoadingHome, setIsLoadingHome] = useState(false);

  return (
    <main className="App">
      <Navigation 
        isSignedIn={isSignedIn}
        onRouteChange={setRoute}
      />
      {route === "home" ?
        <section className="br3 ba b--black-20 cr mb3 shadow-5 center mw9 bg-black white">
          <ErrorBoundary>
            <Suspense fallback={<div className="loader" ></div>}>
              <ListaRickMorty />
            </Suspense>
          </ErrorBoundary>
        </section>
        :(
          route === "signin" ?
          (
            isLoadingHome === true ?
            //Colocar isso dentro de um card
            <section>
              <h1>Aguarde um momento, verificando sessão...</h1>
              <div className="loader" ></div>
            </section>
            :
            <React.Fragment>
              <Signin 
                onRouteChange={setRoute}
                setIsSignedIn={setIsSignedIn}
              />
            </React.Fragment>
          )
          :
          <React.Fragment>
            <Register 
                onRouteChange={setRoute}
                setIsSignedIn={setIsSignedIn}
              />
          </React.Fragment>
        )
      }
      <footer className="pb4 ph3 ph5-ns tc">
        <a 
          className="link near-black hover-white dib h2 w2 mr3" 
          href="https://github.com/yojimat" 
          title="GitHub" 
          target="blank"
        >
          <SocialSVG nomeSocial="GitHub"/>
        </a>
        <a 
          className="link hover-white near-black dib h2 w2 mr3" 
          href="https://www.linkedin.com/in/vntc-fullstack/" 
          title="Linkedin" 
          target="blank"
        >
          <SocialSVG nomeSocial="Linkendin"/>
        </a>
        <strong>
          <a 
            href="https://rickandmortyapi.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link hover-white near-black"
            title="R&M"
          >
            Fonte
          </a>
        </strong>
      </footer>
    </main>
  );
}

export default App;