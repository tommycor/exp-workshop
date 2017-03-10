module.exports = function(el, value) {
	el.style.webkitTransform = value;
	el.style.mozTransform = value;
	el.style.msTransform = value;
	el.style.oTransform = value;
}