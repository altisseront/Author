const AuthorController = require("../controllers/author.controller");

module.exports = app => {
  app.get("/api", AuthorController.hello)
  app.get("/api/authors/", AuthorController.findAllAuthors);
  app.get("/api/authors/:id", AuthorController.findOneSingleAuthor);
  app.put("/api/authors/:id", AuthorController.updateExistingAuthor);
  app.post("/api/authors", AuthorController.createNewAuthor);
  app.delete("/api/authors/:id", AuthorController.deleteAnExistingAuthor);
};