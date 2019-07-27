# DEV JOUNRAL

## Date: July 23, 2019

### Challenges faced:

- Legacy code not loosely coupled, pulls entire database into client memory, no tests written, no documentation.

### Actions taken:

- Added Jest, JSDocs, ESLint. Lightly refactored client to remove hardcoded variables so it runs locally, mapped out minimal amount of changes to scale up.

### Results/Takeaways:

- Legacy code is sometimes messy, important to not get stuck in a rabbit hole and spend minimal amount of time possible on changes.

## Date: July 24, 2019

### Challenges faced:

Discovered that front-end code is doing catagory based keyword search, not actual text search. Will attempt to implement full text search with absolute mimimal code changes to front-end.

Plan is to make webscale backend and worry about front-end refactor later.

Mongoose was the original driver for database connection, was not capable of meeting bulk data create SLA of less than 1 hr minutes for 10M items. Insert 1000 items was taking ~2 seconds.

Researching various ways to do text
complete search, deploy with Docker/CDCI.

### Action taken:

Refactored to MongoDB and added Validation directly to the database to avoid dupes.

Implemented Jest and Supertest to make sure I can still support the front-end APIs with a new server. Need to write integration tests.

### Results/Takeaways:

Should be able to meet 1hr database seeding with Mongo Node.js native driver.

Working with no documentation or tests and code with a lot of side effects is not much fun.

## Date: July 25, 2019

### Challenges faced:

1. MongoDB Atlas free storage too small for collection & indexes
2. How to use same data locally and in AWS for testing? Docker-machine seems like the easy way to go but I don’t want to go the Virtualbox route.

### Action taken:

1. Spun up local Mongo in Docker container and seeding volume
2. Generating a CSV that can be passed into the VM and then used to load data to a volume in the VM

#### Results/Takeaways:

1. Quickly was able to deploy local host and start seeding via a volume. Main drawback is that I won’t be able to easily deploy secondaries for read requests to improve performance.
2. Generated 10M records in a CSV, should take less than an hour to import.

## Date: July 26, 2019

### Challenges faced:

1. Faker doesn’t generate enough options for effective fakes a 10M scale, only imported 2.5M records and took a very long time.

2. Postgres doesn’t have a way to skip uniques on copy, requires different format than Mongo for CSV

3. Supporting legacy routes so the app doesn't break.

### Action taken:

1. Recreated seed data(twice) with more fields in itemName and made a compound unique index in Mongo on itemID and itemName.

2. Generated a second set of seed data for PGSL, it's suppose to be very fast to upload but because it's containerized the upload performace is pretty slow.

3. Wrote tests and then wrote code to pass the tests.

### Results/Takeaways:

1. Able to seed MongoDB in ~11 minutes with CSV import. Not perfect since there will be some item names that have the same exact string but I can distinguish results by itemID and views. Should still be effective for testing since it simulates a large scale ecommerce inventory.

2. Postgres is just going to be a slow seed. ~15 minutes. Not ideal but better scenario than 1HR. Would be extremely fast locally so there's a price to pay for multiple containers.

3. Tests are extremely niave, most just send 200, but the search functionality works with them (without images at the momement).
