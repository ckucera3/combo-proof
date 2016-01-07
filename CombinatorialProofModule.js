// global variable
var app = app || {};

/**
 * CombinatorialProof module
 */
app.CombinatorialProof = (function () {
    'use strict';

    var init = function (baseElement, n) {
        var base, config;
        var oneTest = 1;
        base = d3.select(baseElement);
        config = configure(base, n);
        graphAll(config);
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
            colors: colors,
            state: 0
        }

        return config;
    };

    var graphAll = function (config) {
        config.data = createData(config);
        config.base.append("p").html("For example, let `n = " + config.n + "`");
        graph(config);
    }

    var graph = function (config) {
        structure(config);
        elements(config, config.svg, config.n);
        label(config);
    }

    var label = function (config) {
        config.label = config.base.append("div").append("p");
        config.label
        .text("Here is the array formed from " + arrayName(config.n) + ". There are `(n+1)^2` elements altogether, with `n + 1` squares on the main diagonal.")
        ;

    }

    var graph1 = function (config) {
        structure(config);
        elements(config, config.svg, config.n);
        labels1(config);
        showDiagonalSections(config, config.elements);
    }

    var update = function (config) {
        config.state++;
        switch(config.state) {
            case 0:
            console.log("case 0");
                break;
            case 1:
                update1(config)

                break;
            default:
                console.log("default");
                }
    }

    var update1 = function (config) {
        config.elements.transition().duration(750).attr("opacity", function (d) {
            if (d.i == d.j) {
                return 0
            } else {
            return 1;
            }
        });

        config.label.style("opacity", 0)
        .html("<p>The off diagonal entries split naturally into two equal sized " +
            "parts, those elements above the diagonal and those elements below the diagonal.</p>" +
            " <p> Both the lower and the upper sections have `1 + 2 + 3 + ... + n` elements each. </p>" +
            " <p> Written another way, an off diagonal section has `1 + 2 + 3 + ... + n` elements, and there are two of them. </p>"
        + "<p> An equation can now be written from the information above. `(2)(1 + 2 + 3 + ... + n) = (n+1)^2 - (n+1)`"
        + "<p> Manipulating the equation algebraically will result in the original statement. `QED`"
        + "<p> `1 + 2 + 3 + ... + n = [n(n + 1)] / 2` </p>")
        .transition().duration(750)
        .style("opacity", 1)
        ;
    }

    var elements = function (config, svg, n) {
        var elements, squareLength;
        squareLength = config.m.width / (n + 1);
        elements = svg.selectAll("circle")
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
            .attr("width", config.m.width)
            .attr("height", config.m.height)
            .attr("border", 1)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            ;

        // give border
        var borderPath = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", config.m.height)
            .attr("width", config.m.width)
            .style("stroke", "black")
            .style("fill", "none")
            .style("stroke-width", 3)
            ;

        config.borderPath = borderPath;
        config.svg = svg;

    };

    // Helper functions
    var arrayName = function (n) {
        return "`(" + (n + 1) + " x " + (n + 1) + ")`"
    }

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
        init: init,
        update: update
    };

}());