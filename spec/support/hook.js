import { initApp } from "../../app/app"
import { connectDb, dropDb, closeDb } from "../../init/mongoose"

before(async () => { await connectDb() })
before(async () => { await initApp(app) })
beforeEach(async () => { await dropDb() })
after(async () => { await closeDb() })
