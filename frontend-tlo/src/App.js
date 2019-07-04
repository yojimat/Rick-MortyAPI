import React, { useState, lazy, Suspense, useEffect } from 'react';
import './App.css';
import Navigation from './componentes/navigation/navigation';
import Signin from './componentes/signin/signin';
import Register from './componentes/register/register';
import SocialSVG from "./componentes/helpers/svgComponent";
import ErrorBoundary from "./componentes/helpers/errorBoundary";
import { fetchSignin, atualizaVisita} from "./routes/fetch";
import ListaRickMorty from './componentes/lista/listaContainer';

const App = () => {

  const [route, setRoute] = useState("signin")
    ,[isSignedIn, setIsSignedIn] = useState(false)
    ,[isLoadingHome, setIsLoadingHome] = useState(false);

  useEffect(() => {

    setIsLoadingHome(true);

    creatingSession(setIsSignedIn, setRoute, setIsLoadingHome);
  },[]);

  return (
    <main className="App">
      <Navigation 
        isSignedIn={isSignedIn}
        onRouteChange={setRoute}
        setIsSignedIn={setIsSignedIn}
      />
      {route === "home" ?
        <section className="br3 ba b--black-20 cr mb3 shadow-5 center mw9 bg-black white">
              <ListaRickMorty />
        </section>
        :(
          route === "signin" ?
          (
            isLoadingHome === true ?
            <section className="br3 ba b--black-20 cr mb3 shadow-5 center mw6 bg-black white">
              <h2>Aguarde um momento, verificando sessão...</h2>
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

const creatingSession = async (setIsSignedIn, setRoute, setIsLoadingHome) => {

  const token = window.localStorage.getItem('token')
      ,data = await fetchSignin("","",token);

    if(data && data.id) {

      const visita = await atualizaVisita(data.id, token);

      if(visita) {

        setIsSignedIn(true);
        setRoute("home");
      }
    }

  setIsLoadingHome(false);
}
export default App;