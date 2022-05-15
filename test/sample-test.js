const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  it("Should return the new greeting once it's changed", async function () {

    // Mocha's proposed structure for tests
    const Greeter = await ethers.getContractFactory("Greeter");

    // A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Greeter here is a factory for instances of our greeter contract
    const greeter = await Greeter.deploy("Hello, world!");

    // The contract's state is available as properties on the instancecontract methods on greeter and use them to get the state of the contract
    await greeter.deployed();

    // Contract instance to call a smart contract function in our Solidity code. greet() returns the greeter's greeting. To do this we're using the Chai matchers expect, to and equal.
    expect(await greeter.greet()).to.equal("Hello, world!");


    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();
    
    //We can modify the state of a contract in the same way we read from it. Calling setGreeting will set a new greeting message. After the Promise is resolved, we perform another assertion to verify that the greeting change took effect
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
