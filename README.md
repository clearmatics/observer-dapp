
## Observer Dapp on the live network Autonity network

### To run the application

Clone the repo

- npm install
- npm start
- connect to Matamask and create a new custom RPC with http://34.243.204.94:30003 as the RPC url

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
