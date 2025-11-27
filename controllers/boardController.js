//핵심 기능 처리 
// 목록, 보기, 글쓰기, 수정,삭제
const boardModel = require('../models/boardModel');

exports.list = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let search = req.query.search || '';
    let limit = 10;
    let offset = (page - 1) * limit;

    const [rows] = await boardModel.getList(offset, limit, search);
    const [[{ cnt }]] = await boardModel.getCount(search);

    res.render('list', { rows, page, total: cnt, search });
  } catch (e) {
    console.error(e);
    res.send("Error while loading list");
  }
};

exports.view = async (req, res) => {
  try {
    const id = req.params.id;

    await boardModel.increaseHit(id);
    const [[row]] = await boardModel.getView(id);

    res.render('view', { row });
  } catch (e) {
    console.error(e);
    res.send("Error while loading view");
  }
};

exports.writeForm = (req, res) => {
  res.render('write');
};

exports.write = async (req, res) => {
  try {
    const { title, content, writer } = req.body;
    await boardModel.write(title, content, writer);
    res.redirect('/board');
  } catch (e) {
    console.error(e);
    res.send("Error while writing");
  }
};

exports.editForm = async (req, res) => {
  try {
    const id = req.params.id;
    const [[row]] = await boardModel.getView(id);
    res.render('edit', { row });
  } catch (e) {
    console.error(e);
    res.send("Error while loading edit form");
  }
};

exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    await boardModel.edit(id, title, content);
    res.redirect(`/board/view/${id}`);
  } catch (e) {
    console.error(e);
    res.send("Error while editing");
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await boardModel.delete(id);
    res.redirect('/board');
  } catch (e) {
    console.error(e);
    res.send("Error while deleting");
  }
};
