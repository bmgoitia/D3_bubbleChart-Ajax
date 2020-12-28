
/* Get Data */

var dataset1;
    
$.ajax({
    async: false,
    url: "https://analisi.transparenciacatalunya.cat/resource/hu7t-2x76.json",
    type: "GET",
    dataType : "json",
})
  .done(function( resp ) {
     console.log(resp)
     var sortedErtes= resp.sort((a, b) => parseFloat(b.n_mero_d_afectats) - parseFloat(a.n_mero_d_afectats));
     console.log(sortedErtes);
     dataset1 = sortedErtes.slice(0,21);
  })
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })


var datasetFinal ={};
datasetFinal.children = dataset1;
/*console.log(datasetFinal);*/




dataset = {
    children: [{codi_divisi_econ_mica: 56, divisi_econ_mica_ccae_2009: "Alimentación", n_mero_d_afectats: "108.185"},

{codi_divisi_econ_mica: 47, divisi_econ_mica_ccae_2009: "Comercio min.", n_mero_d_afectats: "52.216"},

{codi_divisi_econ_mica: 46, divisi_econ_mica_ccae_2009: "Comercio may.", n_mero_d_afectats: "37.941"},

{codi_divisi_econ_mica: 85, divisi_econ_mica_ccae_2009: "Educación", n_mero_d_afectats: "35.645"},

{codi_divisi_econ_mica: 29, divisi_econ_mica_ccae_2009: "Vehículos", n_mero_d_afectats: "29.573"},

{codi_divisi_econ_mica: 93, divisi_econ_mica_ccae_2009: "Deportes", n_mero_d_afectats: "26.395"},

{codi_divisi_econ_mica: 55, divisi_econ_mica_ccae_2009: "Alojamiento", n_mero_d_afectats: "25.666"},

{codi_divisi_econ_mica: 43, divisi_econ_mica_ccae_2009: "A. E. Construcción", n_mero_d_afectats: "25.185"},

{codi_divisi_econ_mica: 45, divisi_econ_mica_ccae_2009: "Venta vehículos", n_mero_d_afectats: "23.181"},

{codi_divisi_econ_mica: 86, divisi_econ_mica_ccae_2009: "Sanidad", n_mero_d_afectats: "18.506"},

{codi_divisi_econ_mica: 96, divisi_econ_mica_ccae_2009: "Servicios personales", n_mero_d_afectats: "18.334"},

{codi_divisi_econ_mica: 49, divisi_econ_mica_ccae_2009: "Transporte", n_mero_d_afectats: "12.979"},

{codi_divisi_econ_mica: 41, divisi_econ_mica_ccae_2009: "Construcción", n_mero_d_afectats: "12.741"},

{codi_divisi_econ_mica: 81, divisi_econ_mica_ccae_2009: "Servicios edificios", n_mero_d_afectats: "11.897"},

{codi_divisi_econ_mica: 25, divisi_econ_mica_ccae_2009: "Productos metálicos", n_mero_d_afectats: "11.151"},

{codi_divisi_econ_mica: 10, divisi_econ_mica_ccae_2009: "Industria alimentaria", n_mero_d_afectats: "6.300"},

{codi_divisi_econ_mica: 88, divisi_econ_mica_ccae_2009: "Servicios sociales", n_mero_d_afectats: "6.196"},

{codi_divisi_econ_mica: 52, divisi_econ_mica_ccae_2009: "Almacenamiento", n_mero_d_afectats: "6.090"}]
            
        };




/*  CREATE CHART */

        var diameter = 600;

        var color = d3.scaleOrdinal()
        .domain([6000, 108185])
        .range(["#120029", "#0C0032", "#02003B", "#000A44", "#001c4c", "#224765", "#446E7E", "#669296", "#88AEA9", "#AAC5BD"]);
  


        var svg = d3.select("body")
            .append("svg")
            .attr("width", "98vw")
            .attr("height", "68vh")
            .attr("class", "bubble")
            .attr("id", "canvas");

        var svgB = $("svg");
        var svgWidth = svgB[0].getBoundingClientRect().width; // svg width 
        var svgHeight = svgB[0].getBoundingClientRect().height;  // svg height 

        var bubble = d3.pack(dataset)
            .size([svgWidth, svgHeight])

        var nodes = d3.hierarchy(dataset)
            .sum(function(d) { 
                return d.n_mero_d_afectats; 
            });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g").attr("id", function(d){
                return d.data.codi_divisi_econ_mica;
            })            
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
                console.log(d);
                return d.data.divisi_econ_mica_ccae_2009 + ": " + d.data["n_mero_d_afectats"];
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", "-0.5em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.divisi_econ_mica_ccae_2009.substring(0, d.r / 2);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.n_mero_d_afectats;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");


/* Add interactivity */

var bubs = document.querySelectorAll("g.node");

bubs.forEach(function(item,index){
  /*console.log(item);*/
})

$( "g.node" ).on("click", function( eventObject ) {
    var elem = $( this );
    console.log(elem);
    $("#modalTit").text(elem[0].children[2].innerHTML);
    $("#modalText").text(elem[0].children[3].innerHTML);
    $("#myModal").css("display", "block");
});



/* MODAL */

var modal = $("#myModal");

$("#close").on("click", function(){
    modal.css("display", "none");
})

