// Edit Hero

function editHero(id) {
  $.ajax({
    url: API + "/getone/" + id,
    method: "GET",
    success: function (hero) {
      $("#u-title").val(hero.title);
      $("#u-fname").val(hero.firstname);
      $("#u-lname").val(hero.lastname);
      $("#u-email").val(hero.email);
      $("#u-city").val(hero.city);
      $("#heroId").val(hero._id);

      $("#add-hero").hide();
      $("#update-form").show();
      $("#back-btn").show();
      $("#update-form")[0].scrollIntoView({ behavior: "smooth" });
    },
    error: function (err) {
      console.log("Error:", err);
    },
  });
}

// =======================
// Update Hero
// =======================
function updateHero() {
  var id = $("#heroId").val();
  var data = {
    title: $("#u-title").val().trim(),
    firstname: $("#u-fname").val().trim(),
    lastname: $("#u-lname").val().trim(),
    email: $("#u-email").val().trim(),
    city: $("#u-city").val().trim(),
  };

  if (Object.values(data).every(Boolean)) {
    $.ajax({
      url: API + "/update/" + id,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (res) {
        console.log("Updated:", res);
        showAlert("Hero Updated Successfully! ✏️", "success");
        cancelUpdate();
        render();
      },
      error: function (err) {
        console.log("Error:", err);
        showAlert("Something went wrong!", "error");
      },
    });
  } else {
    showAlert("Please fill all fields!", "error");
  }
}

// Cancel Update

function cancelUpdate() {
  $("#u-title, #u-fname, #u-lname, #u-email, #u-city, #heroId").val("");
  $("#update-form").hide();
  $("#add-hero").show();
  $("#back-btn").hide();
  $("#add-hero")[0].scrollIntoView({ behavior: "smooth" });
}
