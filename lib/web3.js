import Web3 from 'web3';
import PrismSale from './PrismSale.json'

const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/8859cfd67c4347bd832d111c10495bf8");

const contractAddress = "0x162daD0480001D4d84C919c54bE916d02FBb93Fc"
const contract = new web3.eth.Contract(PrismSale.abi, contractAddress)

const sharedMessage = "This is to confirm your account when downloading the limited edition album"

export { web3, contract, contractAddress, sharedMessage }