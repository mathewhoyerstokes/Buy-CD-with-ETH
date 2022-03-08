const PrismSale = artifacts.require("PrismSale");
// test will not work as the owner and charity have been changes on deployment of contract to ropsten //
// i want to test if the payment is split up correctly to the owner and to the chariy//
contract("PrismSale", function (accounts) {

  it("should assert true", async function () {
    await PrismSale.deployed();
    return assert.isTrue(true);
  });

  it("should get the right accounts", async function() {
    const contract = await PrismSale.deployed()
    // get the owner//
    const owner = await contract.owner.call()
    const charity = await contract.charity.call()
    assert.isTrue(owner == 0xcdCe6d39D1cc702ADD7a46f0C32fCe52fCc2CF52)
    assert.isTrue(charity == 0x50Bc73Aa1e40844E0A484360A16a267724DA21a5)
  })

  it("should split the payments", async function() {
    const contract = await PrismSale.deployed()
    const startBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[0]))
  
    const purchase = await contract.buy.sendTransaction({
        from: accounts[1],
        value: web3.utils.toWei("0.01", "ether")
    })

    const commission = web3.utils.toBN(web3.utils.toWei("0.008", "ether"))
    const endBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[0]))

    assert.equal(
      startBalance.add(commission).toString(), 
      endBalance.toString())
  })
});
