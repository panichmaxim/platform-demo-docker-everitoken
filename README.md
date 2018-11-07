# About project

Project is currency alpha version and supported several blockchain networks: everiToken (mainnet, testnet)
ethereum (mainnet, testnet).
This is a simplified demo with auto-create, compile and deploy contracts to blockchain network. 
Full featured project available on https://tokensale.dreamteam.tech and support crypto-currency 
payments, tokens withdraw, transaction statuses (fail, success, pending), discount, bounty and referral system.

# Installation

```
docker build -t dreamteam-platform .
docker run -d -p 3000:3000 dreamteam-platform
```

Contracts deployed every minute.

# Sources

`src/service/deploy.js`: Simple deploy service

`src/service/deployer/providers/everitoken/everitoken.js`: Everitoken provider

