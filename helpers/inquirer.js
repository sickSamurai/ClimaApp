const inquirer = require("inquirer")
require("colors")

const menuOptions = [
   {
      type: "list",
      name: "option",
      message: "¿Qué desea hacer?",
      choices: [
         {
            value: 1,
            name: `${"1.".green} Buscar lugar`
         },
         {
            value: 2,
            name: `${"2.".green} Historial`
         },
         {
            value: 0,
            name: `${"0.".green} Salir`
         }
      ]
   }
]

const showMenu = async () => {
   console.clear()
   const { option: optionSelected } = await inquirer.prompt(menuOptions)
   return optionSelected
}

const confirm = async message => {
   const { ok } = await inquirer.prompt([
      {
         type: "confirm",
         name: "ok",
         message
      }
   ])
   return ok
}

const pause = async () => {
   return await inquirer.prompt([
      {
         type: "input",
         name: "inputToContinue",
         message: `presiona ${"ENTER".green} para continuar`
      }
   ])
}

const selectPlace = async (placesArray = []) => {
   const choices = placesArray.map((place, i) => {
      const number = `${i + 1}.`.green
      return {
         value: place.id,
         name: `${number} ${place.name}`
      }
   })

   choices.unshift({
      value: 0,
      name: "0".green + "." + " Cancelar"
   })

   const placeList = {
      type: "list",
      name: "idSelected",
      message: "Selecciona una de los siguientes lugares",
      choices
   }

   const { idSelected } = await inquirer.prompt(placeList)
   return idSelected
}

const readInput = async message => {
   const { description } = await inquirer.prompt([
      {
         type: "input",
         name: "description",
         message,
         validate(value) {
            return value.length === 0 ? "Por favor ingrese un valor" : true
         }
      }
   ])
   return description
}

module.exports = {
   showMenu,
   pause,
   readInput,
   confirm,
   selectPlace
}
