var working = function () {
  console.log("Connected - hello from script.js");
};
working();

//variables
var cockTailUrl = "https://the-cocktail-db.p.rapidapi.com/random.php";
var yumlyUrl = "https://yummly2.p.rapidapi.com/categories/list";
var MealsUrl = "https://themealdb.p.rapidapi.com/latest.php";

// get element by ID for PARENT
var drinksList = document.querySelector(".drinks-list");
var randomMealImg = document.getElementById("RandomMealImg");
var randomMealTitleEl = document.getElementById("featuredMealTitle");
var randomMealIngredientsEl = document.getElementById("mealIngredients");
var randomDrinkTitleEl = document.getElementById("featuredDrinkTitle");
var randomDrinkImgEl = document.getElementById("RandomDrinkImg");
var randomDrinkIngredientsEl = document.getElementById("drinkIngredients");

// // API CALL 1 COCKTAILDB
const cockTails = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
  },
};

fetch(cockTailUrl, cockTails)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data.drinks[0]) +
      (randomDrinkTitleEl.innerHTML = data.drinks[0].strDrink) +
      randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

    var drinkIngredients = Object.keys(data.drinks[0])
      .filter((k) => k.startsWith("strIngredient"))
      .map((m) => data.drinks[0][m]);

    var drinkMeasure = Object.keys(data.drinks[0])
      .filter((s) => s.startsWith("strMeasure"))
      .map((f) => data.drinks[0][f]);

    for (let i = 0; i <= drinkIngredients.length; i++) {
      randomDrinkIngredientsEl.innerHTML +=
        " " + drinkMeasure[i] + " " + drinkIngredients[i];
      //if ingredient or measurement is null. stop looping, no more ingredients
      if (drinkIngredients[i] === null || drinkMeasure[i] === null) {
        break;
      }
    }
  })
  .catch((err) => console.error(err + "Error with Drinks"));

// //API CALL 2 YUMLY

// const yumlyMeals = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
//     "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
//   },
// };

// fetch(yumlyUrl, yumlyMeals)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// // API CALL 3 TheMealDB

const randomMealFetch = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
    "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
  },
};

fetch("https://themealdb.p.rapidapi.com/random.php", randomMealFetch)
  .then((response) => response.json())
  .then(function (data) {
    randomMealImg.setAttribute("src", data.meals[0].strMealThumb) +
      (randomMealTitleEl.innerHTML = data.meals[0].strMeal);

    var mealIngredients = Object.keys(data.meals[0])
      .filter((k) => k.startsWith("strIngredient"))
      .map((v) => data.meals[0][v]);

    var mealMeasurements = Object.keys(data.meals[0])
      .filter((k) => k.startsWith("strMeasure"))
      .map((m) => data.meals[0][m]);

    console.log(mealMeasurements);
    console.log(mealIngredients);
    for (let i = 0; i < mealIngredients.length; i++) {
      randomMealIngredientsEl.innerHTML +=
        "" + mealMeasurements[i] + " " + mealIngredients[i];
    }
    //if ingredient or measurement is null. stop looping, no more ingredients
    // if (mealIngredients[i] === null || mealMeasurements[i] === null) {
    //   break;
    // }
  })
  .catch((err) =>
    console.error(err + "Error in fetching meal.  randomMealFetch")
  );

//functions
drinksList.addEventListener("click", function (event) {
  if (event.target && event.target.innerHTML === "Vodka") {
    console.log("CLICKED VODKA");
  } else if (event.target && event.target.innerHTML === "Gin") {
    console.log("CLICKED GIN");
  } else if (event.target && event.target.innerHTML === "Rum") {
    console.log("Clicked RUM");
  } else if (event.target && event.target.innerHTML === "Whiskey") {
    console.log("clicked Whiskey");
  } else if (event.target && event.target.innerHTML === "NonAlcoholic") {
    console.log("NO ALCOHOL");
  }
});
