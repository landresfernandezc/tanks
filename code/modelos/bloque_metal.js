/**
 * Created by Andres on 11/4/2017.
 */
class Bloque_metal extends Bloque{

    constructor(nombre, fondo, durabilidad) {
        super(nombre, fondo, durabilidad);
        this._nombre = nombre;
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

    get durabilidad() {
        return this._durabilidad;
    }

    set durabilidad(value) {
        this._durabilidad = value;
    }
}