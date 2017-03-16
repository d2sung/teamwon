var list = require('../grocery.json');


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
