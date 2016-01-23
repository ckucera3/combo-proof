// global variable
var app = app || {};

/**
 * DotMatrix module
 */
app.DotMatrixModule = (function () {
    'use strict';

    var init = function (baseElement, n) {
        var base, config;
        base = d3.select(baseElement);
        config = configure(base, n);
        graph(config);
        addFunctionsToConfig(config);

        return config;
    };

    var configure = function (base, n) {
        var config, measurements, width, height, temp, colors;

        colors = {
            first: "#2AFC98", // green
            second: "#EF476F", // red
            third: "#2DE1FC", // blue
            fourth: "#09E85E" // other green
        }

        height = screen.height;
        width = screen.width;
        if (width > height) {
            temp = height;
        } else {
            temp = width;
        }

        measurements = {
            width: temp / 4,
            height: temp / 4
        }

        config = {
            base: base,
            m: measurements,
            n: n,
            colors: colors
        }

        return config;
    };

    var graph = function (config) {
        config.data = createData(config);
        structure(config);
        elements(config, config.svg, config.n);
    }

    var addFunctionsToConfig = function (config) {

    	// hide diagonal
        config.hideDiagonal = function () {
	        config.elements.transition().duration(750).attr("opacity", function (d) {
	            if (d.i == d.j) {
	                return 0
	            } else {
	            return 1;
	            }
	        });
	    }

	    config.changeAllDotColors = function (color) {
	    	config.elements.transition().duration(750).attr("fill", function (d) {
	    		return color;
	    	});
	    }

	    config.changeDotColor = function(func) {
	    	config.elements.transition().duration(750).attr("fill", func);
	    }

	    config.changeDotUpperTriangleColor = function (color) {
	    	config.elements.filter(function (d) {
	    		if (d.i > d.j) {
	    			return true;
	    		}
	    	}).transition().duration(750).attr("fill", function (d) {
	    		return color;
	    	});
	    }

	    config.changeDotLowerTriangleColor = function (color) {
	    	config.elements.filter(function (d) {
	    		if (d.i < d.j) {
	    			return true;
	    		}
	    	}).transition().duration(750).attr("fill", function (d) {
	    		return color;
	    	});
	    }
	}

    var hideDiagonal = function (config) {
        config.elements.transition().duration(750).attr("opacity", function (d) {
            if (d.i == d.j) {
                return 0
            } else {
            return 1;
            }
        });
    }


    var elements = function (config, svg, n) {
        var elements, squareLength;
        squareLength = config.m.width / (n + 1);
        elements = config.group.selectAll("circle")
            .data(config.data);

        elements.enter()
            .append("circle")
            .attr("r", squareLength / 4)
            .attr("opacity", 0)
            .on("mouseover", function () {
                d3.select(this).attr("fill", config.colors.second);
            })
            .transition().duration(750)
            .attr("fill", config.colors.first)
            .attr("cx", function(d) {
                return d.i * squareLength + squareLength / 2;
            })
            .attr("cy", function(d) {
                return d.j * squareLength + squareLength / 2;
            })
            .attr("opacity", 1)
            ;

        config.elements = elements;
    }

    var structure = function (config) {
        var borderPath, svg;
        // insert svg into the base
        svg = config.base.append("svg")
            .attr("width", config.m.width * 1.25)
            .attr("height", config.m.height * 1.25)
            .attr("border", 1)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            ;

        // create and position the group
        var dotMatrixGroup = svg.append("g");
        dotMatrixGroup.attr("transform", "translate(" + config.m.width * (0.25 / 2) + "," + config.m.height * (0.25 / 2) + ")");

        // give border
        var borderPath = dotMatrixGroup.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", config.m.height)
            .attr("width", config.m.width)
            .style("fill", "none")
            .style("stroke", "none")
            // .style("stroke-width", 3)
            ;

        config.borderPath = borderPath;
        config.svg = svg;
        config.group = dotMatrixGroup;

    };

    var createData = function (config) {
        var n, datum, data;
        data = [];
        n = config.n;
        for(var i = 0; i < (n + 1); i++) {
            for(var j = 0; j < (n + 1); j++) {
                datum = {
                    i: i,
                    j: j
                }
                data.push(datum);
            }
        }
        return data;
    }

    return {
        init: init
    };

}());