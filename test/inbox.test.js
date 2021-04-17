const assert = require('assert')
//new TestRPC. Creates a local ethereum network
const ganache = require('ganache-cli')
//Web3 is constructor class. Accepts a provider to connect to a network
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const {interface, bytecode} = require('../compile')

let accounts
let inbox
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new Web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: ["Initial message"]
    }).send({
        from: accounts[0],
        gas: "1000000"
    })
})

describe("Inbox", () => {
    it("deploys a contract", () => {
        console.log(inbox)
    })
})