import React from 'react';
import ReactTable from 'react-table';
import loading from './assets/loadingIcon.svg';
import 'react-table/react-table.css';

class Observer extends React.Component {
	state = {
		observers: null,
		node: null,
		addNode: null,
		removeNode: null
	};
	handleAddressChange = e => {
		this.setState({ node: e.target.value });
	};

	// get observers list
	componentDidMount() {
		const { drizzle } = this.props;
		const obsContract = drizzle.contracts.Glienicke;

		const observers = obsContract.methods['getWhitelist'].cacheCall();
		this.setState({ observers });
	}

	addEnode = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Glienicke;

		const addNode = contract.methods['AddEnode'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});

		this.setState({ addNode });
		this.refs.node.value = null;
	};

	removeEnode = node => {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Glienicke;

		const removeNode = contract.methods['RemoveEnode'].cacheSend(node, {
			from: drizzleState.accounts[0],
			gas: 1000000
		});
		this.setState({ removeNode });
	};
	getTxStatus = () => {
		// get the transaction states from the drizzle state
		const { transactions, transactionStack } = this.props.drizzleState;

		// get the transaction hash using our saved `status`
		const addHash = transactionStack[this.state.addNode];
		const removeHash = transactionStack[this.state.removeNode];
		// if transaction hash does not exist, don't display anything
		if (!addHash && !removeHash) return null;
		// otherwise, return the transaction status

		if (
			transactions &&
			transactions[addHash] &&
			transactions[addHash].status === 'pending'
		) {
			return true;
		} else if (
			transactions &&
			transactions[removeHash] &&
			transactions[removeHash].status === 'pending'
		) {
			return true;
		} else return false;
	};

	render() {
		const { Glienicke } = this.props.drizzleState.contracts;
		const observers = Glienicke.getWhitelist[this.state.observers];
		const observerData = observers && observers.value;
		let observerError = observerData
			? observerData.some(observer => observer === this.state.node)
			: null;

		return (
			<div>
				<div className="transaction-loading">
					<img alt="" src={this.getTxStatus() ? loading : null} />
				</div>
				<div className="add-section">
					<p className={observerError ? 'active-error' : 'error'}>
						This Observer is already present
					</p>
					<input
						ref="node"
						type="text"
						id="node"
						placeholder="Enode"
						autoComplete="off"
						onChange={this.handleAddressChange}
					/>

					<button
						disabled={observerError ? true : false}
						className="add-btn"
						onClick={() =>
							this.addEnode(this.state.node, this.setState({ node: null }))
						}
					>
						Add Observer
					</button>
				</div>

				<div className="list-title">
					<span>
						{' '}
						Current number of Enodes {observerData ? observers.value.length : 0}
					</span>
				</div>

				<div className="list">
					{observerData ? (
						<ReactTable
							data={observers.value.map(address => ({ address }))}
							columns={[
								{
									Header: 'Observer Enodes',
									accessor: 'address',
									width: 440
								},
								{
									Header: 'Remove Enode',
									accessor: 'address',
									width: 150,
									Cell: row => (
										<div>
											<button
												className="remove-btn"
												onClick={() => this.removeEnode(row.value)}
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
					) : (
						<p>No observers at present </p>
					)}
				</div>
			</div>
		);
	}
}

export default Observer;
