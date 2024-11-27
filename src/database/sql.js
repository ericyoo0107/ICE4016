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
};
