const mongoose = require('mongoose');

    var userSchema = mongoose.Schema(
      {
        email: {
            type: String,
            required:true,
            unique:true,
            validate: {
              validator: function(v) {
                return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(v);
              },
              message: props => `${props.value} is not a valid password!`
            }
         },
        password:{
            type: String,
            required:true,
            minLength:[6,'Password should be minimum of 6 characters']
         },
        role: {
            type: String,
            values:[ 'admin', 'waiter', 'chef' ]
          }
    }
    );

module.exports = mongoose.model('users', userSchema);