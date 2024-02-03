'use strict';



class Model{
  constructor(){    
    this.fetchedAPIData = {
      bitCoin: 0,
      ethereum: 0,
      BinanceCoin: 0
    };
    
    // console.log(this.fetchCryptoData());
      // this.requestDataEveryNSeconds();
  }  

  async requestDataEveryNSeconds(nSeconds=15000){
    // initially calling once
    this.fetchCryptoData();
    setInterval(()=>{
      this.fetchCryptoData();
    },nSeconds);
  }

  async fetchCryptoData() {
    const timestamp = new Date().getTime(); // Generate a timestamp to use as a cache buster
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin&_=${timestamp}`;

    try{
      // console.log(this);
      let response = await fetch(url);
      let data = await response.json();
      data.forEach((coin)=>{
        // console.log(coin);
        if(coin.symbol.toLowerCase() === 'btc'){
          this.fetchedAPIData.bitCoin = coin.current_price;
        }else if(coin.symbol.toLowerCase() === 'eth'){
          this.fetchedAPIData.bitCoin = coin.current_price;
        }else if(coin.symbol.toLowerCase() === 'bnb'){
          this.fetchedAPIData.bitCoin = coin.current_price;
        }
      });

      return true;
    }catch(error){
      return false;
    }

  }
  



}
export default Model;