var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      /*bcrypt.hash(model.get('password'), null, null, function(err, hash) {
        if(err){
          console.error('error hashing password');
        } else {
          console.log(hash);
          console.log(model);
          model.set('password', hash);
          console.log(model.get('password'));
          console.log(model);
          console.log('password has been set to', hash)
        }
      });*/
      model.set('password', bcrypt.hashSync(model.get('password')));
    });
  },
  checkUser: function(req, res, callback){
    this.fetch()
    .then(function(user) {
      if(!user) {
        console.log('username does not exist');
        // do something to help user out
      } else {
        bcrypt.compare(req.body.password, user.get('password'), function(err, matches){
          if (err) {
            console.error(err);
          } else if(!matches) {
            console.log('wrong password');
            // do something to help user out
          } else {
            // if they are, redirect to index
            console.log('successful login as', req.body.username);
            callback(req, res, true);
          }
        });
      }
    });
  }
});

module.exports = User;
