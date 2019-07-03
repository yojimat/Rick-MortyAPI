import React, { useState, useEffect } from 'react';
import Card from "./card";
import "./listaContainer.css"
import { getListaByPage } from "../../routes/fetch";

const ListaContainer = () => {
	const [listaAtual, setListaAtual] = useState(),
		[paginaAtual, setPaginaAtual] = useState(1)
		,[totalPaginas, setTotalPaginas] = useState(0);

	useEffect(() => {

		getListaRandom(setListaAtual, setPaginaAtual, setTotalPaginas);
	},[]);

	return (
		<>
			<nav className="pages">
				<small className="totalPages mr5">total de páginas:{totalPaginas}</small>
				<button 
					className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib br3 mt3"
					disabled={paginaAtual<=1}
				>
					Página Anterior
				</button>
				<span className="mh5">
					Página atual:{paginaAtual}
				</span>
				<button 
					className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib br3 mt3"
					disabled={paginaAtual>=totalPaginas}
				>
					Proxima página
				</button>
			</nav>
			<hr />
			<section className="containerListaCard">
				{listaAtual ?
					listaAtual.map((item,i) => {
						return <Card personagem={listaAtual[i]} key={i}/>
					})
					:
					<span>Lista vazia</span>
				}
			</section>	
		</>
	);
}

export default ListaContainer;

const getListaRandom = async (setListaAtual, setPaginaAtual, setTotalPaginas) => {
	const randomPage = Math.floor(Math.random()*(25-1))+1
		,data = getListaByPage(randomPage);
	console.log(data)
	setPaginaAtual(randomPage);
	setListaAtual(data.results);
	setTotalPaginas(data.pages);
};


		