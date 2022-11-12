const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const myRecipe = await Recipe.create({

      title: "Crepioca do Lucas",
      level: "Easy Peasy",
      ingredients: ["Eggs", "Tapioca", "Cheese", "Tomato"],
      cuisine: "Brazilian",
      dishType: "breakfast",
      image: "https://www.sistersmommies.com.br/wp-content/uploads/2018/09/receita_de_crepioca-sisters_mommies.jpg",
      duration: 10,
      creator: "Lucas Santos",
      created: "12-11-2022",
    
    });
    console.log(myRecipe.title);

    const multipleRecipes = await Recipe.insertMany(data);
    multipleRecipes.forEach(recipe => {
      console.log('Title --->', recipe.title);
    });
    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
    await Recipe.deleteOne({ title: 'Carrot Cake' });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

   
//const multipleRecipes = await Recipe.insertMany(data);
//multipleRecipes.forEach(element => console.log(element.title));

//await Recipe.findByIdAndUpdate(
  //{title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
 

  //} catch (error) {
    //console.log(error);
  //}
//};





manageRecipes();



//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
