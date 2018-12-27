const routes = require("next-routes");

module.exports = routes()
  .add("login")
  .add("register")
  .add("perfil", "/perfil/:id")
  .add("edit", "/perfil/:id/edit")
  .add("configuration")
  .add("documentation")
  .add("about");
