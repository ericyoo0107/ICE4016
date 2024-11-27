import express from "express";
import { selectSql, insertSql, updateSql, deleteSql } from "../database/sql";

const router = express.Router();

// Book
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

// Author
router.get("/author", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const authors = await selectSql.getAuthor();
    console.log(authors);
    res.render("adminAuthor", {
      title: "Admin Author",
      authors,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/author/update", async (req, res) => {
  const author = req.body;
  const data = {
    Address: author.Address,
    URL: author.URL,
    Name: author.Name,
  };
  await updateSql.updateAuthor(data);
  res.redirect("/admin/author");
});

router.post("/author/delete", async (req, res) => {
  const Name = req.body.Name;
  await deleteSql.deleteAuthor(Name);
  res.redirect("/admin/author");
});

router.post("/author/add", async (req, res) => {
  const author = req.body;
  const data = {
    Name: author.Name,
    Address: author.Address,
    URL: author.URL,
  };
  await insertSql.addAuthor(data);
  res.redirect("/admin/author");
});

module.exports = router;
