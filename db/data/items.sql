DROP DATABASE IF EXISTS searchbar;
CREATE DATABASE searchbar;

\c searchbar;

CREATE TABLE items (
  ID SERIAL PRIMARY KEY,
  itemID TEXT,
  itemName TEXT,
  views TEXT,
  category TEXT
);

INSERT INTO items (itemID, itemName, views, category)
  VALUES (831776951, 'Refined Tasty Ergonomic Cotton and Frozen Salad in violet',41594, 'food');