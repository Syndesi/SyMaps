

export default class Planet {

	a = 0;            //   semimajor axis
	e = 0;            //   eccentricity
	i = 0;            //   inclination
	w = 0;            // ω argument of perihelion
	om = 0;           // Ω ecliptic longitude
	m0 = 0;           //   mean anomaly
	d0 = 0;           //   date of measurements
	n = 0;            //   angle per day

	constructor(a, e, i, w, om, m0, d0){
		this.a = a;
		this.e = e;
		this.i = i;
		this.w = w;
		this.om = om;
		this.m0 = m0;
		this.d0 = d0;
		this.n = this.getAnglePerDay();
	}

	getAnglePerDay(){
		return 0.9856076686 / Math.pow(this.a, 3/2);
	}

	getMeanAnomaly(d){
		return this.m0 + this.n * (d - this.d0);
	}

	getGravityParameter(){
		return this.G * this.m;
	}

	/**
	 * meanToTrueAnomaly - converts mean anomaly to true anomaly
   * License: GNU GPL 2+
   * Author: Luis Baars <orbitnerd@gmail.com>
   * Created: 2012-02-14
	 * @param  {float} e eccentricity
	 * @param  {float} M mean anomaly (rad)
	 * @return {float}   true anomaly (rad)
	 */
	meanToTrueAnomaly(e, M){ // M in RAD
		if(e >= 1){
			console.log('MeanToTrueAnomaly does not support parabolic or hyperbolic orbits');
			return false; // MeanToTrueAnomaly does not support parabolic or hyperbolic orbits
		}
  	var E = this.meanToEccenAnomaly(e, M);
  	var f = this.eccenToTrueAnomaly(e, E);
  	return f; // f in RAD
	}

	/**
	 * meanToEccenAnomaly - Converts mean anomaly to eccentric anomaly
   * License: GNU GPL 2+
   * Author: Luis Baars <orbitnerd@gmail.com>
   * Created: 2012-02-14
	 * @param  {float} e eccentricity
	 * @param  {float} M mean anomaly (rad)
	 * @return {float}   eccentric anomaly (rad)
	 */
	meanToEccenAnomaly(e, M){
		if(e >= 1){
			console.log('meanToEccenAnomaly does not support parabolic or hyperbolic orbits');
			return false; // meanToEccenAnomaly does not support parabolic or hyperbolic orbits
		}

		var M = M % (2*Math.PI);
		if(M < Math.PI){
			M = M + 2*Math.PI;
		} else if (M > Math.PI){
			M = M - 2*Math.PI;
		}

		var E = 0;
		if((M > -Math.PI && M < 0) || (M > Math.PI)){
			E = M - e;
		} else {
			E = M + e;
		}

		var Enew = E;
		var zero = 1e-6;
		var first = true;
		while(first || Math.abs(Enew - E) > zero){
			first = false;
			E = Enew;
			Enew = E + (M - E + e*Math.sin(E))/(1 - e*Math.cos(E));
		}
		E = Enew;
		return E;
	}

	/**
	 * eccenToTrueAnomaly - Converts eccentric anomaly to true anomaly
   * License: GNU GPL 2+
   * Author: Luis Baars <orbitnerd@gmail.com>
   * Created: 2012-02-14
	 * @param  {float} e eccentricity
	 * @param  {float} E eccentric anomaly (rad)
	 * @return {float}   true anomaly (rad)
	 */
	eccenToTrueAnomaly(e, E){
		if(e >= 1){
			console.log('eccenToTrueAnomaly does not support parabolic or hyperbolic orbits');
			return false; // eccenToTrueAnomaly does not support parabolic or hyperbolic orbits
		}

		var sinf = Math.sin(E)*Math.sqrt(1 - e^2)/(1 - e * Math.cos(E));
		var cosf = (Math.cos(E) - e)/(1 - e * Math.cos(E));
		var f = Math.atan2(sinf, cosf);
		return f;
	}

}