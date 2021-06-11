const services = require("./controller");
const init = (router) => {
  router.post("/addUser", services.post);
  router.get("/getUsers", services.getAll);

  return router;
};
module.exports = init;
