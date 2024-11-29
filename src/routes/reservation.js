import express from "express";
import { insertSql, selectSql, updateSql, deleteSql } from "../database/sql";

const router = express.Router();

router.post("/insert", async (req, res) => {
  const body = req.body;
  const user = req.session.user;
  console.log(JSON.stringify(body, null, 2));
  if (body.count === "0") {
    res.send(`<script>
            alert('재고가 없습니다.');
            location.href='/search';
        </script>`);
    return;
  }
  const data = {
    Pickup_time: body.Pickup_time,
    Customer_email: user.Email,
    ISBN: body.ISBN,
  };
  await insertSql.addReservation(data);
  res.redirect("/reservation");
});

router.get("/", async (req, res) => {
  if (req.session.user == undefined) {
    res.redirect("/");
  } else if (
    req.session.user.role === "admin" ||
    req.session.user.role === "customer"
  ) {
    const reservations = await selectSql.getMyReservation(
      req.session.user.Email
    );
    console.log(JSON.stringify(reservations, null, 2));
    res.render("reservation", {
      title: "Customer reservations",
      reservations: reservations,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/modify", async (req, res) => {
  if (req.session.user == undefined) {
    res.redirect("/");
  } else if (
    req.session.user.role === "admin" ||
    req.session.user.role === "customer"
  ) {
    const body = req.body;
    const data = {
      ISBN: body.ISBN,
      Email: req.session.user.Email,
      Pickup_time: body.Pickup_time,
    };
    await updateSql.updateReservation(data);
    res.redirect("/reservation");
  } else {
    res.redirect("/");
  }
});

router.post("/delete", async (req, res) => {
  if (req.session.user == undefined) {
    res.redirect("/");
  } else if (
    req.session.user.role === "admin" ||
    req.session.user.role === "customer"
  ) {
    const body = req.body;
    const data = {
      ISBN: body.ISBN,
      Email: req.session.user.Email,
    };
    await deleteSql.deleteReservation(data);
    res.redirect("/reservation");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
