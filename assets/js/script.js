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
var featuredDrinkEl = document.getElementById("DRINKME");

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
    // console.log(data.drinks[0])
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
        " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";

      //if ingredient or measurement is null. stop looping, no more ingredients
      if (
        drinkIngredients[i] === null ||
        drinkIngredients[i] === "" ||
        drinkMeasure[i] === null
      ) {
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

    for (let i = 0; i < mealIngredients.length; i++) {
      randomMealIngredientsEl.innerHTML +=
        "" + mealMeasurements[i] + " " + mealIngredients[i] + ", ";
      // if ingredient or measurement is null. stop looping, no more ingredients
      if (
        mealIngredients[i] === null ||
        mealIngredients[i] === "" ||
        mealMeasurements[i] === null
      ) {
        break;
      }
    }
  })
  .catch((err) =>
    console.error(err + "Error in fetching meal.  randomMealFetch")
  );

//functions
drinksList.addEventListener("click", function (event) {
  if (event.target && event.target.innerHTML === "Vodka") {
    console.log("CLICKED VODKA");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
      },
    };

    var rannum = fetch(
      "https://the-cocktail-db.p.rapidapi.com/filter.php?i=vodka",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        //get random drink from 0-99 (100 drinks found in VODKA category)
        var randomDrinkNum = Math.floor(Math.random() * (100 - 0 + 1));
        // console.log(randomDrinkNum);

        var listOfDrinks = data.drinks;
        // console.log(listOfDrinks);
        // console.log(listOfDrinks[randomDrinkNum].idDrink);

        return listOfDrinks[randomDrinkNum].idDrink;
      })
      .catch((err) => console.error(err));
    var giveRandomDrinkId = function () {
      rannum.then(function (drinkID) {
        const getDrinkFromId = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
          getDrinkFromId
        )
          .then((response) => response.json())
          .then(function (data) {
            //this is a RANDOM DRINK WITH INGREDIENT VODKA
            // console.log(data.drinks[0]);
            featuredDrinkEl.textContent = "Featured VODKA Drink";
            randomDrinkTitleEl.textContent = data.drinks[0].strDrink;

            var drinkIngredients = Object.keys(data.drinks[0])
              .filter((k) => k.startsWith("strIngredient"))
              .map((m) => data.drinks[0][m]);

            var drinkMeasure = Object.keys(data.drinks[0])
              .filter((s) => s.startsWith("strMeasure"))
              .map((f) => data.drinks[0][f]);
            randomDrinkIngredientsEl.innerHTML = " ";
            randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

            for (let i = 0; i < drinkIngredients.length; i++) {
              if (
                drinkIngredients[i] === null ||
                drinkIngredients[i] === null ||
                drinkMeasure[i] === null
              ) {
                break;
              }
              randomDrinkIngredientsEl.innerHTML +=
                " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";
            }
          })
          .catch((err) => console.error(err));
      });
    };
    giveRandomDrinkId();
  } else if (event.target && event.target.innerHTML === "Gin") {
    console.log("CLICKED GIN");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
      },
    };

    var rannum = fetch(
      "https://the-cocktail-db.p.rapidapi.com/filter.php?i=GIN",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        //get random drink from 0-106 (106 drinks found in GIN category)

        var randomDrinkNum = Math.floor(Math.random() * 106);
        // console.log(randomDrinkNum);

        var listOfDrinks = data.drinks;
        // console.log(listOfDrinks);
        // console.log(listOfDrinks[randomDrinkNum].idDrink);

        return listOfDrinks[randomDrinkNum].idDrink;
      })
      .catch((err) => console.error(err));
    var giveRandomDrinkId = function () {
      rannum.then(function (drinkID) {
        const getDrinkFromId = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
          getDrinkFromId
        )
          .then((response) => response.json())
          .then(function (data) {
            //this is a RANDOM DRINK WITH INGREDIENT VODKA

            featuredDrinkEl.textContent = "Featured GIN Drink";
            randomDrinkTitleEl.textContent = data.drinks[0].strDrink;

            var drinkIngredients = Object.keys(data.drinks[0])
              .filter((k) => k.startsWith("strIngredient"))
              .map((m) => data.drinks[0][m]);

            var drinkMeasure = Object.keys(data.drinks[0])
              .filter((s) => s.startsWith("strMeasure"))
              .map((f) => data.drinks[0][f]);
            randomDrinkIngredientsEl.innerHTML = " ";
            randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

            for (let i = 0; i < drinkIngredients.length; i++) {
              if (
                drinkIngredients[i] === null ||
                drinkIngredients[i] === null ||
                drinkMeasure[i] === null
              ) {
                break;
              }
              randomDrinkIngredientsEl.innerHTML +=
                " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";
            }
          })
          .catch((err) => console.error(err));
      });
    };
    giveRandomDrinkId();
  } else if (event.target && event.target.innerHTML === "Rum") {
    console.log("Clicked RUM");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
      },
    };

    var rannum = fetch(
      "https://the-cocktail-db.p.rapidapi.com/filter.php?i=RUM",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        //get random drink from 0-25 (26 drinks found in RUM category)
        var randomDrinkNum = Math.floor(Math.random() * 25);
        // console.log(randomDrinkNum);

        var listOfDrinks = data.drinks;
        // console.log(listOfDrinks);
        // console.log(listOfDrinks[randomDrinkNum].idDrink);

        return listOfDrinks[randomDrinkNum].idDrink;
      })
      .catch((err) => console.error(err));
    var giveRandomDrinkId = function () {
      rannum.then(function (drinkID) {
        const getDrinkFromId = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
          getDrinkFromId
        )
          .then((response) => response.json())
          .then(function (data) {
            //this is a RANDOM DRINK WITH INGREDIENT RUM

            featuredDrinkEl.textContent = "Featured RUM Drink";
            randomDrinkTitleEl.textContent = data.drinks[0].strDrink;

            var drinkIngredients = Object.keys(data.drinks[0])
              .filter((k) => k.startsWith("strIngredient"))
              .map((m) => data.drinks[0][m]);

            var drinkMeasure = Object.keys(data.drinks[0])
              .filter((s) => s.startsWith("strMeasure"))
              .map((f) => data.drinks[0][f]);
            randomDrinkIngredientsEl.innerHTML = " ";
            randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

            for (let i = 0; i < drinkIngredients.length; i++) {
              if (
                drinkIngredients[i] === null ||
                drinkIngredients[i] === null ||
                drinkMeasure[i] === null
              ) {
                break;
              }
              randomDrinkIngredientsEl.innerHTML +=
                " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";
            }
          })
          .catch((err) => console.error(err));
      });
    };
    giveRandomDrinkId();
  } else if (event.target && event.target.innerHTML === "Tequila") {
    console.log("clicked Tequila");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
      },
    };

    var rannum = fetch(
      "https://the-cocktail-db.p.rapidapi.com/filter.php?i=TEQUILA",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        //get random drink from 0-29 (30 drinks found in TEQUILA category)
        var randomDrinkNum = Math.floor(Math.random() * 29);
        // console.log(randomDrinkNum);

        var listOfDrinks = data.drinks;
        // console.log(listOfDrinks);

        // console.log(listOfDrinks[randomDrinkNum].idDrink);

        return listOfDrinks[randomDrinkNum].idDrink;
      })
      .catch((err) => console.error(err));
    var giveRandomDrinkId = function () {
      rannum.then(function (drinkID) {
        const getDrinkFromId = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
          getDrinkFromId
        )
          .then((response) => response.json())
          .then(function (data) {
            //this is a RANDOM DRINK WITH INGREDIENT RUM

            featuredDrinkEl.textContent = "Featured TEQUILA Drink";
            randomDrinkTitleEl.textContent = data.drinks[0].strDrink;

            var drinkIngredients = Object.keys(data.drinks[0])
              .filter((k) => k.startsWith("strIngredient"))
              .map((m) => data.drinks[0][m]);

            var drinkMeasure = Object.keys(data.drinks[0])
              .filter((s) => s.startsWith("strMeasure"))
              .map((f) => data.drinks[0][f]);
            randomDrinkIngredientsEl.innerHTML = " ";
            randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

            for (let i = 0; i < drinkIngredients.length; i++) {
              if (
                drinkIngredients[i] === null ||
                drinkIngredients[i] === null ||
                drinkMeasure[i] === null
              ) {
                break;
              }
              randomDrinkIngredientsEl.innerHTML +=
                " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";
            }
          })
          .catch((err) => console.error(err));
      });
    };
    giveRandomDrinkId();
  } else if (event.target && event.target.innerHTML === "NonAlcoholic") {
    console.log("NO ALCOHOL");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
      },
    };

    var rannum = fetch(
      "https://the-cocktail-db.p.rapidapi.com/filter.php?a=Non alcoholic",
      options
    )
      .then((response) => response.json())
      .then(function (data) {
        console.log(data.drinks);
        // non alcoholic drinks have 58 drinks, get a random drink from all 58
        var randomDrinkNum = Math.floor(Math.random() * 57);
        var listOfDrinks = data.drinks;
        return listOfDrinks[randomDrinkNum].idDrink;
      })
      .catch((err) => console.error(err));

    var giveRandomDrinkId = function () {
      rannum.then(function (drinkID) {
        const getDrinkFromId = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "37f2a9a7cemsh5b611bc49e7a303p1e79e6jsn6b86cc035e5d",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
          getDrinkFromId
        )
          .then((response) => response.json())
          .then(function (data) {
            //this is a RANDOM DRINK WITH INGREDIENT RUM

            featuredDrinkEl.textContent = "Featured TEQUILA Drink";
            randomDrinkTitleEl.textContent = data.drinks[0].strDrink;

            var drinkIngredients = Object.keys(data.drinks[0])
              .filter((k) => k.startsWith("strIngredient"))
              .map((m) => data.drinks[0][m]);

            var drinkMeasure = Object.keys(data.drinks[0])
              .filter((s) => s.startsWith("strMeasure"))
              .map((f) => data.drinks[0][f]);
            randomDrinkIngredientsEl.innerHTML = " ";
            randomDrinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);

            for (let i = 0; i < drinkIngredients.length; i++) {
              if (
                drinkIngredients[i] === null ||
                drinkIngredients[i] === null ||
                drinkMeasure[i] === null
              ) {
                break;
              }
              randomDrinkIngredientsEl.innerHTML +=
                " " + drinkMeasure[i] + " " + drinkIngredients[i] + ", ";
            }
          })
          .catch((err) => console.error(err));
      });
    };
    giveRandomDrinkId();
  }
});
