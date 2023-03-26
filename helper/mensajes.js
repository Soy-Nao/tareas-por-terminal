require("colors");

// Función asíncrona que muestra el menú y devuelve una promesa que resuelve con la opción seleccionada
const mostrarMenu = () => {
  return new Promise((resolve) => {
    // Se muestra un mensaje en consola con un borde verde
    console.log("================================================".green);
    console.log("          Seleccione una opción");
    console.log("================================================\n".green);
    // Se muestran las opciones del menú en consola
    console.log(`${"1.".green} Crear una tarea`);
    console.log(`${"2.".green} Listar tarea`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea(s)`);
    console.log(`${"0.".green} Salir \n`);

    // Se crea una interfaz de lectura de línea con el usuario para que seleccione una opción
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Se espera la respuesta del usuario y se resuelve la promesa con la opción seleccionada
    readline.question("Selecione una opción: ", (opt) => {
      //console.log({opt})
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${"ENTER".green} para continuar \n`,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
