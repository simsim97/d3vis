const WIDTH = 1700;
const HEIGHT = 1600;
var active;

let svg = d3.select("#vis1")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);
var color = d3.scaleLinear()
    .range(['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)',
        'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)', 'rgb(3,19,43)']);

const projection = d3.geoMercator()
    .scale(800)
    .translate([WIDTH+20, HEIGHT/1.6])
    .rotate([0,0,20]);
const pathGenerator = d3.geoPath().projection(projection);
const _dispatcher = d3.dispatch("onclick");
const radius = d3.scale.sqrt().domain([0, 30]).range([0, 30]);



setupVis();


function setupVis() {

    // Load in my states data!
    //d3.csv("oxy.csv", function(data) {
        color.domain([0,90,80,85,90,125,165,193, 194, 195]); // setting the range of the input data

        d3.json("canada_divisions.geojson")
            .then(function (json) {
                const provinces = json.features;
                //console.log(provinces[0].properties);

                const paths = svg.selectAll('path')
                    .data(provinces)
                    .enter()
                    .append('path')
                    .attr('d', pathGenerator)
                    //.on("click", clicked)
                    .style("stroke", "white")
                    .on("click", function (d) { click(d); })
                    //.on("click", clicked, function(d){return d}, d3.mouse(this))
                    .style("fill", function(d){
                        assignValues(d);
                    });


                function click(d) {

                    // if (active === d) return reset();
                    // paths.selectAll(".active").classed("active", false);
                    // d3.select("#"+d.properties.name).classed("active", active = d); // changed selection to id
                    //
                    // var b = pathGenerator.bounds(d);
                    // var k =4;
                    // var x1 = b[0][0];
                    // var x2 = b[1][0];
                    // var y1 = b[0][1];
                    // var y2 = b[1][1];
                    // // console.log(x1);
                    // // console.log(x2);
                    // // console.log(y1);
                    // // console.log(y2);
                    // // console.log((b[1][0] + b[0][0]) / 2);
                    //
                    // paths.transition()
                    //     .duration(750)
                    //     .attr("transform", "translate(" + (b[0][1] + b[1][1]) / 2 + "," + (b[0][0] + b[1][0])/ 2+ ")"
                    //         +"scale(" + 2 + ")"
                    //         + "translate(" + -(b[1][1] + b[0][1])/ 2 + "," +-(b[1][0] + b[0][0]) / 2 + ")")
                    //     .style("stroke-width", 1.5 / k + "px");

                    d3.csv("opi.csv").then(function(data){
                        data.forEach(function(row){
                            //console.log(d.properties.CDNAME);
                            if(row.Prname === d.properties.PRNAME) {
                                if(row.Census === d.properties.CDNAME) {
                                    svg.append("g")
                                        .attr("class", "bubble")
                                        .selectAll('circle')
                                        .data([d])
                                        .enter().append("circle")
                                        .attr("transform", function (d) {
                                            return "translate(" + pathGenerator.centroid(d) + ")";
                                        })
                                        .attr("r", function(d){
                                            return radius(row.ageadjrate);
                                        })
                                        .style("fill", "red");
                                }

                            }


                        });


                    });
                }

                function reset() {
                    paths.selectAll(".active").classed("active", active = false);
                    paths.transition().duration(750).attr("transform", "");
                }




            });
}

function manitoba(d){
    d.properties.Oxycodone = 89.5;
    d.properties.Tramadol = 48.6;
    d.properties.Fentanyl =16.7;
    d.properties.Codeine = 381.7;
    d.properties.Hydro = 16.7;
    d.properties.Morphine = 76.5;


}
function nl(d){
    d.properties.Codeine = 209.2;
    d.properties.Fentanyl =9.8;
    d.properties.Hydro = 55.4;
    d.properties.Morphine = 90.4;
    d.properties.Oxycodone = 162.5;
    d.properties.Tramadol = 101.7

}

