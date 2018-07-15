**Setup**
---

- git clone ... kryptopolis-backend
- cd kryptopolis-backend
- cp .mongo-migrate.js.sample .mongo-migrate.js
-- set mongodb.url your path mongo (nano .mongo-migrate.js)
- cp .env.sample .env
-- edit .env and set keys and path to mongo (nano .env)

**Using backup**
---

On remote server
- cd kryptopolis/db/dump
- ls -la to choose needed folder
- tar -zcvf dump.tar.gz -C 2018-07-14T12:30:00.053Z . (change folder name)

In local terminal
- scp safe@46.101.229.239:./kryptopolis-backend/db/dump/dump.tar.gz ~/Downloads

**DEV**
---

- run mongo
- npm run db:seed
- npm run dev

**PROD**
---

- install docker
- docker-compose up

To restart 
- docker-compose down
- docker-compose up


