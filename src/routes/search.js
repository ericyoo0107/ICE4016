import express from "express";
import { searchSql, aggregateSql } from "../database/sql";

const router = express.Router();

// search
router.get("/search", async (req, res) => {
  if (
    req.session.user.role === "admin" ||
    req.session.user.role === "customer"
  ) {
    const books = await searchSql.searchBook(req.query.Name);
    const count = await aggregateSql.countBook();
    // Mapping
    const result = books.map((book) => {
      const bookCount = count.find((c) => c.Book_ISBN === book.ISBN);
      return {
        ...book,
        count: bookCount ? bookCount.Number : 0,
      };
    });
    console.log(result);
    res.render("search", {
      title: "search",
      result,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
