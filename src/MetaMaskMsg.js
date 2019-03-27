import React from 'react';
import Popup from 'reactjs-popup';
import warning from './assets/warning.svg';

export default state => (
	<Popup
		open={true}
		modal
		contentStyle={{
			width: '600px',
			height: '400px',
			border: 'none',
			background:
				'radial-gradient( circle 592px at 48.2% 50%, rgba(25, 38, 86, 0.9) 0%, rgb(34, 50, 121, 0.2) 74.6% )'
		}}
		overlayStyle={{ background: '#1e295f87', transition: 'background 8s' }}
	>
		{close => (
			<div className="error-holder">
				<button className="close" onClick={close}>
					&times;
				</button>
				<div className="error-main">
					<img id="warning-logo" alt="" src={warning} />

					<div className="error-content">
						MetaMask is not detected!
						<br />
						{'Please activate or download it '}
						<a
							target="_blank"
							href=" https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB"
						>
							{'here'}
						</a>
						<br />
					</div>
				</div>
			</div>
		)}
	</Popup>
);
