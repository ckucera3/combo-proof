// global variable
var app = app || {};

/**
 * CombinatorialProof module
 */
app.CombinatorialProofModule = (function () {
    'use strict';

    var init = function (baseElement, n) {
        var base, config;
        base = d3.select(baseElement);
        // create the dot matrix
        config = configure(base, n);
        config.matrix = app.DotMatrixModule.init(baseElement, n);
        graph(config);
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

    var graph = function (config) {
        config.base.append("p").html("For example, let `n = " + config.n + "`");
        label(config);
    }

    var label = function (config) {
        config.label = config.base.append("div").append("p");
        config.label
        .text("Here is the array formed from " + arrayName(config.n) + ". There are `(n+1)^2` elements altogether, with `n + 1` squares on the main diagonal.")
        ;

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

        config.matrix.elements.transition().each(function () {
            config.matrix.hideDiagonal();
            config.matrix.changeDotUpperTriangleColor("blue");
            config.matrix.changeDotLowerTriangleColor("red");
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

    // Helper functions
    var arrayName = function (n) {
        return "`(" + (n + 1) + " x " + (n + 1) + ")`"
    }

    return {
        init: init,
        update: update
    };

}());