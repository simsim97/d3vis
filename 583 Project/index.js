setupVis();


function setupVis() {


    function tramadol(c){
        svg.selectAll("path")
            .style("fill", function(d){// Get data value
                var value = d.properties.Oxycodone;
                return color(value);
            });
    }


    const WIDTH = 1700;
    const HEIGHT = 1500;
    const PAD = 10;
    const MARGIN = 50;
    const projection = d3.geoMercator()
        .scale(600)
        .translate([1500, 1000])
        .rotate([0,0,20]);
    const pathGenerator = d3.geoPath().projection(projection);
    const _dispatcher = d3.dispatch("onclick");

    let svg = d3.select("#vis1")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);
    var color = d3.scaleLinear()
        .range(['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)',
            'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)', 'rgb(3,19,43)']);

    // Buttons
    //const drugsNames = ["Oxycodone", "Tramadol"];
    //console.log(i);
    // let  = d3.select("#vis2")
    //     .attr("width", 1000)
    //     .attr("height", 100)
    //     .data(drugsNames)
    //     .each(function(d) {
    //             console.log("here");
    //             console.log(d.toString());
    //     });
       //.attr("transform", function(d, i) { return "translate(-300," + i * 20 + ")"; });

    // Load in my states data!
    d3.csv("oxy.csv", function(data) {
        color.domain([0,90,80,85,90,125,165,193, 194, 195]); // setting the range of the input data

        d3.json("canada.json")
        .then(function (json) {
            const provinces = topojson.feature(json, json.objects.canadaprov);
            //Adding data value as features in the of the map itself
            //Oxycodone
            provinces.features[0].properties['Oxycodone'] = 89.5;
            provinces.features[1].properties['Oxycodone'] = 33.3;
            provinces.features[2].properties['Oxycodone'] = 129.6;
            provinces.features[3].properties['Oxycodone'] = 65.8;
            provinces.features[4].properties['Oxycodone'] = 0;
            provinces.features[5].properties['Oxycodone'] = 0;
            provinces.features[6].properties['Oxycodone'] = 0;
            provinces.features[7].properties['Oxycodone'] = 192.9;
            provinces.features[8].properties['Oxycodone'] = 90.8;
            provinces.features[9].properties['Oxycodone'] = 163.6;
            provinces.features[10].properties['Oxycodone'] = 87.7;
            provinces.features[11].properties['Oxycodone'] = 162.5;
            provinces.features[12].properties['Oxycodone'] = 0;


            const paths = svg.selectAll('path')
                .data(provinces.features)
                .enter()
                .append('path')
                .attr('d', pathGenerator)
                .select("#dataviz_buttonTriger")
                .attr("stroke", "black");


        });


    });


}





