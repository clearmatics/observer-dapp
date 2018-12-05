import React, { Component } from 'react';
import Footer from './Footer';
import Router from './router';

import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<Router />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
