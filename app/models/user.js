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
  }
});

module.exports = User;
