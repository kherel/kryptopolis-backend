export default (object) => {
  if (!object.overview) { return  object }

  let openData = new Date(object.overview["Token sale opening date"])
  let closingData = new Date(object.overview["Token sale closing date"])

  if (openData == "Invalid Date") {
    console.log("Token sale opening date", openData, object.title)
  } else {
    object.overview.tokenSaleOpeningDate = openData
  }

  if (openData == "Invalid Date") {
    console.log("Token sale closing date", openData, object.title)
  } else {
    object.overview.tokenSaleClosingDate = closingData
  }

  object.overview.symbol = object.overview["Symbol"] || null
  object.overview.status = object.overview["Status"] || null
  object.overview.concept = object.overview["Concept"] || null

  return object
}
