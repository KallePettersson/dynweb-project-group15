function createMap (latlon){
var basicMap = new Datamap({
  element: document.getElementById("basic"),
    setProjection: function(element) {
var projection = d3.geo.equirectangular()
  .center(latlon)
  .rotate([0, 0])
  .scale(1200)
  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
var path = d3.geo.path()
  .projection(projection);

return {path: path, projection: projection};
},
  projection: "mercator",
  scope: 'world',
   fills: {
        defaultFill: "#ABDDA4",
      },
  responsive: true,
    done: function(datamap){
        datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));
        $("#resetZoom").on("click", function(){
   resetZoom();
})
        function redraw() {
            datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
        function resetZoom() { datamap.svg.selectAll("g").attr("transform", "translate(0,0)scale(1.0)"); }
},
});
return basicMap
}