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

// Award
router.get("/award", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const awards = await selectSql.getAward();
    console.log(awards);
    res.render("adminAward", {
      title: "Admin Award",
      awards: awards,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/award/update", async (req, res) => {
  const award = req.body;
  const data = {
    Name: award.Name,
    Year: award.Year,
    Received_by: award.Received_by,
    Awarded_to: award.Awarded_to,
    ID: award.ID,
  };
  await updateSql.updateAward(data);
  res.redirect("/admin/award");
});

router.post("/award/delete", async (req, res) => {
  const ID = req.body.ID;
  await deleteSql.deleteAward(ID);
  res.redirect("/admin/award");
});

router.post("/award/add", async (req, res) => {
  const award = req.body;
  const data = {
    ID: award.ID,
    Name: award.Name,
    Year: award.Year,
    Received_by: award.Received_by,
    Awarded_to: award.Awarded_to,
  };
  await insertSql.addAward(data);
  res.redirect("/admin/award");
});

// Warehouse
router.get("/warehouse", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const warehouses = await selectSql.getWarehouse();
    console.log(warehouses);
    res.render("adminWarehouse", {
      title: "Admin Warehouse",
      warehouses: warehouses,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/warehouse/update", async (req, res) => {
  const warehouse = req.body;
  await updateSql.updateWarehouse(warehouse);
  res.redirect("/admin/warehouse");
});

router.post("/warehouse/delete", async (req, res) => {
  const Code = req.body.Code;
  await deleteSql.deleteWarehouse(Code);
  res.redirect("/admin/warehouse");
});

router.post("/warehouse/add", async (req, res) => {
  const warehouse = req.body;
  const data = {
    Code: warehouse.Code,
    Phone: warehouse.Phone,
    Address: warehouse.Address,
  };
  await insertSql.addWarehouse(data);
  res.redirect("/admin/warehouse");
});

// Inventory
router.get("/inventory", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const inventorys = await selectSql.getInventory();
    console.log(inventorys);
    res.render("adminInventory", {
      title: "Admin Inventory",
      inventorys: inventorys,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/inventory/update", async (req, res) => {
  const inventory = req.body;
  const data = {
    Number: inventory.Number,
    Book_ISBN: inventory.Book_ISBN,
    Warehouse_Code: inventory.Warehouse_Code,
  };
  await updateSql.updateInventory(data);
  res.redirect("/admin/inventory");
});

router.post("/inventory/delete", async (req, res) => {
  const inventory = req.body;
  const data = {
    Book_ISBN: inventory.Book_ISBN,
    Warehouse_Code: inventory.Warehouse_Code,
  };
  await deleteSql.deleteInventory(data);
  res.redirect("/admin/inventory");
});

router.post("/inventory/add", async (req, res) => {
  const inventory = req.body;
  const data = {
    Number: inventory.Number,
    Book_ISBN: inventory.Book_ISBN,
    Warehouse_Code: inventory.Warehouse_Code,
  };
  await insertSql.addInventory(data);
  res.redirect("/admin/inventory");
});

// Contains
router.get("/contains", async (req, res) => {
  if (req.session.user == undefined || req.session.user.role === "customer") {
    res.redirect("/");
  } else if (req.session.user.role === "admin") {
    const containss = await selectSql.getContains();
    console.log(containss);
    res.render("adminContains", {
      title: "Admin Contains",
      containss: containss,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/contains/update", async (req, res) => {
  const contains = req.body;
  const data = {
    Number: contains.Number,
    Book_ISBN: contains.Book_ISBN,
    BasketID: contains.BasketID,
  };
  await updateSql.updateContains(data);
  res.redirect("/admin/contains");
});

router.post("/contains/delete", async (req, res) => {
  const contains = req.body;
  const data = {
    Book_ISBN: contains.Book_ISBN,
    BasketID: contains.BasketID,
  };
  await deleteSql.deleteContains(data);
  res.redirect("/admin/contains");
});

router.post("/contains/add", async (req, res) => {
  const inventory = req.body;
  const data = {
    Number: inventory.Number,
    Book_ISBN: inventory.Book_ISBN,
    BasketID: inventory.BasketID,
  };
  await insertSql.addContains(data);
  res.redirect("/admin/contains");
});

module.exports = router;
