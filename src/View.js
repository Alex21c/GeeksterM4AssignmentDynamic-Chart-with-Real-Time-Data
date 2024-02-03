'use strict';
import anime from 'animejs/lib/anime.es.js';
import Chart from 'chart.js/auto';

class View{

  constructor(model){
    this.model = model;
    // initializing charts
      this.chartFake = null;
      this.chartGenuineBitCoin = null;
      this.chartGenuineEthereum = null;
      this.chartGenuineBinanceCoin = null;



      this.chartsData = {
        chartFake: {
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'Fake Data (Math.random())',
              data: [42000],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartFake'),
          width: 500,
          height: 200
        },
        chartGenuineBitCoin: {
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'ETH (USD)',
              data: [42000],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartGenuineBitCoin'),
          width: 500,
          height: 200
        },
        chartGenuineEthereum: {
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'ETH (USD)',
              data: [42000],
              borderWidth: 1,
            }]
          },
          ctx : document.getElementById('chartGenuineEthereum'),
          width: 500,
          height: 200
        },
        chartGenuineBinanceCoin: {
          data: {
            labels: ['0s'],
            datasets: [{
              label: 'BNB (USD)',
              data: [42000],
              borderWidth: 1,
            }]
          },
          ctx: document.getElementById('chartGenuineBinanceCoin'),
          width: 500,
          height: 200
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
this.generateChart(this.chartFake, this.ctxChartFake, this.chartsData.chartFake, 'line', true);
// this.generateChart(this.chartGenuineBitCoin, this.ctxChartGenuineBitCoin, this.chartsData.chartGenuineBitCoin, 'line');
// this.generateChart(this.chartGenuineEthereum, this.ctxChartGenuineEthereum, this.chartsData.chartGenuineEthereum, 'line');
// this.generateChart(this.chartGenuineBinanceCoin, this.ctxChartGenuineBinanceCoin, this.chartsData.chartGenuineBinanceCoin, 'line');

// this.selectChartType.classList.remove('displayNone'); 


    
  }

  updateFakeDataChart(chart){
    // console.log(chart.data)
    let newLabel = (Number(chart.data.labels.at(-1).replace('s', '')) + 5  + 's');
    chart.data.labels.push(newLabel);
    let newFakeData = (Math.random()*45000).toFixed(2);
    chart.data.datasets[0].data.push(newFakeData);    
    chart.update();
  }

  async updateGenuineChartData(chart){
    // console.log('okay listened to you!', chart);
    console.log(this.model.fetchedAPIData);
    // let newLabel = (Number(chart.data.labels.at(-1).replace('s', '')) + 5  + 's');    
    // chart.data.labels.push(newLabel);

    // let newFakeData = (Math.random()*45000).toFixed(2);
    // chart.data.datasets[0].data.push(newFakeData);    
    // chart.update();
    
    
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


  generateChart(chart, ctx, chartData, chartType){
    
    if(chart){
      chart.destroy();
    }    
    // console.log(chartData.data.labels);
    setTimeout(()=>{
      
      chart = new Chart(ctx, {
        type: chartType, // good one are: pie, bar, doughnut
        data: {...chartData.data},
        options: {...this.chartMetadataTemplate.options}
      });
       //activate real time data fetch       
        setInterval(()=>{     
          if(isItFakeChart){
            this.updateFakeDataChart(chart);
          }else{
            this.updateGenuineChartData(chart);
          }     
        },5000);

    //   this.resizeChart(ctx);
      setTimeout(()=>{
        anime({
          targets: '#myChart',
          scale: [
            {value: .7, easing: 'easeOutSine', duration: 300},
            {value: 1, easing: 'easeInOutQuad', duration: 1500}
          ],

        });
      },100);

    },300);


  }  



  
}  

export default View;