import React from 'react';
import ReactTable from 'react-table';
import LoadingData from './LoadingData';
import loading from './assets/loadingIcon.svg';
import 'react-table/react-table.css';

class Observer extends React.Component {
	state = {
		node: null,
		validator: null,
		addVal: null,
		removeVal: null
	};
	handleAddressChange = e => {
		this.setState({ node: e.target.value });
	};

	// get validator list
	componentDidMount() {
		const { drizzle } = this.props;
		const obsContract = drizzle.contracts.Soma;

		const validator = obsContract.methods['getValidators'].cacheCall();
		this.setState({ validator });
	}

	addValidator = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Soma;

		const addVal = contract.methods['AddValidator'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});

		this.setState({ addVal });
		this.refs.node.value = '';
	};

	removeValidator = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Soma;

		const removeVal = contract.methods['RemoveValidator'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});
		this.setState({ removeVal });
	};
	getTxStatus = () => {
		// get the transaction states from the drizzle state
		const { transactions, transactionStack } = this.props.drizzleState;

		// get the transaction hash using our saved `status`
		const addHash = transactionStack[this.state.addVal];

		// if transaction hash does not exist, don't display anything
		if (!addHash) return null;
		// otherwise, return the transaction status
		if (
			transactions &&
			transactions[addHash] &&
			transactions[addHash].status === 'pending'
		) {
			return true;
		} else return false;
	};
	render() {
		const { Soma } = this.props.drizzleState.contracts;
		const validator = Soma.getValidators[this.state.validator];

		let transactionList =
			validator && validator.value[0].length ? (
				<div>
					<div className="list-title">
						<span> Current number of Validators {validator.value.length} </span>
					</div>
					<div className="list">
						<ReactTable
							data={validator.value.map(address => ({ address }))}
							columns={[
								{
									Header: 'Validator Address',
									accessor: 'address',
									width: 440
								},
								{
									Header: 'Remove Validator',
									accessor: 'address',
									width: 150,
									Cell: row => (
										<div>
											<button
												className="remove-btn"
												onClick={() => this.removeValidator(row.value)}
											>
												Remove
											</button>
										</div>
									)
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
						/>
					</div>
				</div>
			) : (
				<p>No validator at present </p>
			);

		if (validator && validator.value) {
			return (
				<div className="validator-section">
					<div className="transaction-loading">
						<img alt="" src={this.getTxStatus() ? loading : ''} />
					</div>
					<div className="add-section">
						<input
							ref="node"
							type="text"
							id="node"
							placeholder="Address"
							autoComplete="off"
							onChange={this.handleAddressChange}
						/>

						<button
							className="add-btn"
							onClick={() => this.addValidator(this.state.node)}
						>
							Add Validator
						</button>
					</div>
					{transactionList}
					<div />
				</div>
			);
		} else {
			return <img alt="" className="loading-svg" src={loading} />;
		}
	}
}

export default LoadingData(Observer);
