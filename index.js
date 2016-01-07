var app = app || {};


var config = app.CombinatorialProof.init("#base", 7);
document.getElementById("button").addEventListener("click", buttonClick);

function buttonClick() {
	app.CombinatorialProof.update(config);
}