import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { isEmail } from 'validator';
import { capitalizeWithNameCase } from '../functions/capitalize';

const userSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: [true, 'Organization ID is required']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: isEmail,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  }
});

userSchema.index({ organizationId: 1, email: 1 }, { unique: true });

// Before saving the user, hash the password
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }
      user.password = hash;
      user.email = user.email.toLowerCase();
      next();
    });
  });
});

// Before saving the user, capitalize name fields
userSchema.pre('save', function(next) {
  this.firstName = this.capitalize(this.firstName);
  this.lastName = this.capitalize(this.lastName);
  next();
});

userSchema.methods.capitalize = capitalizeWithNameCase;

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export default mongoose.model('User', userSchema);
