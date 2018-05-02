queue()
    .defer(d3.csv, "Salaries.csv")
    //  if it doesn't work, add data/Salaries.csv
    .await(makeCharts);

function makeCharts(error, SalariesData) {
    let ndx = crossfilter(SalariesData);

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
        .yAxis().ticks(4);
    dc.renderAll();
    console.log(groupSalary);






    let serviceDim = ndx.dimension(dc.pluck('rank'));
    let totalYears = serviceDim.group();
    let serviceChart = dc.pieChart("#second-chart");
    serviceChart
        .radius(100)
        .height(300)
        .dimension(serviceDim)
        .group(totalYears)
        .ordinalColors(['lemonchiffon', 'indigo', 'pink', 'red', 'green']);

    let disDim = ndx.dimension(dc.pluck('discipline'));
    let totalDis = disDim.group();
    let disChart = dc.pieChart("#third-chart");
    disChart
        .radius(100)
        .height(300)
        .dimension(disDim)
        .group(totalDis)
        .ordinalColors(['red', 'green']);



    dc.renderAll();

}
