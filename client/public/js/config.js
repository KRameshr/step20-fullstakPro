// =======================
// Get API URL from server
// =======================
let API = "";

$.ajax({
  url: "/config",
  method: "GET",
  async: false, // ✅ Wait until API is loaded
  success: function (res) {
    API = res.API;
    console.log("✅ API URL:", API);
  },
  error: function () {
    API = "http://localhost:3000"; // ✅ Fallback
    console.log("⚠️ Using fallback API");
  },
});
