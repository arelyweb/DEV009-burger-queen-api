const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

var orderSchema = mongoose.Schema(
    {
      userId:{
        type: Schema.ObjectId,
        ref: 'users',
      },
      client: {
          type: String,
          required:true,
        },
      products: [{
            qty: Number,
            productId: {
                type: Schema.ObjectId,
                ref: 'products',
            },
        }],
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

module.exports = mongoose.model('orders', orderSchema);