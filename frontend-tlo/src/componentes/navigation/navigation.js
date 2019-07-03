import React from 'react';

const Navigation = ({isSignedIn, onRouteChange}) => {
	return (
		<nav className="fr">
			{isSignedIn ?
				<span 
					className="f3 link pa3 pointer hover-white"
					onClick={() => {
						window.localStorage.removeItem('token');
						onRouteChange('signin');
					}}
				>
					Sair
				</span>
				:
				<>
					<span 
						className="f3 link pa3 pointer hover-white"
						onClick={() => onRouteChange('signin')}
					>
						Login
					</span>
					<span 
						className="f3 link pa3 pointer hover-white"
						onClick={() => onRouteChange('register')}
					>
						Registre-se
					</span>
				</>
			}
		</nav>
	);
}

export default Navigation;