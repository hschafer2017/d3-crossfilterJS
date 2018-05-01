queue()
    .defer(d3.json, "data/transactions.json")
    .await(makeGraph);

function makeGraph(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    let parseDate = d3.time.format("%d/%m/%Y").parse;

    transactionsData.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    let dateDim = ndx.dimension(dc.pluck("date"));

    let minDate = dateDim.bottom(1)[0].date;
    let maxDate = dateDim.top(1)[0].date;

    let pieDim = ndx.dimension(function(d) {
        if (d.spend > 200) {
            return "Big";
        }
        else if (d.spend > 100 && d.spend < 200) {
            return "Medium";
        }
        else {
            return "Small";
        }
    })

    let pieGroup = pieDim.group();
    let thePie = dc.pieChart("#store-chart");
    thePie
        .radius(100)
        .height(300)
        .dimension(pieDim)
        .group(pieGroup)
        .ordinalColors(['lemonchiffon', 'indigo', 'pink']);

    dc.renderAll();

}
