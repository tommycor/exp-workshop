import Victor		from 'victor';

import config 		from '../utils/config';

module.exports = class Collider{
	constructor() {
		console.log('Big badabim bada bada boum.');
	}

	update( particles ) {
		let diff = null;
		let dist = 0;
		let director = null
		let particle = null;
		let other = null;
		let force = 0;
		let sumRadius = 0;

		for( let i = 0 ; i < particles.length - 1 ; i++ ) {
			particle = particles[i];

			for( let j = i + 1 ; j < particles.length ; j++ ) {
				other = particles[j];

				diff 		= particle.position.clone().subtract( other.position );
				dist 		= Math.abs( Math.sqrt( diff.x * diff.x + diff.y * diff.y ) );
				sumRadius 	= particle.radius + other.radius;

				// Don't collide, don't give a fuck
				if( dist > sumRadius ) { continue; }

				director 	= diff.divide( new Victor( dist, dist ) );
				force 		= (sumRadius - dist) * .5;

				// if( force > 5) {
				// 	force = 5;
				// }

				if( particle.isSelected ) {
					other.collision.add( director.multiply( new Victor( -force*2, -force*2 ) ) );
				}
				else if( other.isSelected ) {
					particle.collision.add( director.clone().multiply( new Victor( force*2, force*2 ) ) );
				}
				else {
					particle.collision.add( director.clone().multiply( new Victor( force, force ) ) );
					other.collision.add( director.multiply( new Victor( -force, -force ) ) );
				}
			}
		}
	}

}