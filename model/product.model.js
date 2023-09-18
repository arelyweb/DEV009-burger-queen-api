const mongoose = require('mongoose');


    var productSchema = mongoose.Schema(
      {
        name: String,
        price: Number,
        image: {
            type: String,
            required: false,
            default: 'burger1.jpg',
          },
        type:String,
      },
      { timestamps: true }
    );

module.exports = mongoose.model('products', productSchema);
