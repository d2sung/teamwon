
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var login = require('./routes/login');
var grocery = require('./routes/grocery');
var ingredients = require('./routes/ingredients');
var inventory = require('./routes/inventory');
var calories = require('./routes/calories');
var add = require('./routes/addItem');
var meal = require('./routes/meal');

// var grocery = require('./routes/grocery');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/index', index.view)
app.get('/grocery', index.grocery);
app.get('/calorietracking', index.calorie);
app.get('/mealplanning', index.meal);
app.get('/inventory', inventory.view);
app.get('/recipe', index.recipe);
app.get('/addForm', add.addItem);

//Grocery
app.get('/grocerylist', grocery.groceryList);
app.get('/addItem', grocery.addItem);

//Meal/Recipes
app.get('/recipesList', meal.recipesList);
app.get('/recipeInstructions', meal.recipeInstructions);
app.get('/recipe2', index.recipe2);

//Calories
app.get('/eatenList', calories.eatenList);


app.get('/ingredientslist', ingredients.ingredientsList);


//Inventory
//app.get('/decrement/:item', inventory.decrement);
//app.get('/increment/:item', inventory.increment);

app.get('/decrement', inventory.decrement);
app.get('/increment', inventory.increment);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
