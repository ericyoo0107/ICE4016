import express from "express";
import { selectSql, updateSql, deleteSql } from "../database/sql";

const router = express.Router();

router.get("/book", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const books = await selectSql.getBook();
    console.log(books);
    res.render("adminBook", {
      title: "Admin Book",
      books,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/book/update", async (req, res) => {
  const book = req.body;
  const data = {
    ISBN: book.ISBN,
    Title: book.Title,
    Category: book.Category,
    Writen_By: book.Writen_By,
    Year: book.Year,
    Price: book.Price,
  };
  await updateSql.updateBook(data);
  res.redirect("/book");
});

router.delete("/book/delete", async (req, res) => {
  const ISBN = req.body.ISBN;
  await deleteSql.deleteBook(ISBN);
  res.redirect("/book");
});

module.exports = router;
