/**
 * Created by Andres on 11/4/2017.
 */
class Objetivo{
    constructor(nombre,fondo,importancia){
        this._fondo = fondo;
        this._importancia = importancia;
        this._nombre=nombre;
    }
    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }
    get fondo() {
        return this._fondo;
    }
    set fondo(value) {
        this._fondo = value;
    }

    get importancia() {
        return this._importancia;
    }

    set importancia(value) {
        this._importancia = value;
    }
}