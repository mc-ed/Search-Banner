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

## Date: July 27, 2019

### Challenges faced:

1. Indexing in both PSQL and Mongo appear to be O(log n) or greater time complexity. Type checking is also expensive.
2. Routes / methods for testing are a bit complicated.
3. How to performance test PSQL & Mongo easily/effectively?

### Action taken:

1. Imported PSQL data as a TEXT field and then ran a TABLE UPDATE after. Let Mongo run full import.
2. Added sub-router for PSQL and started importing the model/data access methods via an object to make it explicit vs destructuring. Example below.

```javascript
itemsRouter.get('/', (req, res) => {
  mongo
    .findTenItems()
    .then(items => {
      res.send(items);
    })
```

3. Implementing Artillery.io for testing.

### Results/Takeaways:

1. PSQL seed, update, and index is very rapid like ~10-12 minutes locally. Mongo import looks like it'll take ~3 hours. Will make indexes in the background after upload in deployment.
2. Sometimes destructuring is actually less explicit
3. It'd be nice to do a side-by-side test just within the server but a backend test is more practical and more realistic about what matters given the task and time constraint.

## Date: July 29, 2019

### Challenges faced:

1. Artillary is single threaded, my local CPU core caps out ~550 RPS. Need another way to test more requests.
2. Limitations of PSQL UPDATE / ts_vector. Turns out an UPDATE rewrites the whole row which means updating a table with 10M records take over 24 hours with UPDATE.
3. Tested DB Queries with and without indexes.

### Action taken:

1. No good solution here for testing on localhost that doesn't require extensive research or paid. The closest fit I could find was to use Apache ab but it's basically a DDOS attack against yourself.
2. Doing a bunch of research on PSQL updates with large tables. It looks like I can create another table and update it with the ts_vector. Otherwise I could make a script that reads the database and makes a ts_vector and saves it to a CSV and then update from that CSV.
3. Used Artillary for lowish RPS (100) and got good results.

### Results/Takeaways:

1. Will test in deployed version since there's better tooling.
2. Databases are very different when you're in the 10MM records realm.
3. Indexing **really** matters. This was told to me a lot at Mongo but I took it for granted until doing testing. Results below, full tests in `tests\tools\artillery\indexTests`:

### Index Testing:

#### Without Indexes:

##### Mongo:

```
A findOne for strict equality takes ~23 seconds without an index. Couldn't even stress test it since the connection timed.
```

##### PSQL:

```
More performant than Mongo unindexed, was actually able to return 40 / 6000 requests without request time outs.
```

#### With Indexes:

##### Mongo:

```javascript
"scenariosCreated": 6000
"scenariosCompleted": 6000
    "latency": {
      "min": 2.3,
      "max": 163.4,
      "median": 3.5,
      "p95": 13.6,
      "p99": 34.5
    },
    "rps": {
      "count": 6000,
      "mean": 99.11
    }
```

##### PSQL:

```javascript
"scenariosCreated": 6000,
"scenariosCompleted": 6000,
    "latency": {
      "min": 5,
      "max": 1068.1,
      "median": 7.6,
      "p95": 101.9,
      "p99": 824.6
    },
    "rps": {
      "count": 6000,
      "mean": 99.22
```

## Date: July 30, 2019

### Challenges faced:

1. Mongo full text search works very very poorly at scale. On search, Mongo gives each record a score and then returns the relevant records but it's insanely expensive. I wasn't able to successfully complete a single search even using limits. Using exact matching is also very slow. Rough word matching is the best I can get.
2. Accessing Mongo container from other container.
3. Researching GCP Kubernetes Engine for deploying and managing multiple coordinated containers.

### Action taken:

1. So, I have two paths forward, one is to forge ahead and implement ElasticSearch. This would get me the gold standard of search but there's no guarentee I'd be able to implement it in time. The alternative is to implement an anchored key word search. This would require regenerating all of the data but it's a "solved" problem in the sense that I know the problem space and can map a direct course that will get there in time. It's a significant improvement over the old search but not "best in class"
2. The enviromental variables get challenging when you move from deployment across containers that need to be coordinated. Added a NODE_ENV and logic to conditionally changes the host, port, db url, etc. based on the enviroment.
3. Will work through a tutorial tomorrow and then implement.

### Results/Takeaways:

1. Incremental improvements are superior to step function improvements when you're not familiar with the problem space. Making the poorly designed keyword search better and also scale would have been a much better idea since I was both uncertain of the limitations of PSQL and MDB at scale and had not implemented ES before either. Improved keyword search was a known path.
2. If you know you're going to deploy an app, putting in logic ahead to handle enviornment switching as you go is a lot nicer than trying to figure it out when heading to deployment. I was already doing this with the config/env set up but that wasn't going to be effective when connecting to multiple services.
3. GKE seems to make private docker registeries very, very easy.

## Date: July 31, 2019

### Challenges faced:

1. After doing more research about left anchor search, implemented ElasticSearch
2. Uploading Data to ElasticSearch

### Action taken:

1. Spent a fair amount of time doing a tutorial and looking at the docs. Spun up ES locally and then in Docker successfully. Connected it to my web server and wrote functions to use ES.
2. Turns out that getting data into ElasticSearch the "right way" requires a lot of set up. I looked over a bunch of tools and docs, attempted to implement mongo-connector but it only supports ES 5.x and I wanted to use functionality in 7.x.

Kibana has an experimental tool for uploading a CSV as the intial seed(can't add more or update that way) which I used to get 1M items into ElasticSearch which is close to the max document size. I have a clear path to getting everything into ES but it would probably take another day since I have to write something custom to upload or figure out how to use Filebeat/Logstash which is kind of a work around.

### Results/Takeaways:

1. It was worth investigating how left anchor search would work at scale. Turns out not very well without a limiting factor like views, it also wouldn't be fuzzy.

2. Succesfully got enough data into Elastic to decide it would be a good way to go. The setup costs for an actual syncing system are pretty high for a sprint though.

## Date: August 1, 2019

### Challenges faced:

1. Express and Kibana were having issues resolving network variables
2. Containerized database isn't good for production/deployment
3. Deploying with containers and using ElasticSearch as a cache for each server

### Action taken:

1. Had to rework the way the server was picking connection strings and adjust the docker-compose.yml serveral times.
2. I knew this going in, redeployed to Atlas with records that match ES
3. So I spent basically all researching how to deploy with containerized cache, finally read the advanced docs for Docker and will work towards swarms.

### Results/Takeaways:

1. At this point I've developed the intution that ENV variables of one kind our another are the first thing to check so that wasn't frustrating, just a bit time consuming.
2. I could have deployed to EC2 but there wasn't much point since the amount of time I have left won't allow me to set up a JDBC.
3. Do you like a tool? Does it have advanced features that might solve your issue? LOOK AT THOSE FIRST! I spent a bunch of time investigating k8s which is really cool but way overkill for what I need right now and AWS/GCP both have really advanced solutions. After reviewing the docs I'm basically ready to rock on Docker Engine with a small amount of work.

## Date: August 2, 2019

### Challenges faced:

1.

### Action taken:

1.

### Results/Takeaways:

1. 250CPS: https://ldr.io/2YMtNCY
2. 500CPS: https://ldr.io/2KlKOuh
3. 250-1k CPS: https://ldr.io/2LWK6H5
