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
};

export const updateSql = {
  updateBook: async (book) => {
    const sql = `update book set Title = ?, Category = ?, Writen_by = ?, Year = ?, Price = ? where ISBN = ?`;
    const [result] = await promisePool.query(sql, [
      book.Title,
      book.Category,
      book.Writen_by,
      book.Year,
      book.Price,
      book.ISBN,
    ]);
    return result;
  },
};

export const deleteSql = {
  deleteBook: async (ISBN) => {
    const sql = `delete from book where ISBN = ?`;
    const [result] = await promisePool.query(sql, [ISBN]);
    return result;
  },
};
