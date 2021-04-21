require('dotenv').config({path: __dirname + '/.env'})
const PrivateKeyProvider = require('truffle-privatekey-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

const provider = new PrivateKeyProvider(
    process.env.WALLET_PRIVATE_KEY,
    process.env.NODE_ADDRESS
);
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    
    console.log("Deploying contract from account: ", accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: ["New message!"]
    }).send({
        gas: '1000000',
        from: accounts[0]
    })

    const address = result.options.address 
    console.log("Contracted deployed to: ", address)
}

deploy()