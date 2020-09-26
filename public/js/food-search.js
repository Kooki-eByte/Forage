$(document).ready(function() {
  $("select").formSelect();
  let cardDiv = $(".cards-table");
  // Grabbing the submit button from the food-search

  function savedFood() {
    
    let foodIndex = $(".save-food-btn").index(this);
    let foodCategory = $(this).attr("data-category");

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

    console.log(foodName);
    console.log(ingredientList);
    console.log(imgUrl);
  }

  // $.post("/api/breakfast", {
  //   name: foodName,
  //   img: imgUrl,
  //   ingredients: ingredientList,
  // })
  //   .then(alert("Saved to Breakfast."))

  // $.post("/api/lunch", {
  //   name: foodName,
  //   img: imgUrl,
  //   ingredients: ingredientList,
  // })
  //   .then(alert("Saved to Lunch."))

  // $.post("/api/dinner", {
  //   name: foodName,
  //   img: imgUrl,
  //   ingredients: ingredientList,
  // })
  //   .then(alert("Saved to Dinner."))

  // $.post("/api/snack", {
  //   name: foodName,
  //   img: imgUrl,
  //   ingredients: ingredientList,
  // })
  //   .then(alert("Saved to Snack."))

  // Create a li tag for loop that will create a li tag for each food's ingredients
  function getIngredients(allIngredients, foodIdx) {
    for (let i = 0; i < allIngredients.length; i++) {
      let liTag = `<li>${allIngredients[i]}  </li>`;
      $("#ingredients-list-" + foodIdx).append(liTag);
    }
  }

  $(".search-btn").on("click", (event) => {
    event.preventDefault();
    const apiID = "624148ca";
    const apiKey = "3202b5b475f9db472ee86d78a4d01722";
    let food = $("#food-name").val();

    $.get(
      `https://api.edamam.com/search?q=${food}&app_id=${apiID}&app_key=${apiKey}`
    ).then((data) => {
      // console.log(data.hits);

      // Delete all of the content inside
      cardDiv.empty();

      let foods = data.hits.length;

      for (let i = 0; i < foods; i++) {
        let ingredientsList = [];
        let label = data.hits[i].recipe.label;
        let image = data.hits[i].recipe.image;

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
                  <button data-saveBtn=${i} data-category="0" class="waves-effect waves-light btn save-food-btn" >Save to Breakfast</button>
                  <button data-saveBtn=${i} data-category="1" class="waves-effect waves-light btn save-food-btn" >Save to Lunch</button>
                  <button data-saveBtn=${i} data-category="2" class="waves-effect waves-light btn save-food-btn" >Save to Dinner</button>
                  <button data-saveBtn=${i} data-category="3" class="waves-effect waves-light btn save-food-btn" >Save to Snack</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Ingredients<i
                          class="material-icons right">close</i></span>
                  <ul id="ingredients-list-${i}">
                  </ul>
              </div>
          </div>
        </div>`;

        cardDiv.append(cardHtml);
        // console.log(ingredientsList);
        getIngredients(ingredientsList, i);
      }
    });
  });
  $(document).on("click", ".save-food-btn", savedFood);
});
