'use strict';
import anime from 'animejs/lib/anime.es.js';
import Chart from 'chart.js/auto';

class View{

  constructor(model){
    this.model = model;
    // chart metadata   
      this.chart = null;
      this.ctx =  document.getElementById('myChart');      
      this.ctx.width = 500;
      this.ctx.height = 200;

  

      this.colors={
        'slate700': 'rgb(51 65 85)',
        'zinc50': 'rgb(250 250 250)'
      };
      this.stylesTable={
        border: "border-solid border-2 border-slate-700"
      };

      this.chartMetadata={
      
        data: {
          labels: ['0s'],
          datasets: [{
            label: 'Fake Data generated every 5s using Math.random()',
            data: [42000],
            borderWidth: 1,
          }]
        },
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
      }
    // canvas configure
    // this.configureCanvas();


    // event listeners and DOM Fetching
      this.tableInvestmentData = document.querySelector('table#tableInvestmentData');
      // console.log(this.tableInvestmentData);
      this.selectChartType = document.querySelector('select#selectChartType');
      this.selectChartType.addEventListener('change', ()=>{
        // console.log(this.selectChartType.value);
        this.updateChartType(this.selectChartType.value);        
      });
      window.addEventListener('resize', this.throttling(this.resizeChart, 200, this.ctx));

    // generating investment table
      // this.generateInvestmentTable();
this.generateChart('line');
// this.selectChartType.classList.remove('displayNone'); 

 // fake data generator activate
    setInterval(()=>{
    this.updateFakeDataChart();
    },5000);
    
  }

  updateFakeDataChart(){
    let newLabel = (Number(this.chart.data.labels.at(-1).replace('s', '')) + 5  + 's');
    this.chart.data.labels.push(newLabel);
    let newFakeData = (Math.random()*45000).toFixed(2);
    this.chart.data.datasets[0].data.push(newFakeData);
    
    this.chart.update();
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


  generateChart(chartType){
    if(this.chart){
      this.chart.destroy();
    }
    setTimeout(()=>{
      this.chart = new Chart(this.ctx, {
        type: chartType, // good one are: pie, bar, doughnut
        data: {...this.chartMetadata.data},
        options: {...this.chartMetadata.options}
      });
      this.resizeChart(this.ctx);
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