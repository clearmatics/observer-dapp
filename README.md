## Observer Dapp on the live network Autonity network

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

A network needs at least four validators to function properly and the Autonity network needs a deployed bridging contract (Glienicke).

The main two functions are: (1) adding an Observer and (2) removing an existing Observer. In both cases, the identifier used is the enode address. These are found in `Observer.js`. By utilising either function, Metamask is triggered and brings the user to the payment window.

In the bridging contract (Glienicke.json), the network address can be found. Note that the network addresses for the Observer and Validator DApp are distinct.

The Observer node is a superset of the Validator node. Thus, a validator does not necessarily have to be an observer. 

### Observer: Miscellaneous

Interactions with smart contracts are facilitated with the library  _Drizzle_ to make it easer to write DApp UIs. The loading button (and other alternatives) can be found at [loading.io](loading.io). 

