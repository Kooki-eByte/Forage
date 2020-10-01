$(document).ready(() => {
  let myChart = $("#myChart");
  let usersId = $(".member-name").attr("data-id");

  // [breakfast, lunch, dinner, snack]
  let allFoodsLength = [];

  // get the length per meal
  // We have functions to control the flow of the get methods since we need the array to be in a specific order of ints
  function getBreakfast() {
    // breakfast
    $.ajax({
      method: "GET",
      url: `/api/meals/breakfast?users_id=${usersId}`,
    }).then((data) => {
      let breakfastLength = data.length;
      allFoodsLength.push(breakfastLength);
      getLunch();
    });
  }

  function getLunch() {
    // lunch
    $.ajax({
      method: "GET",
      url: `/api/meals/lunch?users_id=${usersId}`,
    }).then((data) => {
      let lunchLength = data.length;
      allFoodsLength.push(lunchLength);
      getDinner();
    });
  }

  function getDinner() {
    // dinner
    $.ajax({
      method: "GET",
      url: `/api/meals/dinner?users_id=${usersId}`,
    }).then((data) => {
      let dinnerLength = data.length;
      allFoodsLength.push(dinnerLength);
      getSnack();
    });
  }

  function getSnack() {
    // snack
    $.ajax({
      method: "GET",
      url: `/api/meals/snack?users_id=${usersId}`,
    }).then((data) => {
      let snackLength = data.length;
      allFoodsLength.push(snackLength);
      displayChart();
    });
  }

  function displayChart() {
    let donutChart = new Chart(myChart, {
      type: "doughnut",
      data: {
        labels: ["Breakfast", "Lunch", "Dinner", "Snack"],
        datasets: [
          {
            data: allFoodsLength,
            backgroundColor: [
              "rgba(54, 162, 235, 0.75)",
              "rgba(255, 206, 86, 0.75)",
              "rgba(75, 192, 192, 0.75)",
              "rgba(153, 102, 255, 0.75)",
            ],
          },
        ],
      },
      options: {},
    });
  }

  getBreakfast();
});
