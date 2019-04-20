#include <math.h>
#include "geography.h"

	 double a(double d1) {
		bool flag = false;
		if (d1 < 0.0) {
		d1 = -d1;
		flag = true;
		}
		long long l = (long long) (d1 / 6.2831853071795862);
		double d2;
		if ((d2 = d1 - (double) l * 6.2831853071795862) > 3.1415926535897931) {
		d2 -= 3.1415926535897931;
		flag = !flag;
		}
		double d3 = d1 = d2;
		double d4 = d1;
		d2 *= d2;
		d4 *= d2;
		d3 -= d4 * 0.16666666666666699;
		d4 *= d2;
		d3 += d4 * 0.0083333333333333297;
		d4 *= d2;
		d3 -= d4 * 0.00019841269841269801;
		d4 *= d2;
		d3 += d4 * 2.7557319223985901E-006;
		d4 *= d2;
		d3 -= d4 * 2.50521083854417E-008;
		if (flag)
		d3 = -d3;
		return d3;
	}

	double aa(double d1, double d2) {
		double d3 = 0;
		return d3 = (d3 = (d3 = (d3 = 300 + 1.0 * d1 + 2 * d2
				+ 0.10000000000000001 * d1 * d1 + 0.10000000000000001 * d1
				* d2 + 0.10000000000000001 *sqrt(sqrt(d1 * d1)))
				+ (20 * a(18.849555921538759 * d1) + 20 * a(6.2831853071795862 * d1))
				* 0.66669999999999996)
				+ (20 * a(3.1415926535897931 * d1) + 40 * a((3.1415926535897931 * d1) / 3))
				* 0.66669999999999996)
				+ (150 * a((3.1415926535897931 * d1) / 12) + 300 * a((3.1415926535897931 * d1) / 30))
				* 0.66669999999999996;
	}

	double bb(double d1, double d2) {
		double d3;
		return d3 = (d3 = (d3 = (d3 = -100 + 2 * d1 + 3 * d2
				+ 0.20000000000000001 * d2 * d2 + 0.10000000000000001 * d1
				* d2 + 0.20000000000000001 * sqrt(sqrt(d1 * d1)))
				+ (20 * a(18.849555921538759 * d1) + 20 * a(6.2831853071795862 * d1))
				* 0.66669999999999996)
				+ (20 * a(3.1415926535897931 * d2) + 40 * a((3.1415926535897931 * d2) / 3))
				* 0.66669999999999996)
				+ (160 * a((3.1415926535897931 * d2) / 12) + 320 * a((3.1415926535897931 * d2) / 30))
				* 0.66669999999999996;
	}
	double cc(double d1, double d2) {
		double d3 = a((d1 * 3.1415926535897931) / 180);
		double d4 = sqrt(1.0 - 0.0066934200000000003 * d3 * d3);
		return d4 = (d2 * 180)
				/ ((6378245 / d4)
						* cos((d1 * 3.1415926535897931) / 180) * 3.1415926535897931);
	}

	double dd(double d1, double d2) {
		double d3 = a((d1 * 3.1415926535897931) / 180);
		double d4 = 1.0 - 0.0066934200000000003 * d3 * d3;
		double d5 = 6335552.7273521004 / (d4 * sqrt(d4));
		return (d2 * 180) / (d5 * 3.1415926535897931);
	}

	void gps2Gcj(double d1,double d2,double *result){
		double ad[2];
		ad[0] = d1;
		ad[1] = d2;
		double d3 = aa(ad[0] - 105, ad[1] - 35);
		double d4 = bb(ad[0] - 105, ad[1] - 35);
		*result = ad[0] + cc(ad[1], d3);
		*(result+1) = ad[1] + dd(ad[1], d4);
		*result = (double) ((long long) ((*result + 0.00000005) * 1000000)) / 1000000;
		*(result+1) = (double) ((long long) ((*(result+1) + 0.00000005) * 1000000)) / 1000000;
	}

	void gcjToGps(double d1,double d2,double *result) {
		double ad[2];
		ad[0] = d1;
		ad[1] = d2;
		double d3 = aa(ad[0] - 105, ad[1] - 35);
		double d4 = bb(ad[0] - 105, ad[1] - 35);
		*result = ad[0] - cc(ad[1], d3);
		*(result+1) = ad[1] - dd(ad[1], d4);
		*result = (double) ((long long) ((*result + 0.00000005) * 1000000)) / 1000000;
		*(result+1) = (double) ((long long) ((*(result+1)+ 0.00000005) * 1000000)) / 1000000;
	}

	void gcjToBaidu(double d1,double d2,double *result){
		double x = d1, y = d2;
		double z = sqrt(x * x + y * y) + 0.00002*sin(y * X_PI);
		double theta = atan2(y, x) + 0.000003* cos(x * X_PI);
		double bdLon = z * cos(theta) + 0.0065;
		double bdLat = z * sin(theta) + 0.006;
		*result=(double) ((long long) ((bdLon + 0.00000005) * 1000000)) / 1000000;
		*(result+1) = (double) ((long long) ((bdLat+ 0.00000005) * 1000000)) / 1000000;
	}

	void baiduToGcj(double d1,double d2,double *result){
		double x = d1 - 0.0065, y = d2- 0.006;
		double z = sqrt(x * x + y * y) - 0.00002* sin(y *X_PI);
		double theta = atan2(y, x) - 0.000003*cos(x * X_PI);
		double ggLon = z * cos(theta);
		double ggLat = z * sin(theta);
		*result=(double) ((long long) ((ggLon + 0.00000005) * 1000000)) / 1000000;
		*(result+1) = (double) ((long long) ((ggLat+ 0.00000005) * 1000000)) / 1000000;
	}

	 double rad(double d){
	  	return d * PI / 180.0;
	 }

	 double distanceOfTwoPoint(double lon1, double lat1,double lon2, double lat2){
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lon1) - rad(lon2);
		double s = sqrt(sin(a / 2) * sin(a / 2) + cos(radLat1) * cos(radLat2) * sin(b / 2) * sin(b / 2));
		s = 2 * s * EARTH_RADIUS;
		return s;
	 }