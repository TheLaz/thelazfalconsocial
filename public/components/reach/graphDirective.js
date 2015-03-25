(function(){

  function stackAreaChart() {

    return {

      restrict: 'E',

      scope: {
        val: '='
      },

      link: function(scope, element, attrs) {

          var data = [];

          var margin = {
            top: 20, 
            right: 20, 
            bottom: 30, 
            left: 48
          },
          width = element[0].clientWidth - 55 ,
          height = 350;

          var x = d3
            .scale
            .ordinal()
            .rangeRoundBands([0, width], .1);

          var y = d3
            .scale
            .linear()
            .rangeRound([height, 0]);

          var color = d3
            .scale
            .ordinal()
            .range([
                "#1FAEFF", 
                "#FF2E12",
                "#FF981D"
            ]);

          var xAxis = d3
            .svg.axis()
            .scale(x)
            .orient("bottom");

          var yAxis = d3
            .svg.axis()
            .scale(y)
            .orient("left");

          var svg = d3
            .select(element[0])
            .append("svg:svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.$watch('val', function(newValue, oldValue) {

          if(newValue.total) {
            data.push(newValue);
            svg.selectAll('*').remove();

            color
              .domain(d3.keys(data[0])
              .filter(function(key) { 
                  return key !== "index" && 
                    key !== "total" && 
                    key !=="impressions"; 
              }));

              data.forEach(function(d) {
              
                if(d.total && !d.impressions) {
                  var y0 = 0;
                  d.impressions = color.domain().map(function(name) { 
                    return {
                      name: name, 
                      y0: y0, 
                      y1: y0 += +d[name]
                    }; 
                  });
                }
              });

              x.domain(data.map(function(d) { 
                return d.index; 
              }));

              y.domain([0, d3.max(data, function(d) { 
                return d.total; 
              })]);

              /*
                posts
              */

              svg.append("g")
                .attr("class", "x axis")
                .append("text")
                .attr("x", width / 2)
                .attr("dy", height + 20)
                .text("posts");

              /*
                impressions
              */

              svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Impressions");


              /*
                Graph Columns
              */

              var columns = svg.selectAll(".index")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function(d) { 
                  return "translate(" + x(d.index) + ",0)"; 
                });

              columns.selectAll("rect")
                .data(function(d) { 
                    return d.impressions; 
                  })
                .enter().append("rect")
                .attr("width", x.rangeBand())
                .attr("y", function(d) { 
                    return y(d.y1); 
                  })
                .attr("height", function(d) { 
                    return y(d.y0) - y(d.y1); 
                  })
                .style("fill", function(d) { 
                    return color(d.name); 
                  });


              /*
                Paid, Viral, Organic
              */

              var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) { 
                  return "translate(" + i * 95 + ",0)"; 
                });

              /*
                Paid, Viral, Organic - colors
              */

              legend.append("rect")
                .attr("x", 0)
                .attr("y", height + 10)
                .attr("width", 20)
                .attr("height", 18)
                .style("fill", color);

              /*
                Paid, Viral, Organic - text
              */

              legend.append("text")
                .attr("x", 75)
                .attr("y", 25)
                .attr("dy", height)
                .style("text-anchor", "end")
                .text(function(d) { 
                    return d; 
                });
          } 
        });
      }
    };
  }

falcon.directive('stackedAreaChart', stackAreaChart);

})();