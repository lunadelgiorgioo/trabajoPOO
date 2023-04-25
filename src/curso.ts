import Alumno from "./alumno";
import Profesor from "./profesor";
import Materia from "./materia";
import { readlinkSync } from "fs";
const fs = require('fs');
const readlineSync = require('readline-sync');
const {check, leer, escribir, guardar} = require('./utils.js');
export default class Curso {
    constructor(public nombre: string){
        if (fs.existsSync("./alumnos.json")) {
            //verifica si existe
            console.log("Archivo existente");
        
        } else {
            //sino lo crea
            fs.writeFileSync("./alumnos.json", "utf-8");
        }
        if (fs.existsSync("./profesores.json")) {
            console.log("Archivo existente");
        } else {
            fs.writeFileSync("./profesores.json", "utf-8")
        } 
        /*const dataAlumnos = fs.readFileSync('alumnos.json', 'utf-8');
        const dataProfesores = fs.readFileSync('profesores.json', 'utf-8');
        const dataMaterias = fs.readFileSync('materias.json', 'utf-8');
        this.alumnos = JSON.parse(dataAlumnos);
        this.profesores = JSON.parse(dataProfesores);
        this.materias = JSON.parse(dataMaterias)*/
    }
//alumnos
    read() { return fs.readlineSync('./alumnos.json') };
    data() { return JSON.parse(fs.readFileSync('./alumnos.json')) };
//profesores
    read2() { return fs.readlineSync('./profesores.json') };
    data2() { return JSON.parse(fs.readFileSync('./profesores.json')) }; 
    //Materias
    read3() { return fs.readlineSync('./materias.json')};
    data3() { return JSON.parse(fs.readlineSync('./materias.json')) };
    agregarAlumno(){
        let nombre: string = readlineSync.question('Nombre del estudiante:');
        let apellido: string = readlineSync.question('Apellido del estudiante:');
        let fechaDNacimiento: string = readlineSync.question('Fecha de nacimiento del estudiante:');
        let dni: number = Number(readlineSync.question('D.N.I del estudiante:'));
        let direccion: string = readlineSync.question('Direccion del estudiante:');
        let celular: string = readlineSync.question('Telefono del estudiante:');
        //creacion de nuevo alumno
        let nuevoAlumno = new Alumno(nombre, apellido, fechaDNacimiento, dni, celular, direccion);
        //nueva instancia al arreglo de alumnos
        let alumnos = [...this.data(), nuevoAlumno];
        //carga al listado los nuevos alumnos
        fs.writeFileSync('./alumnos.json', JSON.stringify(alumnos, null, 1));
        /*et pathAlumno = './DATA/alumnos.json';
        guardar(pathAlumno, nuevoAlumno) */
    }
    eliminarAlumnoXDni(dni1: number){
        const dni = Number(readlineSync.question('escriba el D.N.I del alumno que desea eliminar:'))
        const alumnos = this.data();
        let buscarDni = alumnos.filter((alumno: Alumno) => alumno.dni === dni1);
        if(buscarDni.length === 1){
            const i = alumnos.indexOf(buscarDni[0]);
            alumnos.splice(i, 1);
            console.log('El alumno con DNI:', dni, 'ha sido eliminado con exito.');
            fs.writeFileSync('./alumnos.json', JSON.stringify(alumnos, null, 2));
        } else {
            console.log('no se ha encontrado este D.N.I:', dni)
        }
    }
    buscarNombreAlumno(){
        const nombre = readlineSync.question('escriba el nombre del alumno:');
        let buscarNombre = this.data().find((alumno: { nombre: string; }) => alumno.nombre === nombre);
        if(buscarNombre){
            console.log(`alumno encontrado: ${buscarNombre}`);
        } else {
            console.log(`alumno no encontrado, intente nuevamente.`);
        }
    }
    buscarApellidoAlumno(apellido: string){
        let buscarApellido = this.data().find((alumno: { apellido: string; }) => alumno.apellido === apellido)
        console.log('apellido del alumno encontrado:',buscarApellido);
        return buscarApellido
    }
    listarAlumnos(this:any){
        console.log(...this.data());
        this.menuPrincipal;
    }
    agregarProfesor(){
        let nombre: string = readlineSync.question('Nombre del profesor:');
        let apellido: string = readlineSync.question('Apellido del profesor:');
        let fechaDNacimiento: string = readlineSync.question('Fecha de nacimiento del profesor:');
        let dni: number = Number(readlineSync.question('D.N.I del profesor:'));
        let direccion: string = readlineSync.question('Direccion del profesor:');
        let celular: string = readlineSync.question('Telefono del profesor:');
        let asignatura = readlineSync.question('Nombre materia que dicta:')
        let nuevoProfesor = new Profesor(nombre, apellido, fechaDNacimiento, dni, celular, direccion, asignatura);
        
        let profesores = [...this.data(), nuevoProfesor];
        fs.writeFileSync('./profesores.json', JSON.stringify(profesores, null, 2));
    }
    buscarApellidoProfesor(apellido: string){
        let buscarApellido = this.data2().find((profesor: { apellido: string; }) => profesor.apellido === apellido)
        console.log('apellido del profesor encontrado:',buscarApellido);
        return buscarApellido
    }
    eliminarProfesorXDni(){
        const dni = Number(readlineSync.question('escriba el D.N.I del profesor que desea eliminar:'))
        const profesor = this.data2();
        let buscarDni = profesor.filter((profesor: Profesor) => profesor.dni === dni);
        if(buscarDni.length === 1){
            const i = profesor.indexOf(buscarDni[0]);
            profesor.splice(i, 1);
            console.log('El profesor con DNI:', dni, 'ha sido eliminado con exito.');
            fs.writeFileSync('./profesores.json', JSON.stringify(profesor, null, 2));
        } else {
            console.log('no se ha encontrado este D.N.I:', dni)
        }
    }
    listarProfesor(this: any) {
        console.log(...this.data2());
        this.menuPrincipal;
    }
    agregarMateria(){
        const materia = readlineSync.question('nombre de la materia:');
        const profesor: any = this.agregarProfesor();
        let nombreProfesor = new Materia(materia, profesor);
    }
    menuPrincipal(this: any) {
        console.log('Bienvendido al sistema de gestion de legajos');
        while(true){
            console.log('');
            console.log('¿Qué acción desea realizar?');
            console.log('1. Agregar un alumno');
            console.log('2. Agregar un profesor');
            console.log('3. Listar alumnos');
            console.log('4. Listar profesores');
            console.log('5. Eliminar un alumno');
            console.log('6. Eliminar un profesor');
            console.log('7: Buscar alumno con el apellido');
            console.log('8: Buscar profesor con el apellido');
            console.log('9: Agregar materia');
            console.log('10. Salir');
            const opcion = readlineSync.questionInt('ingrese el numero de la accion');
            switch (opcion) {
                case 1: 
                    this.agregarAlumno();
                    break;
                case 2: 
                    this.agregarProfesor();
                    break;
                case 3:
                    this.listarAlumnos();
                    break;
                case 4:
                    this.listarProfesor();
                    break;
                case 5:
                    this.eliminarAlumnoXDni();
                case 6: 
                    this.eliminarProfesorXDni();
                    break;
                case 7: 
                   this.buscarApellidoAlumno(); 
                   break;
                case 8:
                    this.buscarApellidoProfesor();
                    break;
                case 9:
                    this.agregarMateria();
                    break;
                case 10:
                    console.log('Saliendo del programa...');
                    return;
                default:
                    console.log('Opción inválida');
                    break;
            }
        }
    }
}