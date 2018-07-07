**Setup**
---

- git clone ... kryptopolis-backend
- cd kryptopolis-backend
- cp .mongo-migrate.js.sample .mongo-migrate.js
-- set mongodb.url your path mongo (nano .mongo-migrate.js)
- cp .env.sample .env
-- edit .env and set keys and path to mongo (nano .env)

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

