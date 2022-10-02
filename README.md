# Intra-College Tokenized Payment System

The Intra-College Tokenized Payment System facilitates transfer of a utility tokens that can be used by students to purchase a variety of products and services sold across the college campus. Introducing the PSGCoin, An ERC-20 token built on the ethereum blockchain.
The utility token serves as a campus currency and is issued as a reward for achievements in events.

## Overview of ERC-20 token
ERC stands for Ethereum Request for Comment,ERC-20 is one of the most significant ERCs. It has emerged as the technical standard for writing smart contracts on the Ethereum blockchain network, used for token implementation. ERC-20 contains a set of rules that all Ethereum based tokens must follow.

ERC-20 defines tokens as blockchain-based assets that can be sent/received and have value. ERC-20 coins run on Ethereum’s blockchain network and use gas as the transaction fee.

## Prerequesities
- MetaMask account
- NodeJS
- NPM / Yarn

## Usage

#### To run the application: 
- Git clone the repository
- Navigate to the current working directory
- Run ```yarn``` in the terminal
- After the dependencies are installed, run ```yarn start``` to get going!

Upon authorisation through login, various functionalities depending on whether you are an admin or a student will be enabled.

- Admins can award coins to the students by simply selecting the roll number, name, and department of the student and entering the amount to be transferred. 
- Admins can post events on the application which display rewards along with details of the event.
Admins can view transaction history
- Students can view their account balance and can utilize their coins in transaction with amenities like Book Depot and Canteen 
- Students can browse opportunities (events) that would reward them with coins
- Students can view transaction history  

## API Reference

#### Connecting your MetaMask wallet
```js
let accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
```

#### Checking your account balance
```js
const tokenAddress = "0xYOUR_TOKEN_ADDRESS";
const walletAddress = "0xYOUR_WALLET_ADDRESS";

const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
contract.methods.balanceOf(walletAddress).call()
  .then((res) => {
    setBalance(res);
  })
```

#### Transaction between two accounts
```js
method: "eth_sendTransaction",
params: [
  {
    from: fromAddress,
    to: tokenAddress,
    data: getDataFieldValue(toAddress, parseInt(amount)),
  },
],
```


## Documentation

- [MetaMask](https://docs.metamask.io/guide/)
- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [MongoDB](https://www.mongodb.com/docs/)


## Authors

- [@jeyam03](https://github.com/jeyam03)
- [@Adityavarma14](https://github.com/Adityavarma14)
- [@shifaaa27](https://github.com/shifaaa27)
- [@srijith-29](https://github.com/srijith-29)


## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". 

Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## References
- [ERC20](https://www.quicknode.com/guides/smart-contract-development/how-to-create-and-deploy-an-erc20-token)
- [Token Creation](https://github.com/joe-singh/EthToken/blob/main/token.sol)
- [Remix Ethereum IDE](https://remix.ethereum.org/)
- [EtherScan API](https://docs.etherscan.io)
