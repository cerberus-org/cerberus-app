import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema({
  organizationId: { type: String },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: String,
  role: String
});

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

const User = mongoose.model('User', userSchema);

export default User;
