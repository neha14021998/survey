const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:String,
    enroll:String,
    libcard:String,
    branch:String,
    sem:String,
    email:String,
    mobile:Number,
   
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;