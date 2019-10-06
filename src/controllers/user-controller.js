const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

class UserController{

  static routes() {
    return {
      index: '/usuarios',
      new: '/usuarios/novo',
      create: '/usuarios/novo',
      edit: '/usuarios/editar/:id',
      update: '/usuarios/editar/:id',
      delete: '/usuarios/deletar/:id'
    }
  }

  static validations(){
    return [
        check('email').isEmail().withMessage('O email digitado é inválido!'),
        check('name').isLength({ min: 3}).withMessage('O nome precisa ter no mínimo 3 caracteres!'),
        check('password').isLength({ min: 6 }).withMessage('A senha precisa ter no mínimo 6 caracteres!'),
    ];
  }

  index(){
    return (req, res) => {
      User.find({}).exec(
        function (err, users) {
          if(err){
            res.render('error');
          }
          else{
            res.render('users/index', { users });
          }
        }
      );
    }
  }
  
  new(){
    return (req, res) => {
      res.render('users/new', { user : {} });
    }
  }

  create(){
    return (req, res) => {
      var user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      }
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.render('users/new', { user, validationErrors: errors.array() });
      }
      User.find({ email: user.email }, function(err, users){
        if(users.length){
          return res.render('users/new', { user, validationErrors: [{ msg: 'O email já está sendo utilizado' }] });
        }
        else{
          var newUser = new User(user);
          newUser.save(function (err) {
            if (err) {
              res.send('error');
            }
            else {
              return res.redirect("/usuarios");
            }
          });
        }
      })
    }
  }

  edit(){
    return (req, res) => {
      User.findOne({
        _id: req.params.id
      }).exec(function(err, user){
        if(err) {
          res.send('error');
        }
        else {
          res.render('users/edit', { user });
        }
      });
    }
  }

  update(){
    return (req, res) => {
      var user = {
        name: req.body.name,
        email: req.body.email,
      }
      if(req.body.password){
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      User.find({ email: user.email }, function(err, users){
        if(users.length){
          return res.render('users/new', { user, validationErrors: [{ msg: 'O email já está sendo utilizado' }] });
        }
        else{
          User.findOneAndUpdate(
            { _id: req.params.id },
            user,
            function(err){
              if(err) {
                res.send('error');
              } else {
                return res.redirect("/usuarios");
              }
            }
          );
        }
      })
    }
  }

  delete(){
    return (req, res) => {
      User.findByIdAndRemove({ _id: req.params.id },
        function(err){
          if(err) {
            return res.send('error');
          } 
          else {
            res.status(200).end();
          }
        }
      );
    }
  }
  
}

module.exports = UserController;