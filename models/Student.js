const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required']
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required']
    },
    date_of_birth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    phone_number: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);