function ns(d){
    d.properties.Codeine = 113.8;
    d.properties.Fentanyl =14.3;
    d.properties.Hydro = 169.3;
    d.properties.Morphine = 53.7;
    d.properties.Oxycodone = 87.7;
    d.properties.Tramadol = 30.1;
}

function nb(d){
    d.properties.Codeine = 169.7;
    d.properties.Fentanyl =15.6;
    d.properties.Hydro = 120.9;
    d.properties.Morphine = 85.8;
    d.properties.Oxycodone = 163.6;
    d.properties.Tramadol = 30.1;
}

function qb(d){
    d.properties.Codeine = 111.1;
    d.properties.Fentanyl =29.1;
    d.properties.Hydro = 173.9;
    d.properties.Oxycodone = 82.9;
    d.properties.Morphine = 90.8;
    d.properties.Tramadol = 42.9;
}

function ont(d){
    d.properties.Codeine = 173.2;
    d.properties.Fentanyl =20.5;
    d.properties.Hydro = 141.9;
    d.properties.Morphine = 47.4;
    d.properties.Oxycodone = 192.9;
    d.properties.Tramadol = 37.7;
}

function ab(d){
    d.properties.Codeine = 209.2;
    d.properties.Fentanyl =11.8;
    d.properties.Hydro = 62.5;
    d.properties.Morphine = 38.3;
    d.properties.Oxycodone = 129.6;
    d.properties.Tramadol = 73.0;
}

function sk(d){
    d.properties.Codeine = 163.6;
    d.properties.Fentanyl =22.4;
    d.properties.Hydro = 152.2;
    d.properties.Morphine = 47.4;
    d.properties.Oxycodone = 33.3;
    d.properties.Tramadol = 43.9;
}

function bc(d){
    d.properties.Codeine = 249.3;
    d.properties.Fentanyl =12.8;
    d.properties.Hydro = 100.4;
    d.properties.Morphine = 60.2;
    d.properties.Oxycodone = 65.8;
    d.properties.Tramadol = 65.5;
}


function assignValues(d){
    //console.log(d.properties.PRNAME);
    if(d.properties.PRNAME == "Manitoba"){
        manitoba(d);
    }
    if(d.properties.PRNAME == "British Columbia / Colombie-Britannique"){
        bc(d);
    }
    if(d.properties.PRNAME == "Alberta"){
        ab(d);
    }
    if(d.properties.PRNAME == "Ontario"){
        ont(d);
    }
    if(d.properties.PRNAME == "Saskatchewan"){
        sk(d);
    }
    if(d.properties.PRNAME == "Quebec / Qu�bec"){
        qb(d);
    }
    if(d.properties.PRNAME == "Newfoundland and Labrador / Terre-Neuve-et-Labrador"){
        nl(d);
    }
    if(d.properties.PRNAME == "Nova Scotia / Nouvelle-�cosseManitoba"){
        ns(d);
    }
    if(d.properties.PRNAME == "New Brunswick / Nouveau-Brunswick"){
        nb(d);
    }

}



function changeColor(c){
    if(c == "clear"){
        clear();
    }
    if(c == "oxycodone"){
        oxy();
    }
    if(c == "tramadol"){
        tramadol();
    }
    if(c == "fent"){
        fentanyl();
    }
    if(c == "codeine"){
        codeine();
    }
    if(c == "hydro"){
        hydro();
    }
    if(c == "morph"){
        morph();
    }

}

function clear(){
    svg.selectAll("path")
        .style("fill","black")
        .style("stroke", "white")
}

function oxy(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Oxycodone;
            return color(value);
        });
}

function tramadol(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Tramadol;
            return color(value);
        });
}

function fentanyl(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Fentanyl;
            return color(value);
        });
}

function codeine(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Codeine;
            return color(value);
        });
}

function hydro(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Hydro;
            return color(value);
        });
}

function morph(){
    svg.selectAll("path")
        .style("fill", function(d){// Get data value
            var value = d.properties.Morphine;
            return color(value);
        });
}

