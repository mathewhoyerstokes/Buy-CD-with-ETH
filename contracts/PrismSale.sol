// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PrismSale {

  uint public totalSales;
  uint public maxSales;
  address public owner;
  address public charity;

  mapping (address => bool) sales;

  constructor() {
    totalSales = 0;
    maxSales = 100;
    owner = 0xcdCe6d39D1cc702ADD7a46f0C32fCe52fCc2CF52;
    charity = 0x50Bc73Aa1e40844E0A484360A16a267724DA21a5;
  }

  function canBuy() public view returns (bool) {
      return totalSales < maxSales;
  }

  function hasAccess () public view returns (bool) {
    return sales[msg.sender];
  }

  function buy () public payable returns (bool) {
    require(canBuy() == true, "can't buy this.");
    require(msg.value == 0.01 ether, "you didnt send the correct amount.");
    require(hasAccess() == false, "you have already bought this. ");

    payable(owner).transfer(msg.value * 80 / 100);
    payable(charity).transfer(msg.value * 20 / 100);

    totalSales = totalSales + 1;
    sales[msg.sender] = true;

    return true;
  }
}
