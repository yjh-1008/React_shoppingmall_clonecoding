const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectID,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    continent:{
        type:String,
        maxlength:100,
        default:""
    },
    views:{
        type:Number,
        default:0
    }
},{timestamp:true})

const product = mongoose.model('Product', productSchema);
module.exports = { product }