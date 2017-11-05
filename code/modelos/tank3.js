/**
 * Created by Andres on 11/4/2017.
 */
class Tank3 extends Tank{
    constructor(nombre,x, y, fondo, habilidad) {
        super(x, y, fondo, habilidad);
        this._x = x;
        this._y = y;
        this._fondo = fondo;
        this._habilidad = habilidad;
        this._nombre=nombre;
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