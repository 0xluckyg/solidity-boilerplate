const assert = require('assert')
//new TestRPC. Creates a local ethereum network
const ganache = require('ganache-cli')
//Web3 is constructor class. Accepts a provider to connect to a network
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const {interface, bytecode} = require('../compile')

let accounts
let inbox
let initialMessage = "Initial message!"
let setMessage = "Set message!"
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: [initialMessage]
    }).send({
        //specify who sends the contract and how much to pay
        from: accounts[0],
        gas: "1000000"
    })
})

describe("Inbox", () => {
    it("deploys a contract", () => {
        assert.ok(inbox.options.address)
    })

    it("has a default message", async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, initialMessage)
    })

    it("Can change message", async () => {
        await inbox.methods.setMessage(setMessage).send({
            from: accounts[0],
            // gas: ""
        })
        const message = await inbox.methods.message().call()
        assert.equal(message, setMessage)
    })
})