/**
 * _listado:
 *    {'uuid-ksdhf737393hjh32: {id:12, desc:asd, completadoEn: fecha}'}
 */
// Importar la clase Tarea.
const Tarea = require("./tarea");

// Definir la clase Tareas.
class Tareas {
  _listado = {}; // Objeto vacío que almacenará las tareas.

  // Get que devuelve un arreglo con las tareas.
  get listadoArr() {
    const listado = [];

    // Iterar sobre cada una de las claves (IDs) del objeto _listado.
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado; // Devolver arreglo de tareas.
  }

  constructor() {
    this._listado = {}; // Inicializar el objeto vacío.
  }

  // Método para borrar una tarea por ID.
  borrarTarea(id = ''){
    if( this._listado[id]){
      delete this._listado[id];
    }
  }

  // Método para cargar un arreglo de tareas al objeto _listado.
  cargarTarearFromArray(tareas = []){
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  // Método para crear una nueva tarea.
  crearTarea(desc = "") {
    const tarea = new Tarea(desc); // Crear una nueva tarea.
    this._listado[tarea.id] = tarea; // Agregar la tarea al objeto _listado.
  }

  // Método para mostrar el listado completo de tareas.
  listadoCompleto(tareas =[]){
    console.log()
    this.listadoArr.forEach((tarea, i )=> {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = ( completadoEn )
      ? "Completado".green
      : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);

    })
  }

  // Método para mostrar el listado de tareas pendientes o completadas.
  listarPendientesCompletadas( completadas = true){
    console.log()
    let contador =0
    this.listadoArr.forEach((tarea)=> {
      const { desc, completadoEn } = tarea;
      const estado = ( completadoEn )
      ? "Completado".green
      : "Pendiente".red;
      if (completadas) {
        //mostrar completadas
        if(completadoEn) {
          contador += 1 
          console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
        }
      }else {
        //mostrar las pendientes
        if(!completadoEn){
          contador += 1
          console.log(`${(contador + '.').red} ${desc} :: ${estado}`);
        }
      }
     

    })
  }

  // Método para marcar como completadas o pendientes las tareas a partir de sus IDs.
  toggleCompletadas( ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();// Marcar la tarea como completada.
      }
    })
    this.listadoArr.forEach(tarea => {
      if( !ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null//Quitar ek completado a una tarea
      }
    })
  }
}

module.exports = Tareas; // Exportar la clase Tareas. 
