const fs = require("fs")

class Historial {
   constructor() {
      this.places = []
      this.dbPath = "./db/database.json"
      if (fs.existsSync(this.dbPath)) this.readDB()
   }

   add(newPlace) {
      if (this.places.length == 5) this.places.pop()
      this.places.unshift(newPlace)
   }

   saveOnDB() {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.places))
   }

   readDB() {
      let placesJSON = fs.readFileSync(this.dbPath, { encoding: "utf8", flag: "r" })
      if (placesJSON.trim().length > 0) {
         this.places = JSON.parse(placesJSON)
      }
   }

   getPlacesNameList() {
      return this.places.map((place, i) => {
         const idx = `${i + 1}.`.green
         return `${idx} ${place.name}`
      })
   }
}

module.exports = Historial
