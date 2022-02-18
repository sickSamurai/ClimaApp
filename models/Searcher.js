const axios = require("axios").default

class Searcher {
   constructor() {}

   get mapboxParams() {
      return {
         access_token: process.env.MAPBOX_KEY,
         limit: "5",
         lenguaje: "es"
      }
   }

   async getWeather(place) {
      try {
         const weatherRequest = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
               appid: process.env.OPENWEATHER_KEY,
               lat: place.lat,
               lon: place.lng,
               lang: "es",
               units: "metric"
            }
         })

         const response = await (await weatherRequest.get()).data

         return {
            description: response.weather[0].description,
            temp: response.main.temp,
            min: response.main.temp_min,
            max: response.main.temp_max
         }
      } catch (e) {
         console.log(e)
      }
   }

   async getCities(placeName = "") {
      try {
         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json`,
            params: this.mapboxParams
         })

         const response = await instance.get()

         return response.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1]
         }))
      } catch (e) {
         console.log(e)
      }

      //get cities with get http request
      //return cities
   }
}

module.exports = Searcher
