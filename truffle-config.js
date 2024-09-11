module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  },
  polygon: {
    provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://polygon-rpc.com`),
    network_id: 137,
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
