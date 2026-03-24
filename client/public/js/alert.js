// Alert Box

function showAlert(message, type) {
  $("#alert-box").css(
    "background-color",
    type === "success" ? "#4CAF50" : "#f44336",
  );
  $("#alert-msg").text(message);
  $("#alert-box").fadeIn();
  setTimeout(function () {
    $("#alert-box").fadeOut();
  }, 3000);
}

function closeAlert() {
  $("#alert-box").fadeOut();
}
