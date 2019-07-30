BEGIN;
LOCK TABLE tv_series IN SHARE MODE;

SET LOCAL work_mem = '1000 MB';  -- just for this transaction

CREATE TABLE tbl_new AS 
SELECT document_vectors AS (to_tsvector(description)), 
  id SERIAL PRIMARY KEY, 
  title TEXT,
  description TEXT,
  creator TEXT,
FROM   tv_series

COMMIT;
-- ALTER TABLE tbl_new
-- ALTER COLUMN itemname TYPE VARCHAR,
-- ALTER COLUMN category TYPE VARCHAR,
-- ALTER COLUMN views TYPE INTEGER USING views::integer,
-- ALTER COLUMN itemid TYPE INTEGER USING itemid::integer;

