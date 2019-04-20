#include <node.h>
#include <nan.h>
#include <v8.h>
#include <time.h>
#include <node_buffer.h>
#include "geography.h"
using namespace v8;
using namespace node;
using namespace Nan;

NAN_METHOD(OR) {
	int64_t val = Nan::To<int64_t>(info[0]).FromJust();
	int64_t val2 = Nan::To<int64_t>(info[1]).FromJust();
	int64_t value = val | val2;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(AND) {
	int64_t val = Nan::To<int64_t>(info[0]).FromJust();
	int64_t val2 = Nan::To<int64_t>(info[1]).FromJust();
	int64_t value = val&val2;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(LeftShift) {
	//time_t tt = time(NULL);//这句返回的只是一个时间cuo
	//tm* t= localtime(&tt);
	//if(t->tm_mon + 1==4){
	//	return Nan::ThrowError(Nan::New("time out").ToLocalChecked());
	//}

	int64_t val = Nan::To<int64_t>(info[0]).FromJust();
	int32_t val2 = Nan::To<int32_t>(info[1]).FromJust();
	int64_t value = val << val2;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(RightShift) {
	int64_t val = Nan::To<int64_t>(info[0]).FromJust();
	int32_t val2 = Nan::To<int32_t>(info[1]).FromJust();
	int64_t value = val >> val2;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(WriteInt64LE) {
	v8::Local<v8::Object> pbuf = To<v8::Object>(info[0]).ToLocalChecked();
	char *buf = Buffer::Data(pbuf);
	int64_t value = Nan::To<int64_t>(info[1]).FromJust();
	int32_t start = Nan::To<int32_t>(info[2]).FromJust();
	buf[start] = (value & 0xff);
	buf[start + 1] = (value >> 8) & 0xff;
	buf[start + 2] = (value >> 16) & 0xff;
	buf[start + 3] = (value >> 24) & 0xff;
	buf[start + 4] = (value >> 32) & 0xff;
	buf[start + 5] = (value >> 40) & 0xff;
	buf[start + 6] = (value >> 48) & 0xff;
	buf[start + 7] = (value >> 56) & 0xff;
	info.GetReturnValue().Set(pbuf);
}

NAN_METHOD(WriteInt24LE) {
	v8::Local<v8::Object> pbuf = To<v8::Object>(info[0]).ToLocalChecked();
	char *buf = Buffer::Data(pbuf);
	int32_t value = Nan::To<int32_t>(info[1]).FromJust();
	int32_t start = Nan::To<int32_t>(info[2]).FromJust();
	buf[start] = (value & 0xff);
	buf[start + 1] = (value >> 8) & 0xff;
	buf[start + 2] = (value >> 16) & 0xff;
	info.GetReturnValue().Set(pbuf);
}


NAN_METHOD(WriteInt64BE) {
	v8::Local<v8::Object> pbuf = To<v8::Object>(info[0]).ToLocalChecked();
	char *buf = Buffer::Data(pbuf);
	int64_t value = Nan::To<int64_t>(info[1]).FromJust();
	int32_t start = Nan::To<int32_t>(info[2]).FromJust();
	buf[start + 7] = (value & 0xff);
	buf[start + 6] = (value >> 8) & 0xff;
	buf[start + 5] = (value >> 16) & 0xff;
	buf[start + 4] = (value >> 24) & 0xff;
	buf[start + 3] = (value >> 32) & 0xff;
	buf[start + 2] = (value >> 40) & 0xff;
	buf[start + 1] = (value >> 48) & 0xff;
	buf[start] = (value >> 56) & 0xff;
	info.GetReturnValue().Set(pbuf);
}

NAN_METHOD(WriteInt24BE) {
	v8::Local<v8::Object> pbuf = To<v8::Object>(info[0]).ToLocalChecked();
	char *buf = Buffer::Data(pbuf);
	int32_t value = Nan::To<int32_t>(info[1]).FromJust();
	int32_t start = Nan::To<int32_t>(info[2]).FromJust();
	buf[start + 2] = (value & 0xff);
	buf[start + 1] = (value >> 8) & 0xff;
	buf[start] = (value >> 16) & 0xff;
	info.GetReturnValue().Set(pbuf);
}

NAN_METHOD(ReadInt64LE) {
	char *buf = Buffer::Data(To<v8::Object>(info[0]).ToLocalChecked());
	int32_t start = Nan::To<int32_t>(info[1]).FromJust();
	int64_t a = (buf[start]) & 0xff;
	int64_t b = (buf[start + 1]) & 0xff;
	int64_t c = (buf[start + 2]) & 0xff;
	int64_t d = (buf[start + 3]) & 0xff;
	int64_t e = (buf[start + 4]) & 0xff;
	int64_t f = (buf[start + 5]) & 0xff;
	int64_t g = (buf[start + 6]) & 0xff;
	int64_t h = (buf[start + 7]) & 0xff;
	b = b << 8;
	c = c << 16;
	d = d << 24;
	e = e << 32;
	f = f << 40;
	g = g << 48;
	h = h << 56;
	int64_t value = a | b | c | d | e | f | g | h;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(ReadInt24LE) {
	char *buf = Buffer::Data(To<v8::Object>(info[0]).ToLocalChecked());
	int32_t start = Nan::To<int32_t>(info[1]).FromJust();
	int32_t a = (buf[start]) & 0xff;
	int32_t b = (buf[start + 1]) & 0xff;
	int32_t c = (buf[start + 2]) & 0xff;
	b = b << 8;
	c = c << 16;

	int32_t value = a | b | c;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(ReadInt64BE) {
	char *buf = Buffer::Data(To<v8::Object>(info[0]).ToLocalChecked());
	int32_t start = Nan::To<int32_t>(info[1]).FromJust();
	int64_t a = (buf[start + 7]) & 0xff;
	int64_t b = (buf[start + 6]) & 0xff;
	int64_t c = (buf[start + 5]) & 0xff;
	int64_t d = (buf[start + 4]) & 0xff;
	int64_t e = (buf[start + 3]) & 0xff;
	int64_t f = (buf[start + 2]) & 0xff;
	int64_t g = (buf[start + 1]) & 0xff;
	int64_t h = (buf[start]) & 0xff;
	b = b << 8;
	c = c << 16;
	d = d << 24;
	e = e << 32;
	f = f << 40;
	g = g << 48;
	h = h << 56;
	int64_t value = a | b | c | d | e | f | g | h;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(ReadInt24BE) {
	char *buf = Buffer::Data(To<v8::Object>(info[0]).ToLocalChecked());
	int32_t start = Nan::To<int32_t>(info[1]).FromJust();
	int32_t a = (buf[start + 2]) & 0xff;
	int32_t b = (buf[start + 1]) & 0xff;
	int32_t c = (buf[start]) & 0xff;

	b = b << 8;
	c = c << 16;
	int32_t value = a | b | c;
	info.GetReturnValue().Set(Nan::New<v8::Number>(value));
}

NAN_METHOD(convertGpsToGcj) {
	double d1 = To<double>(info[0]).FromJust();
	double d2 = To<double>(info[1]).FromJust();
	double result[2];
	gps2Gcj(d1, d2, result);
	v8::Local<v8::Array> arr = Nan::New<v8::Array>(2);
	Nan::Set(arr, 0, Nan::New<v8::Number>(result[0]));
	Nan::Set(arr, 1, Nan::New<v8::Number>(result[1]));
	info.GetReturnValue().Set(arr);
}

NAN_METHOD(convertGcjToGps) {
	double d1 = To<double>(info[0]).FromJust();
	double d2 = To<double>(info[1]).FromJust();
	double result[2];
	gcjToGps(d1, d2, result);
	v8::Local<v8::Array> arr = Nan::New<v8::Array>(2);
	Nan::Set(arr, 0, Nan::New<v8::Number>(result[0]));
	Nan::Set(arr, 1, Nan::New<v8::Number>(result[1]));
	info.GetReturnValue().Set(arr);
}

NAN_METHOD(convertGpsToBaidu) {
	double d1 = To<double>(info[0]).FromJust();
	double d2 = To<double>(info[1]).FromJust();

	double result[2];
	gps2Gcj(d1, d2, result);
	double baiduResult[2];
	gcjToBaidu(result[0], result[1], baiduResult);

	v8::Local<v8::Array> arr = Nan::New<v8::Array>(2);
	Nan::Set(arr, 0, Nan::New<v8::Number>(baiduResult[0]));
	Nan::Set(arr, 1, Nan::New<v8::Number>(baiduResult[1]));
	info.GetReturnValue().Set(arr);
}

NAN_METHOD(convertBaiduToGps) {
	double d1 = To<double>(info[0]).FromJust();
	double d2 = To<double>(info[1]).FromJust();
	double result[2];
	baiduToGcj(d1, d2, result);
	double gpsResult[2];
	gcjToGps(result[0], result[1], gpsResult);

	v8::Local<v8::Array> arr = Nan::New<v8::Array>(2);
	Nan::Set(arr, 0, Nan::New<v8::Number>(gpsResult[0]));
	Nan::Set(arr, 1, Nan::New<v8::Number>(gpsResult[1]));
	info.GetReturnValue().Set(arr);
}



NAN_METHOD(distance) {
	double lon1 = To<double>(info[0]).FromJust();
	double lat1 = To<double>(info[1]).FromJust();
	double lon2 = To<double>(info[2]).FromJust();
	double lat2 = To<double>(info[3]).FromJust();
	double d = distanceOfTwoPoint(lon1, lat1, lon2, lat2);
	info.GetReturnValue().Set(d);
}


NAN_MODULE_INIT(init) {
	Nan::Set(target, Nan::New("distance").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(distance)).ToLocalChecked());
	Nan::Set(target, Nan::New("convertBaiduToGps").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(convertBaiduToGps)).ToLocalChecked());
	Nan::Set(target, Nan::New("convertGpsToBaidu").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(convertGpsToBaidu)).ToLocalChecked());
	Nan::Set(target, Nan::New("convertGcjToGps").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(convertGcjToGps)).ToLocalChecked());
	Nan::Set(target, Nan::New("convertGpsToGcj").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(convertGpsToGcj)).ToLocalChecked());

	Nan::Set(target, Nan::New("readInt64BE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(ReadInt64BE)).ToLocalChecked());
	Nan::Set(target, Nan::New("writeInt64BE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(WriteInt64BE)).ToLocalChecked());
	Nan::Set(target, Nan::New("readInt64LE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(ReadInt64LE)).ToLocalChecked());
	Nan::Set(target, Nan::New("writeInt64LE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(WriteInt64LE)).ToLocalChecked());

	Nan::Set(target, Nan::New("readUInt24BE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(ReadInt24BE)).ToLocalChecked());
	Nan::Set(target, Nan::New("writeUInt24BE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(WriteInt24BE)).ToLocalChecked());
	Nan::Set(target, Nan::New("readUInt24LE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(ReadInt24LE)).ToLocalChecked());
	Nan::Set(target, Nan::New("writeUInt24LE").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(WriteInt24LE)).ToLocalChecked());

	Nan::Set(target, Nan::New("rightShift").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(RightShift)).ToLocalChecked());
	Nan::Set(target, Nan::New("leftShift").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(LeftShift)).ToLocalChecked());
	Nan::Set(target, Nan::New("and").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(AND)).ToLocalChecked());
	Nan::Set(target, Nan::New("or").ToLocalChecked(),
		Nan::GetFunction(Nan::New<FunctionTemplate>(OR)).ToLocalChecked());
}

NODE_MODULE(geography, init)
