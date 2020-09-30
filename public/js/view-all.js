$(document).ready(() => {
  function displayFood() {
    let category = $(this).data("name");
    let userId = $(this).data("user");
    $.get(`/api/meals/${category}?users_id=${userId}`, function(data) {
        // GONNA HAVE TO DO IT LIKE I DID BEFORE BY MAKING FOR LOOPS AND ASSIGNING THE SPECIFIC DATA TO THE CARDS . CANT DO A #EACH BECAUSE THE RES.RENDER WILL NOT WORK BECAUSE IT GRABBING WEIRD DATA. ALSO THE ROUTE WILL STAY THAT WEIRD API ROUTE SO IT WILL HAVE THE PAGE LOOK WEIRD
      console.log(data);
    });
  }

  $(document).on("click", "#display", displayFood);
});
