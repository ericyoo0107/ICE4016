import e from "express";
import mysql from "mysql2";

require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dbwnsgur",
  database: "termproject",
});

const promisePool = pool.promise();

export const selectSql = {
  getUser: async () => {
    const sql = `select * from user`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getBook: async () => {
    const sql = `select * from book`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAuthor: async () => {
    const sql = `select * from author`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getAward: async () => {
    const sql = `select * from award`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getWarehouse: async () => {
    const sql = `select * from warehouse`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getInventory: async () => {
    const sql = `select * from inventory`;
    const [result] = await promisePool.query(sql);
    return result;
  },
  getContains: async () => {
    const sql = `select * from contains`;
    const [result] = await promisePool.query(sql);
    return result;
  },
};

export const insertSql = {
  addBook: async (book) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into book (ISBN, Title, Category, Writen_by, Year, Price) values (?, ?, ?, ?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          book.ISBN,
          book.Title,
          book.Category,
          book.Writen_by,
          book.Year,
          book.Price,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  addAuthor: async (author) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into author (Name, Address, URL) values (?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          author.Name,
          author.Address,
          author.URL,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  addAward: async (award) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into award (ID, Name, Year, Received_by, Awarded_to) values (?, ?, ?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          award.ID,
          award.Name,
          award.Year,
          award.Received_by,
          award.Awarded_to,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  addWarehouse: async (warehouse) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into warehouse (Code, Phone, Address) values (?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          warehouse.Code,
          warehouse.Phone,
          warehouse.Address,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  addInventory: async (inventory) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into inventory (Number, Book_ISBN, Warehouse_Code) values (?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          inventory.Number,
          inventory.Book_ISBN,
          inventory.Warehouse_Code,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  addContains: async (contains) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `insert into contains (Number, Book_ISBN, BasketID) values (?, ?, ?)`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          contains.Number,
          contains.Book_ISBN,
          contains.BasketID,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
};

export const updateSql = {
  updateBook: async (book) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM book WHERE ISBN = ? FOR UPDATE`;
    await conn.query(lockSql, [book.ISBN]);
    const sql = `update book set Title = ?, Category = ?, Writen_by = ?, Year = ?, Price = ? where ISBN = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          book.Title,
          book.Category,
          book.Writen_by,
          book.Year,
          book.Price,
          book.ISBN,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  updateAuthor: async (author) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM author WHERE Name = ? FOR UPDATE`;
    await conn.query(lockSql, [author.Name]);
    const sql = `update author set Address = ?, URL = ? where Name = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          author.Address,
          author.URL,
          author.Name,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  updateAward: async (award) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM award WHERE ID = ? FOR UPDATE`;
    await conn.query(lockSql, [award.ID]);
    const sql = `update award set Name = ?, Year = ?, Received_by = ?, Awarded_to = ? where ID = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          award.Name,
          award.Year,
          award.Received_by,
          award.Awarded_to,
          award.ID,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  updateWarehouse: async (warehouse) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM warehouse WHERE Code = ? FOR UPDATE`;
    await conn.query(lockSql, [warehouse.Code]);
    const sql = `update warehouse set Phone = ?, Address = ? where Code = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          warehouse.Phone,
          warehouse.Address,
          warehouse.Code,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  updateInventory: async (inventory) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM inventory WHERE Book_ISBN = ? AND Warehouse_Code = ? FOR UPDATE`;
    await conn.query(lockSql, [inventory.Book_ISBN, inventory.Warehouse_Code]);
    const sql = `update inventory set Number = ? where Book_ISBN = ? AND Warehouse_Code = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          inventory.Number,
          inventory.Book_ISBN,
          inventory.Warehouse_Code,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  updateContains: async (contains) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const lockSql = `SELECT * FROM contains WHERE Book_ISBN = ? AND BasketID = ? FOR UPDATE`;
    await conn.query(lockSql, [contains.Book_ISBN, contains.BasketID]);
    const sql = `update contains set Number = ? where Book_ISBN = ? AND BasketID = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          contains.Number,
          contains.Book_ISBN,
          contains.BasketID,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
};

export const deleteSql = {
  deleteBook: async (ISBN) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from book where ISBN = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [ISBN]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  deleteAuthor: async (Name) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from author where Name = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [Name]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  deleteAward: async (ID) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from award where ID = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [ID]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  deleteWarehouse: async (Code) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from warehouse where Code = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [Code]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  deleteInventory: async (data) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from inventory where Book_ISBN = ? AND Warehouse_Code = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [
          data.Book_ISBN,
          data.Warehouse_Code,
        ]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
  deleteContains: async (data) => {
    const conn = await promisePool.getConnection();
    await conn.beginTransaction();
    const sql = `delete from contains where Book_ISBN = ? AND BasketID = ?`;
    if (conn) {
      try {
        const [result] = await conn.query(sql, [data.Book_ISBN, data.BasketID]);
        conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
      } finally {
        conn.release();
      }
    }
  },
};

export const searchSql = {
  searchBook: async (Name) => {
    if (Name === undefined) {
      const sql =
        `SELECT B.ISBN, B.Title, B.Category, B.Writen_by, B.Year, B.Price, A.Name, A.Year ` +
        `FROM award A ` +
        `JOIN book B ON B.ISBN = A.Awarded_to ` +
        `JOIN author AU ON AU.Name = A.Received_by`;
      const [result] = await promisePool.query(sql);
      return result;
    } else {
      const sql =
        `SELECT B.ISBN, B.Title, B.Category, B.Writen_by, B.Year, B.Price, A.Name, A.Year ` +
        `FROM award A ` +
        `JOIN book B ON B.ISBN = A.Awarded_to ` +
        `JOIN author AU ON AU.Name = A.Received_by ` +
        `WHERE A.Name LIKE ? OR B.Title Like ? OR AU.Name Like ?`;
      const [result] = await promisePool.query(sql, [
        `%${Name}%`,
        `%${Name}%`,
        `%${Name}%`,
      ]);
      return result;
    }
  },
};
