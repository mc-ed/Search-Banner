DROP DATABASE IF EXISTS searchbar;
CREATE DATABASE searchbar;

\c searchbar;

CREATE TABLE items (
  ID SERIAL PRIMARY KEY,
  itemID INTEGER,
  itemName VARCHAR,
  views INTEGER,
  category VARCHAR, 
  UNIQUE(itemID, itemName)
);

INSERT INTO items (itemID, itemName, views, category)
  VALUES (831776951, 'Refined Tasty Ergonomic Cotton and Frozen Salad in violet',41594, 'food');