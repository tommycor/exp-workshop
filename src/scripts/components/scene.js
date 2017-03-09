import config 				from '../utils/config';
import raf 					from '../utils/raf';
import mapper 				from '../utils/mapper';

import Particle 			from './particle';

module.exports = {

	init: function() {

		this.particles = new Array();

		this.particles.push( new Particle({
			width: 		Math.random() * .5,
			height: 	Math.random() * .5,
			isActive: 	true,
			color: 		'rgb( ' + (Math.random() * 255) + ', ' + (Math.random() * 255) +', ' + (Math.random() * 255) + ' )'
		}));

		this.particles[0].init({
		});

		//// REGIST RENDERER
		raf.register( this.render );
		raf.start();
		this.onResize();

		window.addEventListener( 'resize', this.onResize );
		window.addEventListener( 'mousemove', this.onMove );
		window.addEventListener( 'click', this.onClick );
	},

	onClick: function( event ) {
	},

	onMove: function( event ) {
	},

	onResize: function() {
		this.halfWidth = window.innerWidth * .5;
		this.halfHeight = window.innerHeight * .5;
	},

	render: function() {
	}

};