// Delete Hero

function deleteHero(id) {
  if (confirm("Are you sure you want to delete?")) {
    $.ajax({
      url: API + "/delete/" + id,
      method: "DELETE",
      success: function (res) {
        console.log("Deleted:", res);
        showAlert("Hero Deleted Successfully!", "success");
        render();
      },
      error: function (err) {
        console.log("Error:", err);
        showAlert("Something went wrong!", "error");
      },
    });
  }
}

// Document Ready

$(document).ready(function () {
  render();

  // Mobile Menu Toggle
  $("#menuToggle").click(function () {
    $("#navLinks").toggleClass("active");
  });

  $("#navLinks a").click(function () {
    $("#navLinks").removeClass("active");
  });

  // Event Delegation
  $("#herogrid").on("click", ".edit-btn", function () {
    editHero($(this).data("id"));
  });

  $("#herogrid").on("click", ".delete-btn", function () {
    deleteHero($(this).data("id"));
  });

  // Smooth scroll
  $("a[href^='#']").on("click", function (e) {
    e.preventDefault();
    const target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top - 10 }, 500);
    }
  });
});
