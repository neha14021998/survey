const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Student = require('../models/student');

const app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

router.get('/add',function(req,res){
  res.render('register');
});

// Load Edit Form
router.get('/edit/:id', function(req, res){
  console.log(req.params.id);
  Student.findById(req.params.id, function(err, stud){
   res.render('editsurvey', {
     stud:stud,
   });
 });
});

// Get Single Survey
router.get('/:id', function(req, res){
  Student.findById(req.params.id, function(err, student){
      res.render('view_survey', {
        student:student,
      });
  });
});




//match info and register student
router.post('/add',function(req,res){
  const name = req.body.name;
  const enroll= req.body.enroll;
  const libcard= req.body.libcard;
  const branch= req.body.branch;
  const sem= req.body.sem;
  const mobile= req.body.mobile;
  const email= req.body.email;
  
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('enroll', 'Enrollment is required').notEmpty();
  req.checkBody('libcard', 'Library card number is required').notEmpty();
  req.checkBody('branch', 'Branch is required').notEmpty();
  req.checkBody('sem', 'Semester is required').notEmpty();
  req.checkBody('mobile', 'Phone number is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
 

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    
    let student = new Student();
      student.name = name;
      student.enroll= enroll;
      student.libcard= libcard;
      student.branch=branch;
      student.sem= sem;
      student.mobile= mobile;
      student.email= email;
     
    
    student.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Survey Successfull');
        res.redirect('/');
      }
    }); 
}
});




//match info and register student
router.post('/edit/:id',function(req,res){
  const name = req.body.name;
  const enroll= req.body.enroll;
  const libcard= req.body.libcard;
  const branch= req.body.branch;
  const sem= req.body.sem;
  const mobile= req.body.mobile;
  const email= req.body.email;
 
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('enroll', 'Enrollment is required').notEmpty();
  req.checkBody('libcard', 'Library card number is required').notEmpty();
  req.checkBody('branch', 'Branch is required').notEmpty();
  req.checkBody('sem', 'Semester is required').notEmpty();
  req.checkBody('mobile', 'Phone number is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  
  
  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    
    let student = {};
      student.name = name;
      student.enroll= enroll;
      student.libcard= libcard;
      student.branch=branch;
      student.sem= sem;
      student.mobile= mobile;
      student.email= email;
     
      let query = {_id:req.params.id}
    
    Student.updateOne(query, student, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Edited Successfully !!');
        res.redirect('/');
      }
    });
  } 
});

module.exports = router;
