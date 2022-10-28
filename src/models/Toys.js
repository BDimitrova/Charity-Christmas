const mongoose = require('mongoose');

let toysSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    charity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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