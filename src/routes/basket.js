import express from "express";
import { selectSql, insertSql } from "../database/sql";

const router = express.Router();

router.post("/insert", async (req, res) => {
  const book = req.body;
  const user = req.session.user;
  const shopping_basket = await selectSql.getShoppingBasketByBasketOf(
    user.Email
  );
  console.log(shopping_basket);
  if (shopping_basket === undefined) {
    const new_shopping_basket = insertSql.addShoppingBasket(user.Email);
    const data = {
      basketCount: parseInt(book.basketCount),
      ISBN: book.ISBN,
      Email: user.Email,
      shopping_basket_id: new_shopping_basket.BasketID,
    };
    await insertSql.addContainsByCustomer(data);
  } else {
    const data = {
      basketCount: parseInt(book.basketCount),
      ISBN: book.ISBN,
      Email: user.Email,
      shopping_basket_id: shopping_basket.BasketID,
    };
    console.log(data);

    await insertSql.addContainsByCustomer(data);
  }

  res.redirect("/basket");
});

module.exports = router;
