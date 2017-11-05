/**
 * Created by Andres on 11/5/2017.
 */
class Bala{
    constructor(nombre,fondo){
        this._nombre = nombre;
        this._fondo = fondo;
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
}