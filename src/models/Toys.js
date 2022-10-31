const mongoose = require('mongoose');

let toysSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10,
    },
    charity: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    category: {
        type: String,
        required: true,
        minLength: 5,
    },
    price: {
        type: Number,
        required: true,
        minValue: 0,
    },
    buyingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

toysSchema.method('getBuying', function () {
    return this.buyingList.map(x => x._id);
})


let Toys = mongoose.model('Toys', toysSchema);

module.exports = Toys;