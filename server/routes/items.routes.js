const express = require('express');
const db = require('../../db/mongodb/index.js');
const {
  getAllItemList,
  get3Items,
  saveOneItem,
  addManyFakeItems
} = require('../../db/mongodb/index.js');

const itemsRouter = express.Router();

module.exports = itemsRouter;
