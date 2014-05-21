var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Item = new Schema({
	name: {
		type: String,
		maxlength: 50
	},
	description: String,
	image_url: {
		type: String,
		maxlength: 255,
		default: ""
	},
	total_price: {
		type: Number,
		default: 0
	},
	recipe_price: {
		type: Number,
		default: 0
	},
	recipe: Array
});

var ItemModel = mongoose.model('Item', Item);

ItemModel.schema.path('name').validate(function(value){
	return !!value.length;
}, 'Tên trang bị không được để trống');

module.exports = ItemModel;