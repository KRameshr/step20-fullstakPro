function deleteHero(id) {
  if (confirm("Are you sure you want to delete?")) {
    $.ajax({
      url: API + "/heroes/delete/" + id, // ✅ updated
      method: "DELETE",
      success: function () {
        showAlert("Hero Deleted Successfully! 🗑️", "success");
        render();
      },
      error: function () {
        showAlert("Something went wrong! ❌", "error");
      },
    });
  }
}

$(document).ready(function () {
  render();

  $("#menuToggle").click(function () {
    $("#navLinks").toggleClass("active");
  });

  $("#navLinks a").click(function () {
    $("#navLinks").removeClass("active");
  });

  $("#herogrid").on("click", ".edit-btn", function () {
    editHero($(this).data("id"));
  });

  $("#herogrid").on("click", ".delete-btn", function () {
    deleteHero($(this).data("id"));
  });
});
