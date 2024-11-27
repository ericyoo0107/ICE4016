import express from "express";
import { selectSql, insertSql, updateSql, deleteSql } from "../database/sql";

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
    Writen_by: book.Writen_by,
    Year: book.Year,
    Price: book.Price,
  };
  await updateSql.updateBook(data);
  res.redirect("/admin/book");
});

router.post("/book/delete", async (req, res) => {
  const ISBN = req.body.ISBN;
  await deleteSql.deleteBook(ISBN);
  res.redirect("/admin/book");
});

router.post("/book/add", async (req, res) => {
  const book = req.body;
  const data = {
    ISBN: book.ISBN,
    Title: book.Title,
    Category: book.Category,
    Writen_by: book.Writen_by,
    Year: book.Year,
    Price: book.Price,
  };
  await insertSql.addBook(data);
  res.redirect("/admin/book");
});

module.exports = router;
