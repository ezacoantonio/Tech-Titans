const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uniqueId: {
    type: String,
    unique: true
  },
  
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  accountBalance: {
    type: Number,
    default: 1000, 
    min: [0, 'Account balance low please recharge your account'] 
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: String,
    enum: ['customer', 'administrator'],
    default: 'customer'
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updated: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'users'
});

UserSchema.virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

UserSchema.virtual('password')
  .set(function(password) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    } else {
      this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
      this.hashed_password = this.hashPassword(password);
    }
  });

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.hashed_password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.hashed_password;
    delete ret.salt;
  }
});

module.exports = mongoose.model('User', UserSchema);
