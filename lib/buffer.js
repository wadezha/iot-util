Buffer.prototype.writeUInt24LE = function (value, offset) {
  this[offset] = (value & 0xff);
  this[offset + 1] = (value >> 8) & 0xff;
  this[offset + 2] = (value >> 16) & 0xff;
  return this;
};

Buffer.prototype.readUInt24LE = function (offset) {
  const a = (this[offset]) & 0xff;
  const b = (this[offset + 1]) & 0xff;
  const c = (this[offset + 2]) & 0xff;
  return a | (b << 8) | (c << 16);
};

Buffer.prototype.writeUInt24BE = function (value, offset) {
  this[offset + 2] = (value & 0xff);
  this[offset + 1] = (value >> 8) & 0xff;
  this[offset] = (value >> 16) & 0xff;
  return this;
};

Buffer.prototype.readUInt24BE = function (offset) {
  const a = (this[offset + 2]) & 0xff;
  const b = (this[offset + 1]) & 0xff;
  const c = (this[offset]) & 0xff;
  return a | (b << 8) | (c << 16);
};
