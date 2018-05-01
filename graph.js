 queue()
     .defer(d3.json, "data/transactions.json")
     .await(makeCharts);

 function makeCharts(error, transactionsData) {
     let ndx = crossfilter(transactionsData);

     let parseDate = d3.time.format("%d/%m/%Y").parse;

     transactionsData.forEach(function(d) {
         d.date = parseDate(d.date);
     });
     let dateDim = ndx.dimension(dc.pluck('date'));

     let minDate = dateDim.bottom(1)[0].date;
     let maxDate = dateDim.top(1)[0].date;

     //  let spendByMonth = dateDim.group().reduceSum(function(d) {
     //     return d.spend
     // )}

     let tomSpend = dateDim.group().reduceSum(function(d) {
         if (d.name === "Tom") {
             return +d.spend;
         }
         else {
             return 0;
         }

     });

     let aliceSpend = dateDim.group().reduceSum(function(d) {
         if (d.name === "Alice") {
             return +d.spend;
         }
         else {
             return 0;
         }

     });

     let bobSpend = dateDim.group().reduceSum(function(d) {
         if (d.name === "Bob") {
             return +d.spend;
         }
         else {
             return 0;
         }

     });

     let compositeChart = dc.compositeChart("#composite-chart")
     compositeChart
         .width(1000)
         .height(200)
         .dimension(dateDim)
         .x(d3.time.scale().domain([minDate, maxDate]))
         .yAxisLabel("Spend")
         .margins ({top:0, right:0, bottom:50, left:50})
         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
         .renderHorizontalGridLines(true)
         .compose([
             dc.lineChart(compositeChart)
             .colors("green")
             .group(tomSpend, "Tom"),
             dc.lineChart(compositeChart)
             .colors("pink")
             .group(aliceSpend, "Alice"),
             dc.lineChart(compositeChart)
             .colors("blue")
             .group(bobSpend, "Bob")
             ])
             .render()
             .yAxis().ticks(4);
             
              
 
 
let storeDim = ndx.dimension(dc.pluck('name'));
            let totalSpendByStore = storeDim.group().reduceSum(dc.pluck('spend'));
            // we've reduced, getting rid of data we don't need, and summed up the spend based on the dimension that we sent in. Total spend now contains a group. Returns an array of objects. Purpose of nameDim is that the dimension forms the x-axis. We need a dimension to group on. MUST UNDERSTAND RELATIONSHIP BETWEEN DIMENSION AND GROUP 
            let storeChart = dc.pieChart("#store-chart");
            console.log(totalSpendByStore.all())
            storeChart
                .radius(100)
                .height(300)
                .dimension(storeDim)
                .group(totalSpendByStore)
                .ordinalColors(['lemonchiffon', 'indigo', 'pink'])
             .render();
             
            dc.renderAll();
             
 }
 