import * as mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
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
  petName: {
    type: String,
    required: [true, 'Favorite pet name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
}, { timestamps: true });

volunteerSchema.index({ firstName: 1, lastName: 1, petName: 1 }, { unique: true });

// Before saving the user, capitalize name fields
volunteerSchema.pre('save', function(next) {
  const volunteer = this;
  volunteer.firstName = this.capitalize(volunteer.firstName);
  volunteer.lastName = this.capitalize(volunteer.lastName);
  volunteer.petName = this.capitalize(volunteer.petName);
  next();
});

volunteerSchema.methods.capitalize = function(field: String): String {
  let capitalizedWord = '';
  // for each word in a field
  field.split(' ').forEach(word => {
    if (word.indexOf('-') !== null) {
      // capitalize all characters after a hyphen
      word = this.handleHyphens(word);
    }
    capitalizedWord += this.setCharAt(word, 0, word.charAt(0).toUpperCase());
    capitalizedWord += ' ';
  });
  return capitalizedWord;
};

/**
 *
 * @param word
 * @return A new String with capitalized characters after each hyphen
 */
volunteerSchema.methods.handleHyphens = function(word: String): String {
  let letter = 0;
  // for each letter in a word
  for (let i = 0, len = word.length; i < len; i++) {
    if (word.charAt(i) === '-') {
      // get the letter after the hyphen
      letter = i + 1;
      // replace that letter with a capitalized letter
      word = this.setCharAt(word, letter, word.charAt(letter).toUpperCase());
    }
  }
  return word;
};

/**
 *
 * @param str
 * @param index
 * @param chr
 * @return A new string with the original character at the supplied index replaced with chr
 */
volunteerSchema.methods.setCharAt = function(str: String, index: number, chr: String): String {
  if (index > str.length - 1) {
    return str;
  }
  return str.substr(0, index) + chr + str.substr(index + 1);
};

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
