
    const double X_PI = 3.14159265358979324 * 3000.0 / 180.0;
    const double PI=3.14159265358979324;
    const double EARTH_RADIUS = 6378137;
    double rad(double d);
    double distanceOfTwoPoint(double lon1, double lat1,double lon2, double lat2);
	double a(double d1);
	double aa(double d1, double d2);
	double bb(double d1, double d2);
	double cc(double d1, double d2);
	double dd(double d1, double d2);
	void gps2Gcj(double d1,double d2,double *result);
	void gcjToGps(double d1,double d2,double *result);
	void gcjToBaidu(double d1,double d2,double *result);
	void baiduToGcj(double d1,double d2,double *result);