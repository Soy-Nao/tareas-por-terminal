// Importar el paquete "colors"
require("colors");

const { guardarDB, leerDB } = require("./helper/guardarArchivo");
// Importar las funciones "inquirerMenu", "pausa" y "leerInput" del archivo "inquirer.js" en el directorio "helper"
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helper/inquirer");

// Importar la clase "Tareas" del archivo "tareas.js" en el directorio "models"
const Tareas = require("./models/tareas");

// Función principal
const main = async () => {
  // Inicializar las variables "opt" y "tareas"
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //cargar las tareas
    tareas.cargarTarearFromArray(tareasDB);
  }

  // Mostrar el menú y ejecutar la opción seleccionada
  do {
    opt = await inquirerMenu();

    switch (opt) {
      // Si la opción es "1", pedir la descripción de la tarea y crear una nueva tarea
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      // Si la opción es "2", mostrar en la consola el listado de tareas
      case "2":
        tareas.listadoCompleto();
        break;
      case "3": //Listar Completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4": //Listar Pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": //Completado | Pendiente
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6": //Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada correctamente");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    // Pausar la ejecución hasta que el usuario presione una tecla
    await pausa();
  } while (opt !== "0");
};

// Llamar a la función principal
main();
