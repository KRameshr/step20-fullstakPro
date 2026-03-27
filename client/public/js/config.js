let API = "";

$.ajax({
  url: "/config",
  method: "GET",
  async: false,
  success: function (res) {
    API = res.API;
    console.log("✅ API URL:", API);
  },
  error: function () {
    API = "http://localhost:3000";
    console.log("⚠️ Using fallback API");
  },
});
