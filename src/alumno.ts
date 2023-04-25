import Persona from "./persona";
import Materia from "./materia";
const {v4: uuidv4} = require('uuid');
export default class Alumno implements Persona {
    public nombre: string;
    public apellido: string;
    public fechaDNacimiento: string;
    public dni: number;
    public direccion: string;
    public celular: string;
    private matricula: number;
    public materias: Materia[];
    private nota: Map<Materia, number>;
    public constructor(nombre: string, apellido: string, fechaDNacimiento: string, dni: number, celular: string, direccion: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDNacimiento = fechaDNacimiento;
        this.dni = dni;
        this.direccion = direccion;
        this.celular = celular;
        this.matricula = uuidv4().slice(0, 6);
        this.materias = [];
        this.nota=new Map<Materia, number>();
    }
    actualizarNota(materia: Materia, nota: number): void {
        this.nota.set(materia, nota)
    }
}