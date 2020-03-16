const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pnumber: {
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('content',contentSchema);