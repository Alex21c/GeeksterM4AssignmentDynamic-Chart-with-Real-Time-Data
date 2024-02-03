'use strict';
import anime from 'animejs/lib/anime.es.js';
import Chart from 'chart.js/auto';

class View{

  constructor(model){
    this.model = model;
    // initializing charts

      this.chartsData = {
        chartFake: {
          name: 'chartFake',
          chart: null,
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'Fake Data (Math.random())',
              data: [1500],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartFake'),
          width: 500,
          height: 200,
          chartType: 'line'
        },
        chartGenuineBitCoin: {
          name: 'chartGenuineBitCoin',
          chart: null,
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'BTC (USD)',
              data: [42000],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartGenuineBitCoin'),
          width: 500,
          height: 200,
          chartType: 'line'
        },
        chartGenuineEthereum: {
          name: 'chartGenuineEthereum',
          chart: null,
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'ETH (USD)',
              data: [2500],
              borderWidth: 1,
            }]
          },
          ctx : document.getElementById('chartGenuineEthereum'),
          width: 500,
          height: 200,
          chartType: 'line'
        },
        chartGenuineBinanceCoin: {
          name: 'chartGenuineBinanceCoin',
          chart: null,
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'BNB (USD)',
              data: [500],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartGenuineBinanceCoin'),
          width: 500,
          height: 200,
          chartType: 'line'
        }
        
      };
  
      this.colors={
        'slate700': 'rgb(51 65 85)',
        'zinc50': 'rgb(250 250 250)'
      };
      this.stylesTable={
        border: "border-solid border-2 border-slate-700"
      };
  // chart metadata   
      this.chartMetadataTemplate={      
        options: {
          scales: {
            x: {
              beginAtZero: true,
              ticks:{
                color:this.colors.slate700,
              },
              grid: {
                color:this.colors.slate700,
              },            
            },
            y: {
              beginAtZero: true,
              ticks:{
                color:this.colors.slate700,
              },
              grid: {
                color:this.colors.slate700,
              }               
            }          
          },
          plugins: {
            legend: {
              labels: {
                color:this.colors.zinc50,
                font: {
                  family: 'Roboto',
                  size: '20px', // Change the size according to your preference                
                  weight: 'semibold' // Change the weight (normal, bold, 100-900)
                }              
              }

            }
          }


        }
      };
      
    // canvas configure
    // this.configureCanvas();


    // event listeners and DOM Fetching
      // window.addEventListener('resize', this.throttling(this.resizeChart, 200, this.ctx));

    // generating investment table
      // this.generateInvestmentTable();
// this.generateChart(this.chartFake, this.ctxChartFake, this.chartsData.chartFake, 'line', true);
  this.generateChart(this.chartsData.chartFake);
  this.generateChart(this.chartsData.chartGenuineBitCoin);
  this.generateChart(this.chartsData.chartGenuineEthereum);
  this.generateChart(this.chartsData.chartGenuineBinanceCoin);

// this.selectChartType.classList.remove('displayNone'); 


    
  }

  updateFakeDataChart(chart){
    // console.log(chart.data)
    let newLabel = (Number(chart.data.labels.at(-1).replace('s', '')) + 5  + 's');
    chart.data.labels.push(newLabel);
    let newFakeData = (Math.random()*1500).toFixed(2);
    chart.data.datasets[0].data.push(newFakeData);    
    chart.update();
  }

  async updateGenuineChartData(chart, chartName){
    // console.log('okay listened to you!', chart);
    // console.log(this.model.fetchedAPIData);
    // console.log(chartName);


    // console.log(chart.name)

    let currentPrice = null;
    let amIallowedToUpdateChart = false;
    if(chartName === 'chartGenuineBitCoin'){
      // console.log( this.model.fetchedAPIData.bitCoinCurrentPrice ,  this.model.fetchedAPIData.bitCoinPreviousPrice);
      if(this.model.fetchedAPIData.bitCoinCurrentPrice === this.model.fetchedAPIData.bitCoinPreviousPrice){
        // then there is no need to update chart 
        console.warn('INFO: currentPrice and previousPrices are same for bitcoin, so no need to update the chart');
        // return;
      }
      // otherwise
        currentPrice = this.model.fetchedAPIData.bitCoinCurrentPrice;
        amIallowedToUpdateChart=true;
    }else if(chartName === 'chartGenuineEthereum'){
      // console.log(  this.model.fetchedAPIData.ethereumCurrentPrice ,  this.model.fetchedAPIData.ethereumPreviousPrice);
      if(this.model.fetchedAPIData.ethereumCurrentPrice === this.model.fetchedAPIData.ethereumPreviousPrice){
        // then there is no need to update chart 
        console.warn('INFO: currentPrice and previousPrices are same for etherium, so no need to update the chart');
        // return;
      }
      // otherwise
        currentPrice = this.model.fetchedAPIData.ethereumCurrentPrice;
        amIallowedToUpdateChart=true;
    }else if(chartName === 'chartGenuineBinanceCoin'){
      // console.log(  this.model.fetchedAPIData.ethereumCurrentPrice ,  this.model.fetchedAPIData.ethereumPreviousPrice);
      if(this.model.fetchedAPIData.BinanceCoinCurrentPrice === this.model.fetchedAPIData.BinanceCoinPreviousPrice){
        // then there is no need to update chart 
        console.warn('INFO: currentPrice and previousPrices are same for binanceCoin, so no need to update the chart');
        // return;
      }
      // otherwise
        currentPrice = this.model.fetchedAPIData.BinanceCoinCurrentPrice;
        amIallowedToUpdateChart=true;
    }


    // update the chart
      if(amIallowedToUpdateChart){
        let newLabel = (Number(chart.data.labels.at(-1).replace('s', '')) + 15  + 's');    
        chart.data.labels.push(newLabel);
        chart.data.datasets[0].data.push(currentPrice);    
        chart.update();    
      }
    
  }

  throttling(callback, delay, ctx){
    let intervalId=null;
    return ()=>{
      if(intervalId !== null){
        clearInterval(intervalId);        
      }
      intervalId = setTimeout(()=>{
        callback(this.ctx);
      },delay);
    }
  }

  resizeChart(ctx){
    if(window.innerWidth <=442){
      ctx.style.width='300px';
      ctx.style.height='300px';
    }else if(window.innerWidth <=525){
      ctx.style.width='400px';
      ctx.style.height='400px';
    }else{
      ctx.style.width='500px';
      ctx.style.height='500px';
    }
      // ctx.style='';
      // ctx.width=300;
      // ctx.height=300;
      // console.log(ctx);
  }


  generateChart(chartsData){
    let chart = chartsData.chart;
    
      
    // console.log(chartData.data.labels);

      
      chart = new Chart(chartsData.ctx, {
        type: chartsData.chartType, // good one are: pie, bar, doughnut
        data: {...chartsData.data},
        options: {...this.chartMetadataTemplate.options}
      });
       //activate real time data fetch       
        
          if(chartsData.name === 'chartFake'){
            // console.log(`i'm here`)
            setInterval(()=>{     
              this.updateFakeDataChart(chart);
            }, 5000);
          }else{
            setInterval(()=>{     
              this.updateGenuineChartData(chart, chartsData.name);
            },15000);
          }     
      

    //   this.resizeChart(ctx);
      window.addEventListener('load', ()=>{
        console.log('trying to animate!');
        anime({
          targets: `#${chartsData.name}`,
          scale: [
            {value: .7, easing: 'easeOutSine', duration: 300},
            {value: 1, easing: 'easeInOutQuad', duration: 1500}
          ],
  
        });
      });

      
      
      




  }  



  
}  

export default View;