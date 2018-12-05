module.exports = {
  networks: {
    development: {
      host: "34.243.204.94",
      port: 30002,
      network_id: "2017",
      gas: 2500000
    }
  },
  mocha: {
    useColors: true,
    enableTimeouts: false
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
