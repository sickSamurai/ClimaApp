require("dotenv").config()
require("colors")
const { showMenu, pause, readInput, selectPlace } = require("./helpers/inquirer")
const Searcher = require("./models/Searcher")
const Historial = require("./models/Historial")

const showSelectedPlaceInfo = (placeLocation, placeWeather) => {
   console.log("Información de la ciudad".green)
   console.log(`Ciudad: ${placeLocation.name}`)
   console.log(`Lat: ${placeLocation.lat}`)
   console.log(`Lng: ${placeLocation.lng}`)
   console.log(`Temperatura: ${placeWeather.temp}`)
   console.log(`Minima: ${placeWeather.min}`)
   console.log(`Maxima: ${placeWeather.max}`)
   console.log(`Como está el clima: ${placeWeather.description}`)
}

const main = async () => {
   let optionSelected = 0
   const searcher = new Searcher()
   const historial = new Historial()

   do {
      optionSelected = await showMenu()
      if (optionSelected !== 0) {
         switch (optionSelected) {
            case 1:
               const placeName = await readInput("Lugar a consultar")
               const posiblePlaces = await searcher.getCities(placeName)
               const selectedPlaceID = await selectPlace(posiblePlaces)
               if (selectedPlaceID === 0) continue
               const selectedPlace = posiblePlaces.find(place => place.id === selectedPlaceID)
               const weather = await searcher.getWeather(selectedPlace)
               showSelectedPlaceInfo(selectedPlace, weather)
               historial.add(selectedPlace)
               historial.saveOnDB()
               break

            case 2:
               historial.getPlacesNameList().forEach(placeName => console.log(placeName))
               break
         }
         await pause()
      }
   } while (optionSelected !== 0)
}

main()
