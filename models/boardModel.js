const db = require('./db');

module.exports = {
  getList: async (offset, limit, search) => {
    if (search) {
      return db.query(
        "SELECT * FROM board WHERE title LIKE ? ORDER BY id DESC LIMIT ?, ?",
        [`%${search}%`, offset, limit]
      );
    }
    return db.query(
      "SELECT * FROM board ORDER BY id DESC LIMIT ?, ?",
      [offset, limit]
    );
  },

  getCount: async (search) => {
    if (search) {
      return db.query(
        "SELECT COUNT(*) as cnt FROM board WHERE title LIKE ?",
        [`%${search}%`]
      );
    }
    return db.query("SELECT COUNT(*) as cnt FROM board");
  },

  getView: async (id) =>
    db.query("SELECT * FROM board WHERE id = ?", [id]),

  increaseHit: async (id) =>
    db.query("UPDATE board SET hit = hit + 1 WHERE id = ?", [id]),

  write: async (title, content, writer) =>
    db.query(
      "INSERT INTO board (title, content, writer) VALUES (?, ?, ?)",
      [title, content, writer]
    ),

  edit: async (id, title, content) =>
    db.query(
      "UPDATE board SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    ),

  delete: async (id) =>
    db.query("DELETE FROM board WHERE id = ?", [id]),
};
