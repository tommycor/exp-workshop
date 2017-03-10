// GRAVITY

import Victor		from 'victor';

import config 		from '../utils/config';

module.exports = class Gravity{
	constructor() {
		console.log('May the force be with you.');
	}

	update( particle ) {
		if( particle.isSelected ) { return; }
		
		let diff  = 0;
		let dist  = 0;
		let force = config.gravityForce;
		let director = new Victor(0, 0);

		dist = Math.abs( Math.sqrt( particle.position.x * particle.position.x +  particle.position.y * particle.position.y  ) );

		if( dist < 3 ) {
			return;
		}

		director = particle.position.clone().divide( new Victor( dist, dist ) );

		particle.gravity.add( director.multiply( new Victor( force, force ) ) );
	}
}