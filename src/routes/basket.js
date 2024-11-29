import express from "express";
import { selectSql, insertSql, updateSql, aggregateSql } from "../database/sql";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  const shopping_basket = await selectSql.getShoppingBasketByBasketOf(
    user.Email
  );
  if (shopping_basket === undefined) {
    res.send(`<script>
            alert('장바구니가 비었습니다.');
            location.href='/';
        </script>`);
  } else {
    const contains = await selectSql.getContainsByShoppingBasketID(
      shopping_basket.BasketID
    );
    res.render("basket", {
      user: user,
      contains: contains,
      Orderdate:
        shopping_basket.Order_date === undefined
          ? "아직 구매전"
          : shopping_basket.Order_date,
    });
  }
});

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

router.post("/buy", async (req, res) => {
  const queryString = req.body;
  const params = new URLSearchParams(queryString);
  let contains = [];
  const isbnString = params.getAll("ISBN"); // ISBN 값 배열
  const numberString = params.getAll("Number"); // Number 값 배열
  const basketIdString = params.getAll("BasketID"); // BasketID 값 배열
  const isbnArray = isbnString[0].split(",");
  const numberArray = numberString[0].split(",");
  const basketIdArray = basketIdString[0].split(",");
  // 각 리스트에서 값을 하나씩 묶어 객체로 만들고 배열에 추가
  for (let i = 0; i < isbnArray.length; i++) {
    contains.push({
      ISBN: isbnArray[i],
      Number: numberArray[i], // Number는 숫자로 변환
      BasketID: basketIdArray[i], // BasketID도 숫자로 변환
    });
  }
  for (let i = 0; i < isbnArray.length; i++) {
    const inventoryCount = await aggregateSql.countBookByISBN(contains[i].ISBN);
    if (parseInt(inventoryCount.Number) < parseInt(contains[i].Number)) {
      res.send(`<script>
              alert('재고가 부족합니다.');
              location.href='/basket';
          </script>`);
      return;
    }
  }
  await updateSql.updateInventoryByPurchase(contains);
  res.redirect("/basket");
});

module.exports = router;
