import express from "express"
import repl from "repl"
import { connectDb, User, Ico } from "../init/mongoose"
import { initApp } from "../app/app"

const run = (async () => {

  await connectDb()

  const app = await initApp(express())

  let replServer = repl.start({
    prompt: "Node > ",
  })

  replServer.context.app = app
  replServer.context.q = () => { process.exit() }

  replServer.context.User = User
  replServer.context.Ico = Ico

})

run()

