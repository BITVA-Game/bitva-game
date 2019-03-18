import React, { Component } from 'react';
import MainMenu from './MainMenu';
import './css/Profile.css';

class Profile extends Component {
	render() {
		const characters = this.props.app.profile.characters.map(character => (
			<span key={character}>{character}</span>
		));
		const deck = this.props.app.profile.deck.map(card => (
			<span key={card}>{card}</span>
		));

		return(
			<div className="profile app-background">
				<div className="info">
					<p>Characters: {characters}</p>
					<p>Deck: {deck}</p>
					<p>Gold: {this.props.app.profile.gold}</p>
				</div>
				<MainMenu sendMessage={this.props.sendMessage} />
			</div>
		);
	}
}

export default Profile;