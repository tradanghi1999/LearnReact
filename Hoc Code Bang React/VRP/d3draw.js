const draw = (graph, d3Getter) =>
{
        
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        d3.selectAll('svg').attr("transform", "scale(2)");

    let d3Color = d3.schemeCategory20;

    var color = d3.scaleOrdinal(d3Color).domain([...Array(20).keys()]);

    //console.log(d3.schemeCategory20)
    d3Getter.importScheme(d3Color)

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    //var graph = d3Converter.getGraph()

    var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    
    var circles = node.append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var nodeLables = node.append("text")
        .text(function(d) {
        return d.id;
        })
        .attr('x', 6)
        .attr('y', 3);

    // var linkLables = link.append("text")
    //     .text(function(arc){
    //         return arc.source
    //     })
    //     .attr("x",6)
    //     .attr("y",7)

    //hien luc re chuot
    node.append("title")
        .text(function(d) { return d.id; });

    node.on("click", nodeClick);
    function nodeClick(d) 
    {
        console.log(d3Getter.getNodeOnIndex(d.index))
        console.log(d3Getter.getNodeColorOnIndex(d.index))
        //d3.scale.category20()
        //console.log(node)
        //console.log(d); //considering dot has a title attribute
    }

    link.on("click", linkClick);
    function linkClick(arc)
    {
        console.log(arc)
    }

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        
    }

    // d3.json("miserables.json", function(error, graph) {
    //   if (error) throw error;

    
    // });

    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    }

    function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    }

    function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    }

}

const remove = () => {
    var svg = d3.select("svg");
    svg.selectAll("*").remove();
}

const drawbyId = ()=>{
    remove()
    draw(d3Converter.getGraphOn(x=> x.id), d3Converter)
}

const drawbyName = () =>{
    remove()
    draw(d3Converter.getGraphOn(x=> x.name), d3Converter)
}