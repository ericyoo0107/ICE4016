import express from "express";
import { searchSql } from "../database/sql";

const router = express.Router();

// search
router.get("/search", async (req, res) => {
  if (
    req.session.user.role === "admin" ||
    req.session.user.role === "customer"
  ) {
    const result = await searchSql.searchBook(req.query.Name);
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
