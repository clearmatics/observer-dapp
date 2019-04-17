## Observer Dapp on the live network Autonity network

<img src="src/assets/observer.png" alt="drawing" width="1024" height="768">

### To run the application

Clone the repo

- install [Metamask](https://metamask.io/) and create an account
- press the icon of the current network name and choose Custom RPC
- add http://34.243.204.94:30005 to the new RPC URL field and press Save 
- npm install
- npm start

Please note: MetaMask is having issues running on Firefox. This bug was reported back in August and we're awaiting a fix. Until then please use Chrome.

The frontend will load on http://localhost:3000/

### Docker
To run the Observer frontend locally:
```
make build
make run
```

To clean up:
```
make clean
```

### Observer: General

A network needs at least four validators to function properly and the Autonity network needs a deployed permissioning contract [Glienicke](https://docs.autonity.io/network-perm/glienicke.html)). 

The Observer DApp has many similarities with how the [Validator DApp](https://github.com/clearmatics/validator-dapp/tree/master) is implemented and their underlying smart contracts. The Observer is based on a P2P permissioning contract while the Validator contract ([Soma](https://docs.autonity.io/network-perm/soma.html)) is aimed to govern validators.

The similarities and differences of these two network permissioning contracts can be summarised as follows:
#### Similarities
* Both are smart-contract based permission contracts with functions to add and remove nodes
* Both implement an interface which makes it possible to use a custom protocol
* Both implement an interface which allows or denies a peer connection to a network
#### Differences
* Glienicke is the initial permissioning for a peer to participate and interact with a network
* Soma is permissioning for peers to participate in the consensus mechanism
* An observer node (in the Glienicke set) isn't necessary a validator (in the Soma set) but a validator is always an observer (if a node is in the Soma set it is also in the Glienicke set)

### Observer: Main components

The main two functions are: (1) adding an Observer and (2) removing an existing Observer. In both cases, the identifier used is the enode address. These are found in `Observer.js`. By utilising either function, Metamask is triggered and brings the user to the payment window.

In the permissioning contract (Glienicke.json), the network address can be found. Note that the network addresses for the Observer and Validator DApp are distinct. 

### Observer: Miscellaneous

Interactions with smart contracts are facilitated with the library  _Drizzle_ to make it easer to write DApp UIs. The loading button (and other alternatives) can be found at [loading.io](https://loading.io). 

