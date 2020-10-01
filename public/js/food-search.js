$(document).ready(function() {
  $("select").formSelect();
  let cardDiv = $(".cards-table");
  // Grabbing the submit button from the food-search

  function savedFood() {
    let foodIndex = $(this).attr("data-saveBtn");
    let foodCategory = $(this).attr("data-name");

    // Hold the name of the specific foods name
    let foodName = $("#food-label-" + foodIndex)
      .text()
      .trim();

    // Hold the names of the specific foods ingredients
    let ingredientNames = $("#ingredients-list-" + foodIndex)
      .text()
      .trim()
      .split("  ");

    let ingredientList = JSON.stringify(ingredientNames);

    // Hold the url of the specific foods image
    let imgUrl = $(".food-img-" + foodIndex).attr("src");

    let servingsize = $("#food-serving-" + foodIndex).text();

    let caloriecount = $("#food-calorie-" + foodIndex).text();

    $.post("/api/" + foodCategory, {
      name: foodName,
      img: imgUrl,
      ingredients: ingredientList.slice(1, -1),
      servings: servingsize,
      calories: caloriecount,
    }).then(alert("Saved to " + foodCategory + "."));
  }

  // Create a li tag for loop that will create a li tag for each food's ingredients
  function getIngredients(allIngredients, foodIdx) {
    for (let i = 0; i < allIngredients.length; i++) {
      let liTag = `<li>${allIngredients[i]}  </li>`;
      $("#ingredients-list-" + foodIdx).append(liTag);
    }
  }

  $(".search-btn").on("click", (event) => {
    event.preventDefault();
    let userSearch = {
      food: $("#food-name").val(),
      dietOption: $(".diet-option").val(),
    };

    // `https://api.edamam.com/search?q=${food}&app_id=${apiID}&app_key=${apiKey}`
    $.ajax({
      method: "GET",
      url: "/api/food/" + userSearch.food + "/" + userSearch.dietOption,
    })
      .then((data) => {
        // console.log(data.hits);

        // Delete all of the content inside
        cardDiv.empty();

        let foods = data.hits.length;

        for (let i = 0; i < foods; i++) {
          let ingredientsList = [];
          let label = data.hits[i].recipe.label;
          let image = data.hits[i].recipe.image;
          let calorie = data.hits[i].recipe.calories;
          let calorieTotal = Math.round(calorie);
          let servings = data.hits[i].recipe.yield;

          let ingredientsLength = data.hits[i].recipe.ingredients.length;

          for (let idx = 0; idx < ingredientsLength; idx++) {
            let ingrText = data.hits[i].recipe.ingredients[idx].text;
            ingredientsList.push(ingrText);
          }

          const cardHtml = `
        <div class="col l4 m6 s12">
          <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator food-img-${i}" src=${image}>
              </div>
              <div class="card-content">
                  <span id="food-label-${i}" class="card-title activator grey-text text-darken-4">${label}<i
                          class="material-icons right"></i></span>
                  <button data-saveBtn=${i} data-name="breakfast" class="waves-effect waves-light btn save-food-btn" >Save to Breakfast</button>
                  <button data-saveBtn=${i} data-name="lunch" class="waves-effect waves-light btn save-food-btn" >Save to Lunch</button>
                  <button data-saveBtn=${i} data-name="dinner" class="waves-effect waves-light btn save-food-btn" >Save to Dinner</button>
                  <button data-saveBtn=${i} data-name="snack" class="waves-effect waves-light btn save-food-btn" >Save to Snack</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Ingredients:<i
                          class="material-icons right">close</i></span>
                  <ul id="ingredients-list-${i}">
                  </ul>
                  <br><span class="card-title grey-text text-darken-4">Servings:</span>
                  <p id="food-serving-${i}">${servings}</p>
                  <br>
                  <br><span class="card-title grey-text text-darken-4">Calories:</span>
                  <p id="food-calorie-${i}">${calorieTotal}</p>
              </div>
          </div>
        </div>`;

          cardDiv.append(cardHtml);
          // console.log(ingredientsList);
          getIngredients(ingredientsList, i);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  $(document).on("click", ".save-food-btn", savedFood);
});
