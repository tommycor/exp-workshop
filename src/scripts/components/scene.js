import Victor		from 'victor';

import config 		from '../utils/config';
import raf 			from '../utils/raf';
import mapper 		from '../utils/mapper';

import Particle 	from './particle';
import Gravity 		from './gravity';
import Collider		from './collider';

module.exports = {

	init: function() {
		this.render 	= this.render.bind( this );
		this.onSelected = this.onSelected.bind( this );
		this.onMove 	= this.onMove.bind( this );
		this.onResize 	= this.onResize.bind( this );
		this.onMouseUp 	= this.onMouseUp.bind( this );

		raf.register( this.render );

		this.particles = new Array();
		this.container = document.querySelector('#container');

		this.onResize();

		for( let i = 0 ; i < config.nbrParticles ; i++ ) {
			this.particles.push( new Particle({
				radius: 		( Math.random() * 50 ) + 50,
				isActive: 		true,
				color: 			'rgb( ' + Math.floor(Math.random() * 100 + 155) + ', ' + Math.floor(Math.random() * 255) +', ' + Math.floor(Math.random() * 50) + ' )',
				position: 		new Victor( Math.random() * this.winWidth - this.halfWidth , Math.random() * this.winHeight - this.halfHeight ),
				container: 		this.container,
				winHalfWidth: 	this.halfWidth,
				winHalfHeight: 	this.halfHeight,
				onSelected: 	this.onSelected
			}));

			this.particles[i].init();
		}

		this.gravity = new Gravity();
		this.collider = new Collider();

		raf.start();
		window.addEventListener( 'resize', this.onResize );
		window.addEventListener( 'mousemove', this.onMove );
		window.addEventListener( 'mouseup', this.onMouseUp );
	},

	onClick: function( event ) {
	},

	onMove: function( event ) {
		if( this.selected == void 0 ) { return; }

		this.selected.position.x = event.clientX - this.halfWidth;
		this.selected.position.y = event.clientY - this.halfHeight;
	},

	onResize: function() {
		this.winWidth	= window.innerWidth;
		this.winHeight	= window.innerHeight;

		this.halfWidth 	= this.winWidth  * .5;
		this.halfHeight = this.winHeight * .5;
	},

	onSelected: function( particle ) {
		this.selected = particle;
	},

	onMouseUp: function() {
		this.selected.isSelected = false;

		this.selected = null;
	},

	render: function() {
		for( let i = 0 ; i < this.particles.length ; i++ ) {
			this.particles[i].update();
		}

		for( let i = 0 ; i < this.particles.length ; i++ ) {
			this.particles[i].resetForces();
			this.gravity.update( this.particles[i] );
		}

		this.collider.update( this.particles );
	}

};