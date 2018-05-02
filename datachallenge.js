queue()
    .defer(d3.csv, "Salaries.csv")
    //  if it doesn't work, add data/Salaries.csv
    .await(makeCharts);

function makeCharts(error, SalariesData) {
    let ndx = crossfilter(SalariesData);

// Average Salary by Gender

    var genderDim = ndx.dimension(dc.pluck('salary'));
    var totalSalary = ndx.dimension(dc.pluck('sex'));
    // return +d ['salary'];
    var groupSalary = totalSalary.group().reduce(
        function(p, v) {
            p.count++;
            p.total  += +v["salary"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= -v["salary"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );

    var personColors = d3.scale.ordinal()
        .range(["purple", "orange",]);
    var chart = dc.barChart("#first-chart");
    chart
        .width(500)
        .height(300)
        .margins ({top:0, right:0, bottom:50, left:50})
        .dimension(genderDim)
        .group(groupSalary)
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(personColors)
        .xAxisLabel("Gender")
        .yAxisLabel("Average Salary")
        .yAxis().ticks(4);
    dc.renderAll();
    console.log(groupSalary);

// Average year service by gender

var yearDim = ndx.dimension(dc.pluck('yrs.service'));
    var totalYear = ndx.dimension(dc.pluck('sex'));
    // return +d ['yrs.service'];
    var groupYears = totalYear.group().reduce(
        function(p, v) {
            p.count++;
            p.total  += +v["yrs.service"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
                return p;
            }
            else {
                p.total -= -v["yrs.service"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );

    var personColors = d3.scale.ordinal()
        .range(["purple", "orange",]);
    var chart = dc.barChart("#first1-chart");
    chart
        .width(500)
        .height(300)
        .margins ({top:0, right:0, bottom:50, left:50})
        .dimension(yearDim)
        .group(groupYears)
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(personColors)
        .xAxisLabel("Gender")
        .yAxisLabel("Average Years of Service")
        .yAxis().ticks(4);
    console.log(groupYears);

// Average Salary by discipline
 var subjectDim = ndx.dimension(dc.pluck('salary'));
    var totalSubject = ndx.dimension(dc.pluck('discipline'));
    // return +d ['salary'];
    var groupSubject = totalSubject.group().reduce(
        function(p, v) {
            p.count++;
            p.total  += +v["salary"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
                return p;
            }
            else {
                p.total -= -v["salary"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );

    var personColors1 = d3.scale.ordinal()
        .range(["pink", "yellow",]);
    var chart = dc.barChart("#first2-chart");
    chart
        .width(500)
        .height(300)
        .margins ({top:0, right:0, bottom:50, left:50})
        .dimension(subjectDim)
        .group(groupSubject)
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(personColors1)
        .xAxisLabel("Discipline")
        .yAxisLabel("Average Salary")
        .yAxis().ticks(4);
    console.log(groupSubject);
    
// Year Service/Salary
 var yrsvcDim = ndx.dimension(dc.pluck('salary'));
    var totalYrsvc = ndx.dimension(dc.pluck('yrs.service'));
    // return +d ['yrs.service'];
    var groupYrsvc = totalYrsvc.group().reduce(
        function(p, v) {
            p.count++;
            p.total  += +v["salary"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
                return p;
            }
            else {
                p.total -= -v["salary"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );

    // var personColors1 = d3.scale.ordinal()
    //     .range(["pink", "yellow",]);
    var chart = dc.barChart("#first3-chart");
    chart
        .width(1000)
        .height(300)
        .margins ({top:0, right:0, bottom:50, left:50})
        .dimension(yrsvcDim)
        .group(groupYrsvc)
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .colorAccessor(function(d) {
            return d.key;
        })
        // .colors(personColors1)
        .xAxisLabel("Years of Service")
        .yAxisLabel("Average Salary")
        .yAxis().ticks(4);
    console.log(groupYrsvc);

// Number per rank
    let serviceDim = ndx.dimension(dc.pluck('rank'));
    let totalService = serviceDim.group();
    let serviceChart = dc.pieChart("#second-chart");
    serviceChart
        .radius(100)
        .height(300)
        .dimension(serviceDim)
        .group(totalService)
        .ordinalColors(['lemonchiffon', 'indigo', 'pink', 'red', 'green']);

// number per discipline
    let disDim = ndx.dimension(dc.pluck('discipline'));
    let totalDis = disDim.group();
    let disChart = dc.pieChart("#third-chart");
    disChart
        .radius(100)
        .height(300)
        .dimension(disDim)
        .group(totalDis)
        .ordinalColors(['red', 'green']);



// Year Service vs Salary vs Age
     let servDim = ndx.dimension(function(d) {
         console.log(d['yrs.service']);
         return +d['yrs.service']
         });

     //  let spendByMonth = dateDim.group().reduceSum(function(d) {
     //     return d.spend
     // )}

     let profYears = servDim.group().reduceSum(function(d) {
         if (d.rank === "Prof") {
             return +d.salary;
         }
         else {
             return 0;
         }

     });

     let assoYears = servDim.group().reduceSum(function(d) {
         if (d.rank === "AssocProf") {
             return +d.salary;
         }
         else {
             return 0;
         }

     });

     let assistYears = servDim.group().reduceSum(function(d) {
         if (d.rank === "AsstProf") {
             return +d.salary;
         }
         else {
             return 0;
         }

     });

     let compositeChart = dc.compositeChart("#composite-chart")
     compositeChart
         .width(1000)
         .height(200)
         .dimension(servDim)
         .group(assistYears)
         .x(d3.scale.ordinal())
         .xUnits(dc.units.ordinal)
         .yAxisLabel("Years of Service")
         .margins ({top:0, right:0, bottom:50, left:80})
         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
         .renderHorizontalGridLines(true)
         .compose([
             dc.lineChart(compositeChart)
             .colors("green")
             .group(profYears, "Prof"),
             dc.lineChart(compositeChart)
             .colors("pink")
             .group(assoYears, "AssocProf"),
             dc.lineChart(compositeChart)
             .colors("blue")
             .group(assistYears, "AsstProf")
             ])
             .render()
             .yAxis().ticks(4);
    dc.renderAll();



}


