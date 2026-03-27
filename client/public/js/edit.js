function editHero(id) {
  $.ajax({
    url: API + "/heroes/getone/" + id, // ✅ updated
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
    error: function () {
      showAlert("Something went wrong! ❌", "error");
    },
  });
}

function updateHero() {
  const id = $("#heroId").val();
  const data = {
    title: $("#u-title").val().trim(),
    firstname: $("#u-fname").val().trim(),
    lastname: $("#u-lname").val().trim(),
    email: $("#u-email").val().trim(),
    city: $("#u-city").val().trim(),
  };

  if (Object.values(data).every(Boolean)) {
    $.ajax({
      url: API + "/heroes/update/" + id, // updated
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function () {
        showAlert("Hero Updated Successfully!", "success");
        cancelUpdate();
        render();
      },
      error: function () {
        showAlert("Something went wrong! ❌", "error");
      },
    });
  } else {
    showAlert("Please fill all fields! ⚠️", "error");
  }
}

function cancelUpdate() {
  $("#u-title, #u-fname, #u-lname, #u-email, #u-city, #heroId").val("");
  $("#update-form").hide();
  $("#add-hero").show();
  $("#back-btn").hide();
  $("#add-hero")[0].scrollIntoView({ behavior: "smooth" });
}
