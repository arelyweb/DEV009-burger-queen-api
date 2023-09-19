const mongoose = require('mongoose');

    var userSchema = mongoose.Schema(
      {
        email: {
            type: String,
            validate: {
              validator: function(v) {
                return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(v);
              },
              message: props => `${props.value} is not a valid password!`
            }
         },
        password:{
            type: String,
            validate: {
              validator: function(v) {
                return v.length>5;
              },
              message: props => `${props.value} is not a valid password!`
            }
         },
        role: {
            type: String,
            values:[ 'admin', 'waiter', 'chef' ]
          }
    }
    );

module.exports = mongoose.model('users', userSchema);