// Importar las librerías necesarias
require("colors");
const inquirer = require("inquirer");

// Arreglo de preguntas para el menú principal
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: "1.".green + " Crear tarea",
      },
      {
        value: "2",
        name: "2.".green + " Listar tareas",
      },
      {
        value: "3",
        name: "3.".green + " Listar tareas completadas",
      },
      {
        value: "4",
        name: "4.".green + " Listar tareas pendientes",
      },
      {
        value: "5",
        name: "5.".green + " Completar tarea(s)",
      },
      {
        value: "6",
        name: "6.".green + " Borrar tareas",
      },
      {
        value: "0",
        name: "0.".green + " Salir",
      },
    ],
  },
];

// Función para mostrar el menú principal y obtener la opción elegida por el usuario
const inquirerMenu = async () => {
  console.clear();// Limpia la consola
  console.log("================================================".green);
  console.log("          Seleccione una opción".white);
  console.log("================================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);// Muestra el menú y obtiene la opción elegida

  return opcion;// Devuelve la opción elegida por el usuario
};

// Función para pausar el programa y esperar que el usuario presione enter
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);// Muestra la pregunta y espera que el usuario presione enter
};

// Función para pedir al usuario que ingrese un valor por consola
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {// Valida que se haya ingresado un valor
        if (value.length === 0) {
          return "Por favor ingresa un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);// Muestra la pregunta y espera que el usuario ingrese un valor
  return desc;// Devuelve el valor ingresado por el usuario
};

// Función para mostrar un listado de tareas y permitir al usuario 
const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
// Agregar una opción para cancelar
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  })
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    }
  ] 
  const { id } = await inquirer.prompt(preguntas);// Muestra el listado y espera que el usuario seleccione una tarea
  return id;
};

// Función para pedir confirmación al usuario
const confirmar = async(message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
}

// Función que muestra un listado de tareas con checkboxes y devuelve un array con los ids de las tareas seleccionadas

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,// Si la tarea ya está completada, marcamos su checkbox como seleccionado
      checked: (tarea.completadoEn ) ? true : false
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    }
  ] 
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

// Exportamos todas las funciones como un módulo
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};
