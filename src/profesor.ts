import Persona from "./persona";
import Materia from "./materia";
export default class Profesor implements Persona {
    public nombre: string;
    public apellido: string;
    public fechaDNacimiento: string;
    public dni: number;
    public direccion: string;
    public celular: string;
    public contrato: boolean;
    public asignatura: Materia;
    public constructor(nombre: string, apellido: string, fechaDNacimiento: string, dni: number, celular: string, direccion: string, asignatura: Materia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDNacimiento = fechaDNacimiento;
        this.dni = dni;
        this.direccion = direccion;
        this.celular = celular;
        this.contrato= true;
        this.asignatura = asignatura;
    }
}