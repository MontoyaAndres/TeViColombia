const routes = require("next-routes");

module.exports = routes()
  .add({ name: "login" })
  .add({ name: "register" })
  .add({ name: "perfil", pattern: "/perfil/:id", page: "perfil" })
  .add({ name: "edit", pattern: "/perfil/:id/edit", page: "edit" })
  .add({ name: "configuration" })
  .add({ name: "documentation" })
  .add({ name: "about" });
