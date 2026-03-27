function saveHero() {
  const data = {
    title: $("#title").val().trim(),
    firstname: $("#fname").val().trim(),
    lastname: $("#lname").val().trim(),
    email: $("#email").val().trim(),
    city: $("#city").val().trim(),
  };

  if (Object.values(data).every(Boolean)) {
    $.ajax({
      url: API + "/heroes/save", // ✅ updated
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      success: function (res) {
        showAlert("Hero Saved Successfully! ✅", "success");
        clearForm();
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

function clearForm() {
  $("#title, #fname, #lname, #email, #city").val("");
}
