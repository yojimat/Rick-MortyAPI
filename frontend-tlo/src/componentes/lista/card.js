import "./card.css";
import React from 'react';

const Card = ({ personagem }) => {

	const { name, image, status, species, gender, origin, location} = personagem;

	return(
		<article className="containerCard">
			<header className="cabecario">
				<div className="card-image">
					<img 
						src={image} 
						alt={name}
					/>
				</div>
				<div className="containterTitulo">
					<h2 className="titulo">{name}</h2>
				</div>
			</header>
			<section className="info">
				<div className="divInfo">
					<span>STATUS</span>
					<p>{status}</p>
				</div>
				<div className="divInfo">
					<span>ESPÉCIE</span>
					<p>{species}</p>
				</div>
				<div className="divInfo">
					<span>SEXO</span>
					<p>{gender}</p>
				</div>				
				<div className="divInfo">
					<span>ORIGEM</span>
					<p>{origin.name}</p>
				</div>
				<div className="divInfo">
					<span>ULTIMA LOCALIZAÇÃO</span>
					<p>{location.name}</p>
				</div>
			</section>
		</article>
	);
}

export default Card;