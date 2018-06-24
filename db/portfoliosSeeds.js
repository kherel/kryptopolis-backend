import { connectDb, closeDb, Ticker, Portfolio } from "../init/mongoose"
import factory from '../spec/factory'

const create = async () => {
  try {
    await connectDb()

    await Portfolio.remove({})

    let count = await Ticker.count() - 1;

    for (let i = 0; i < 5; ++i) {
      const portfolio = await factory.create('portfolio')
      console.log('portfolio', portfolio.id)
      for (let j = 0; j < 9; ++j) {
        var random = Math.floor(Math.random() * count)
        const ticker = await Ticker.findOne().skip(random)
        console.log('ticker', ticker.id, random)
        switch (j) {
          case 0:
          case 1:
          case 2:
            await portfolio.addForecast('balanced', ticker)
            break
          case 3:
          case 4:
          case 5:
            await portfolio.addForecast('growth', ticker)
            break
          case 6:
          case 7:
          case 8:
            await portfolio.addForecast('aggressive', ticker)
            break
          default:
        }
      }
    }

    await closeDb()

    console.log("models created")
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

create()
