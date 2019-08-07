# LazyLowsing Search Backend

### About

The goal of this project was to take a [previously built e-commerce site MVP ](https://github.com/mc-ed) and refactor the backend to be "webscale".

This means it's able to perform effectively with a dramatically larger product portfolio (1-10M items) and handle a large number of request per second.

The goal of the search component evaluation was to compare the efficacy of various deployment methods, database, and tools to accomplish scale and make other optimizations and enhancements.

Ultimately, I was able to deliver an API that was performant with 10M records and move the initial MVP based on client-side keyword search to server-side type-as-you-go search (more details in the Deliverables section).

You can find a full day-by-day breakdown of challenges and triumphs in the [DevJournal](https://github.com/lazylowesing/Search-Banner/blob/master/DevJournal.md).

### Contributors

- [Brian Embry](https://github.com/baembry)
- [Charles Neblett](https://github.com/cnebs)
- [Chris Fauries](https://github.com/chrisfauries)

### Tech Stack

Scale was accomplished primarily using Node, ElasticSearch, and Postgres/MongoDB. Deployment was accomplished using Docker and Google Cloud GCE micro instances. Other key technologies used are listed below:

<img src="https://lh5.googleusercontent.com/rdAoVdYKOCnmtev6t7DJrEY7mG4iYsRPqeTH0Z-OrlsVmiea3q5SMtOGNSa7HzJcyxcIcelTacG5gPNgyBoIviiNcLbohQAicvpldcfM32Klb_ewouDRd67OtYhUAU1CEZB4rBqB" width="100" />
<img src="https://lh6.googleusercontent.com/tKlT8lGB2bTDqSilr_a2y8vaO-QBUdcUIYASnslf-RAKTxUEiEBq-_gTVBP0irIP1ZWNuSvp1fouOJrQBXUr0joVmBZzNyOec4jBpOyVogPZMOYhPH6YQwYOiLdZnfuaDnFel9rn" width="100" />
<img src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Moby-logo.png?itok=sYH_JEaJ" width="100">
<img src="https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blt6ae3d6980b5fd629/5bbca1d1af3a954c36f95ed3/logo-elastic.svg" width="100">
<img src="https://cloud.mongodb.com/static/images/mdb_logo.svg" width='100'/>
<img src="https://cloud.google.com/_static/9b2935c280/images/cloud/cloud-logo.svg" width="100">
 
### Technical Challenges / Research
 
Some issue I ran into while building the service:
 
1. Generated 10M fake records that were able to make a reasonable approximation of an e-commerce inventory.
2. Import/Exporting/Manipulating data at scale --- the rules and capabilities of technology, especially databases, are very different with 10M records. Mongo and PSQL full-text search was not performant at that scale.
3. Data persistence in a containerized environment --- persistent volumes and/or caching with large datasets in deployed containers is difficult without JDBC or similar tools.
 
## Deliverables
 
#### User Stories
 
- As a User, I should be able to search for items and quickly get a response base on what I type.
- As a User, I should see items recommendations on what I'm looking as I type.
 
### Minimum Viable Product (MVP)
 
The MVP requirement was to be able to performantly serve 250 RPS(requests per second) deployed using micro instances.
 
### How the App Works
 
Behind the scenes, the app uses Docker Swarm deployed to GCP with a ElasticSearch instance on a manager node and 6 Express servers spread across 5 other swarm nodes to serve 500 RPS/CPS ([test results](https://ldr.io/2KlKOuh)).
 
The tests used MongoDB deployed on GCP for the backend, PSQL was equally performant for median response time but the spread was much greater (see [DevJournal](https://github.com/lazylowesing/Search-Banner/blob/master/DevJournal.md) on July 29, 2019 for details)
 
### Future Features
 
Given time, I'd implement:
 
- JDBC for live connection between ElasticSearch and database. Would also write enhanced startup script for ElasticSearch, right now index is built manually.
 
- Refactor and retest PSQL to use horizontal partitioning. I'm reasonably certain it would end up being faster than MongoDB in that scenario and the original wasn't built with ElasticSearch implemented.
