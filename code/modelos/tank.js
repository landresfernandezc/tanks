/**
 * Created by Andres on 11/8/2017.
 */

class Tank {
    constructor(nombre,x, y, fondo, habilidad,vivo) {
        this._nombre=nombre;
        this._x = x;
        this._y = y;
        this._fondo = fondo;
        this._habilidad = habilidad;
        this._vivo=vivo;
    }

    get vivo() {
        return this._vivo;
    }

    set vivo(value) {
        this._vivo = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get fondo() {
        return this._fondo;
    }

    set fondo(value) {
        this._fondo = value;
    }

    get habilidad() {
        return this._habilidad;
    }

    set habilidad(value) {
        this._habilidad = value;
    }

}