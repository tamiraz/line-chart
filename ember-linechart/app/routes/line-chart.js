import Route from '@ember/routing/route';

export default Route.extend({

  
  model: function() {
   var host="http://data.fixer.io/api";
   var self=this;
   self.lineChart={type: 'line', 
                           labels:[],datasets:[{data:[],label:"USD Rate",
                    borderWidth: 1,  fill:false, radius: 0,backgroundColor:'rgb(255, 99, 132)', borderColor:'rgb(255, 99, 132)'}
                    ,{data:[],label:"CAD Rate", borderWidth: 1,  fill:false, radius: 0,backgroundColor:'rgb(54, 162, 235)', borderColor:'rgb(54, 162, 235)'}
                      ,{data:[],label:"EUR Rate", borderWidth: 1,fill:false, radius: 0,backgroundColor:'rgb(255, 205, 86)', borderColor:'rgb(255, 205, 86)'}]
                  
                  ,
              options: {
                responsive: true,
                maintainAspectRatio:true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
                  };
    this.setLabelsData=  function (date,NumberOfLastDates)
    {
      var Dates=[];
      Dates.push(moment(date).format('dddd'))
      for (let i = 1; i < NumberOfLastDates; i++) {
        var   dateNext =moment(moment().subtract(i,'d').format('YYYY-MM-DD')).format('dddd')  ;
        Dates.unshift(dateNext);
      }
      self.lineChart.labels=Dates;
    }
    this.setDataSetsVaulusRate=function(NumberOfLastDates)
    {
       
     for (let i = 0; i <NumberOfLastDates; i++) {
      var   dateNext =moment().subtract(i,'d').format('YYYY-MM-DD')  ;
       Ember.$.get(host+'/'+moment(dateNext).format('YYYY-MM-DD')+"?access_key=2c765270714b2b5af56f82ccca8d6df0&symbols=USD,CAD,EUR").then(function(response){
        self.lineChart.datasets[0].data.unshift(response.rates.USD);
        self.lineChart.datasets[1].data.unshift(response.rates.CAD);  
        self.lineChart.datasets[2].data.unshift(response.rates.EUR);
      })
    }
    }
    this.createDataSets=function(){
      var numberOfDates=7;
      var  currentDate = moment().format('YYYY-MM-DD');
      this.setLabelsData(currentDate,numberOfDates);   
      this.setDataSetsVaulusRate(7);
      }
    this.createDataSets();
    setTimeout(() => {
    
    var controller = self.get('controller');
    controller.set('model', self.lineChart);
    return  self.lineChart
    }, 1000);
   },
  
});
