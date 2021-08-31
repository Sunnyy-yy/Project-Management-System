var data = [
    {
        "str_lab": "Documentation",
        "num": 50
    },
    {
        "str_lab": "Front-End",
        "num": 47
    },
    {
        "str_lab": "Back-End",
        "num": 49
    },
    {
        "str_lab": "Research & Development",
        "num": 48
    },
    {
        "str_lab": "Testing",
        "num": 46
    },
];
var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;
var divNode = d3.select("body").node();
var outerRadius = radius - 10,
    innerRadius = radius - 80;
var color = d3.scale.ordinal()
    .range(["#2E7D32","#53856D","#FF7043", "#1FDA9A", "#28ABE3", "#DF514C", "#DAE9F7"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 80);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.num; });

d3.select("#chart").append("div")
    .attr("id","mainPie")
    .attr("class","pieBox");

var svg = d3.select("#mainPie").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var defs = svg.append("defs");
var filter = defs.append("filter")
                .attr("id", "drop-shadow")
                .attr("height","130%");

filter.append("feGaussianBlur")
        .attr("in","SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");

filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 3)
    .attr("dy", 3)
    .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.num); })
      .on("mousemove", function(d) {
          d3.select(this)
              .attr("stroke","#fff")
              .attr("stroke-width","2px")
              .style("filter", "url(#drop-shadow)");
				  d3.select(this)
						.transition()
						.duration(500)
						.ease('elastic')
						.attr('transform',function(d){
							var dist = 1;
							d.midAngle = ((d.endAngle - d.startAngle)/2) + d.startAngle;
							var x = Math.sin(d.midAngle) * dist;
							var y = Math.cos(d.midAngle) * dist;
							return 'translate(' + x + ',' + y + ')';
						});
            var mousePos = d3.mouse(divNode);
            d3.select("#mainTooltip")
              .style("left", mousePos[0] - 40 + "px")
              .style("top", mousePos[1] - 70 + "px")
              .select("#value")
              .attr("text-anchor", "middle")
              .html(d.data.str_lab + "<br />" + d.data.num);

					d3.select("#mainTooltip").classed("hidden", false);
        })
      .on("mouseout", function(d){
          d3.select(this)
              .attr("stroke","none")
              .style("filter","none");
					d3.select(this)
						.transition()
						.duration(500)
						.ease('bounce')
						.attr('transform','translate(0,0)');

					d3.select("#mainTooltip").classed("hidden", true);
      });
      var centerSvg = svg.append('circle')
				.attr('fill','#42A5F5')
				.attr('r','62');

			svg.append('text')
				.style('fill', '#F2F2F2')
				.style("font-size", "64px")
				.style("font-weight", "bold")
				.attr("transform", "translate(0," + 20 + ")")
				.attr("text-anchor", "middle")
				.html(data.length);
