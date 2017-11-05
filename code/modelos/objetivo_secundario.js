/**
 * Created by Andres on 11/4/2017.
 */
class Objetivo_secundario extends Objetivo{

    constructor(nombre, fondo, importancia) {
        super(nombre, fondo, importancia);
        this._nombre = nombre;
        this._fondo = fondo;
        this._importancia = importancia;
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