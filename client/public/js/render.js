function render() {
  $.ajax({
    url: API + "/heroes/data", // ✅ updated route
    method: "GET",
    success: function (res) {
      $("#herogrid").html("");
      res.forEach(function (hero, index) {
        $("#herogrid").append(`
          <tr>
            <td>${index + 1}</td>
            <td>${hero.title}</td>
            <td>${hero.firstname}</td>
            <td>${hero.lastname}</td>
            <td>${hero.email}</td>
            <td>${hero.city}</td>
            <td><button class="edit-btn" data-id="${hero._id}">Edit</button></td>
            <td><button class="delete-btn" data-id="${hero._id}">Delete</button></td>
          </tr>
        `);
      });
    },
    error: function (err) {
      console.log("Error:", err);
    },
  });
}
