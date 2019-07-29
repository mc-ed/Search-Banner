\c searchbar;

ALTER TABLE items
ALTER COLUMN itemname TYPE VARCHAR,
ALTER COLUMN category TYPE VARCHAR,
ALTER COLUMN views TYPE INTEGER USING views::integer,
ALTER COLUMN itemid TYPE INTEGER USING itemid::integer;

ALTER TABLE items ADD "document_vectors" tsvector;
CREATE INDEX idx_fts_doc_vec ON items USING gin(document_vectors);

UPDATE 
    items 
SET 
    document_vectors = (to_tsvector(itemname));