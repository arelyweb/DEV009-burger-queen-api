const mongoose = require('mongoose');

var orderSchema = mongoose.Schema(
    {
      userId:{

      },
      client: {
          type: String,
          required:true,
        },
        products: [{
            qty: Number,
            product: {
                type: Schema.ObjectId,
                ref: 'products',
            },
        }
        ],
       status: {
          type: String,
          enum: [ 'pending', 'canceled', 'delivering', 'delivered' ],
          default:'pending'
        },
        dateProcessed:{
            type: Date,
            default: Date.now()
        }
    },
    { timestamps: true }
  );

module.exports = mongoose.model('users', orderSchema);