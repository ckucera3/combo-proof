var app = app || {};

var config = app.CombinatorialProofModule.init("#base", 10);


document.getElementById("button").addEventListener("click", buttonClick);

function buttonClick() {
	app.CombinatorialProofModule.update(config);
}