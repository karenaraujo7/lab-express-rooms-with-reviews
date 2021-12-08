const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {type : String},
    description: {type: String},
    imageUrl: {type: String},
    reviews: [], // atualizaremos este campo um pouco mais tarde, quando criarmos a revisão modelo 
});

module.exports = mongoose.model('Room', roomSchema);