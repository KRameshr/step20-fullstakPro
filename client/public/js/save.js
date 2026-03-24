// Save Hero

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
      url: API + "/save",
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      success: function (res) {
        console.log("Saved:", res);
        showAlert("Hero Saved Successfully!", "success");
        clearForm();
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

// Clear Form

function clearForm() {
  $("#title, #fname, #lname, #email, #city").val("");
}
