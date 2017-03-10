// PARTICLE

import Victor 		from 'victor';

import raf 	  		from '../utils/raf';
import transformer  from '../utils/transformer';

module.exports = class Particle{

	constructor(options) {
		this.radius 		= options.radius		!== void 0 ? options.radius			: 10;
		this.isActive		= options.isActive		!== void 0 ? options.isActive		: true;
		this.color			= options.color			!== void 0 ? options.color 			: 'rgb( 255, 255, 255 )';
		this.el				= options.el 			!== void 0 ? options.el 			: document.createElement('div');
		this.position   	= options.position		!== void 0 ? options.position		: new Victor( 0, 0);
		this.container  	= options.container		!== void 0 ? options.container		: document.querySelector('#container');
		this.winHalfWidth 	= options.winHalfWidth	!== void 0 ? options.winHalfWidth	: window.innerWidth * .5;
		this.winHalfHeight 	= options.winHalfHeight	!== void 0 ? options.winHalfHeight	: window.innerHeight * .5;
		this.onSelected	    = options.onSelected 	!==	void 0 ? options.onSelected		: function(){};
		this.gravity		= new Victor( 0, 0 );
		this.collision 		= new Victor( 0, 0 );
		this.force		    = new Victor( 0, 0 );

		this.scale 			= new Victor( this.radius * .02, this.radius * .02);
		this.halfRadius		= this.radius * .5;
		this.isSelected 	= false;

		this.update 		= this.update.bind(this);
		this.resetForces    = this.resetForces.bind(this);
		this.onMouseDown    = this.onMouseDown.bind(this);


		this.el.addEventListener( 'mousedown', this.onMouseDown );
	}

	init() {
		this.el.classList.add('particle');
		this.container.appendChild( this.el );

		this.update();
	}

	update() {
		this.force = Victor( 0, 0);

		this.force.add( this.gravity );
		this.force.add( this.collision );

		this.position.add( this.force );

		transformer( this.el, 'translate3d(' + ( this.position.x - this.radius ) + 'px, ' + ( this.position.y - this.halfRadius ) + 'px, 0) scale(' + this.scale.x + ', ' + this.scale.y + ')' );
	}

	resetForces() {
		this.gravity 	= new Victor(0, 0);
		this.collision  = new Victor(0, 0);
	}

	onMouseDown() {
		this.isSelected = true;

		this.onSelected( this );
	}

};