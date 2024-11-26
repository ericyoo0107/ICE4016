import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const vars = req.body;
  const users = await selectSql.getUser();

  users.map((users) => {
    if (vars.Email === users.Email && vars.password === users.Password) {
      console.log("login success!");
      req.session.user = {
        Email: users.Email,
        role: users.Role,
        checkLogin: true,
      };
    }
  });

  if (req.session.user == undefined) {
    console.log("login failed!");
    res.send(`<script>
                    alert('login failed!');
                    location.href='/';
                </script>`);
  } else if (req.session.user.checkLogin && req.session.user.role === "admin") {
    res.redirect("/admin/book");
  } else if (
    req.session.user.checkLogin &&
    req.session.user.role === "customer"
  ) {
    res.redirect("/search");
  }
});

module.exports = router;
