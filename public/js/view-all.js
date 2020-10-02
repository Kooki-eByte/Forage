$(document).ready(() => {
  let userId;

  function installLi(ingredientsList, foodIdx) {
    for (let i = 0; i < ingredientsList.length; i++) {
      let liTag = `<li>${ingredientsList[i]}  </li>`;
      $("#ingredients-list-" + foodIdx).append(liTag);
    }
  }

  function displayFood() {
    let category = $(this).attr("data-name");
    userId = $(this).attr("data-user");

    // Logic to grab our api information and then display the information into our page
    $.ajax({
      method: "GET",
      url: `/api/meals/${category}?users_id=${userId}`,
    }).then((data) => {
      console.log(data);
      let showFoodDiv = $(".stored-food");
      showFoodDiv.empty();

      for (let i = 0; i < data.length; i++) {
        console.log(i);
        let foodId = data[i].id;
        let name = data[i].name;
        let image = data[i].img;
        let calorie = data[i].calories;
        let serving = data[i].servings;
        let ingredients = data[i].ingredients.split(",");
        let ingredientsList = [];
        // take out any white space and any double quotes inside of the array left from the database
        for (let x = 0; x < ingredients.length; x++) {
          ingredientsList.push(ingredients[x].trim());
        }

        const cardHtml = `
        <div class="col l4 m6 s12">
          <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator food-img-${i}" src=${image}>
              </div>
              <div class="card-content">
                  <span id="food-label-${i}" class="card-title activator grey-text text-darken-4">${name}<i
                          class="material-icons right"></i></span>
                  <button data-deleteBtn=${foodId} data-category=${category} class="waves-effect waves-light btn delete-food-btn">DELETE FOOD</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">Ingredients:<i
                          class="material-icons right">close</i></span>
                  <ul id="ingredients-list-${i}">
                  </ul>
                  <br><span class="card-title grey-text text-darken-4">Servings:</span>
                  <p id="food-serving-${i}">${serving}</p>
                  <br>
                  <br><span class="card-title grey-text text-darken-4">Calories:</span>
                  <p id="food-calorie-${i}">${calorie}</p>
              </div>
          </div>
        </div>`;

        // append into div
        showFoodDiv.append(cardHtml);
        installLi(ingredientsList, i);
      }
    });
  }

  function deleteFood() {
    let foodIdx = $(this).attr("data-deleteBtn");
    let deleteFoodFromCategory = $(this).attr("data-category");

    $.ajax({
      url: `/api/meals/delete/${foodIdx}/${deleteFoodFromCategory}?users_id=${userId}`,
      type: "DELETE",
    }).then((data) => {
      alert(`Your ${deleteFoodFromCategory} has been updated`);
      location.reload();
    });
  }

  $(document).on("click", "#display", displayFood);
  $(document).on("click", ".delete-food-btn", deleteFood);
});
