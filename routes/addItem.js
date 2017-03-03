var list = require('../grocery.json');
var inventoryList = require('../inventory.json');

exports.addItem = function(req, res) {

  var newItem =   {
    name: req.query.name,
    quantity: req.query.quantity,
    units: req.query.units
  };
  list.groceries.push(
    newItem
  );
  res.render('grocery');
};

exports.addInventoryItem = function(req, res) {

  var newItem = {
    name: req.query.name,
    quantity: req.query.quantity,
    units: req.query.units
  };
  inventoryList.ingredients.push(newItem);
}
