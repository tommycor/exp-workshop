module.exports = class Particle{

	constructor(options) {
		this.width 		= options.width		!== void 0 ? options.width 		: 0;
		this.height 	= options.height	!== void 0 ? options.height		: 0;
		this.isActive	= options.isActive	!== void 0 ? options.isActive	: true;
		this.color		= options.color		!== void 0 ? options.color 		: 'rgb( 255, 255, 255 )',
		this.el			= options.el 		!== void 0 ? options.el 		: document.createElement('div')
	}

	init() {
		console.log(this.isActive)
	}

};