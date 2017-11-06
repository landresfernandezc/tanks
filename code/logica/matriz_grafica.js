/**
 * Created by Andres on 11/4/2017.
 */
var dimensiones=20;
var objetivos_nucleo=1;
var objetivos_torres=2;
var enemigos=6;
var cantidad_concreto=100;
var matriz=new Array(dimensiones);
var listaEnemigos=[];
var vidas=3;
var vida=100;
var nivel=1;
var img_enemigo_down='imagenes/tank_down.bmp';
var img_enemigo_up='imagenes/tank_up.bmp';
var img_enemigo_left='imagenes/tank_left.bmp';
var img_enemigo_right='imagenes/tank_right.bmp';
var img_bloque_metal='imagenes/bloque_metal.png';
var img_bloque_vacio='imagenes/bloque_vacio.jpg';
var img_bloque_concreto='imagenes/bloque_concreto.png';
var img_objetivo_torre='imagenes/objetivo_torre.png';
var img_objetivo_nucleo='imagenes/primario_nucleo.png';
var img_heroe_down='imagenes/heroe_down.png';
var img_heroe_left='imagenes/heroe_left.png';
var img_heroe_right='imagenes/heroe_right.png';
var img_heroe_up='imagenes/heroe_up.png';
var img_bala_down='imagenes/bala_down.png';
var img_bala_left='imagenes/bala_left.png';
var img_bala_right='imagenes/bala_right.png';
var img_bala_up='imagenes/bala_up.png';
//Funcion que se encarga de crear los muros de metal
function crearMurosMetal(){
    for (var x = 0; x< dimensiones; x++) {
        matriz[x] = new Array(dimensiones);
        for (var y = 0; y < dimensiones; y++) {
            if(y===0 || x===0 || y===19 || x===19){
                var b_metal=new Bloque_metal('bm',img_bloque_metal,true);
                matriz[x][y] = b_metal;
            }
            else{
                var b_vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[x][y] = b_vacio;
            }

        }
    }
}
//Funcion que retorna un numero random
function generaRandom(inicio,final){
    var x = Math.floor((Math.random() * final) + inicio);
    return x;
}
//Funcion que se encarga de colocar los bloques de concreto
function colocarConcretoRandom(){
    var contador=0;
    while(contador!=cantidad_concreto){
        var x=0;
        var y=0;
        while(matriz[x][y].nombre!='va'){
                x=generaRandom(1,19);
                y=generaRandom(1,19);
        }
        for (var i = 0; i < dimensiones; i++)
        {
            for (var j = 0; j < dimensiones; j++) {
                    if(x===i && y===j){
                        var b_concreto=new Bloque_concreto('bc',img_bloque_concreto,false);
                        matriz[x][y]=b_concreto;
                        contador=contador+1;
                }
            }
        }
    }
}
//Funcion que se encarga de colocar los objetivos
function colocarObjetivos(){
    var contador=0;
    while(contador!=objetivos_torres){
        var x=0;
        var y=0;
        while(matriz[x][y].nombre!='va'){
            x=generaRandom(1,19);
            y=generaRandom(1,19);
        }
        for (var i = 0; i < dimensiones; i++)
        {
            for (var j = 0; j < dimensiones; j++) {
                if(x===i && y===j){
                    var objetivo_primario=new Objetivo_primario('opn',img_objetivo_torre,false);
                    matriz[x][y]=objetivo_primario;
                    contador=contador+1;
                }
            }
        }
    }
    var contador=0;
    while(contador!=objetivos_nucleo){
        var x=0;
        var y=0;
        while(matriz[x][y].nombre!='va'){
            x=generaRandom(1,19);
            y=generaRandom(1,19);
        }
        for (var i = 0; i < dimensiones; i++)
        {
            for (var j = 0; j < dimensiones; j++) {
                if(x===i && y===j){
                    var objetivo_primario=new Objetivo_primario('opt',img_objetivo_nucleo,false);
                    matriz[x][y]=objetivo_primario;
                    contador=contador+1;
                }
            }
        }
    }
}
//Funcion que imprime la matriz de objetos
function imprimirMatrizLogica(){
    var fila="";
    for (var i = 0; i < dimensiones; i++)
    {
        for (var j = 0; j < dimensiones; j++) {
            fila=fila+"["+matriz[i][j].nombre+"]";
        }
        fila+='\n';
    }
    console.log(fila);
}
//Funcion que se encarga de validar el movimiento de un objeto
function validarMovimiento(x,y) {
    if(matriz[x][y].nombre==='va'){
        return true;
    }
    else{
        return false;
    }
}
//Funcion que se encarga de validar el disparo del heroe
function validarDisparo(x,y) {
    //matriz[x][y].nombre!='va'
    if(matriz[x][y].nombre!='bm'){
        return true;
    }
    else{
        return false;
    }
}
//Funcion que se encarga de validar el disparo del enemigo
function validarDisparoEnemigo(x,y) {
    //matriz[x][y].nombre!='va'
    if(matriz[x][y].nombre==='h'){
        return true;
    }
    else{
        return false;
    }
}
//Funcion que se encarga de pintar la pantalla
function pintarPantalla(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < dimensiones; i++)
    {
        for (var j = 0; j < dimensiones; j++){
            var img = new Image();
            img.src =matriz[i][j].fondo;
            ctx.drawImage(img,j*30,i*30);
            img.onload = function(){
                ctx.drawImage(img,j*30,i*30);
                ctx.restore();
            }
        }
    }
}
//Funcion que se encarga de limpiar las balas que haigan quedado regadas
function limpiarBalas(){
    for (var i = 0; i < dimensiones; i++)
    {
        for (var j = 0; j < dimensiones; j++){
            if(matriz[i][j].nombre==='b'){
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[i][j]=vacio;
            }
        }
    }
}
//Funcion que busca al heroe y lo retorna
function devuelveHeroe(){
    for(var x=0;x<dimensiones;x++){
        for(var y=0;y<dimensiones;y++){
            if(matriz[x][y].nombre==='h'){
                return matriz[x][y];
            }
        }
    }
}
//funcion que determina si el heroe aun existe
function existeHeroe() {
    for(var x=0;x<dimensiones;x++){
        for(var y=0;y<dimensiones;y++){
            if(matriz[x][y].nombre==='h'){
                return true;
            }
        }
    }
    return false;
}
//Funcion que determina si el heroe se encuentra cerca
function heroeCerca(enemigo){
    var heroe=devuelveHeroe();
    var dx=enemigo.x-heroe.x;
    var dy=enemigo.y-heroe.y;
    var pasos=dx+dy;//Suma de las distancias
    if(pasos<=5){
        return true;
    }
    else{
        return false;
    }
}

//Funcion que se encarga de mover al enemigo
function MoverEnemigo(enemigo){
        while(enemigo.vivo){
            var bleft=true;
            var brigth=true;
            var bup=true;
            var bdown=true;
            var movimiento=0;
            var x=enemigo.x;
            var y=enemigo.y;

            if(matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x-1][y].nombre==='va'){
                    enemigo.x=x-1;
                    enemigo.y=y;
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[x][y]=vacio;
                    enemigo.fondo=img_enemigo_up;
                    matriz[x-1][y]=enemigo;
                    bup=true;
                    bdown=false;
                    brigth=false;
                    bleft=false;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x+1][y].nombre==='va'){
                    enemigo.x=x+1;
                    enemigo.y=y;
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[x][y]=vacio;
                    enemigo.fondo=img_enemigo_up;
                    matriz[x+1][y]=enemigo;
                    bup=false;
                    bdown=true;
                    brigth=false;
                    bleft=false;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x][y+1].nombre==='va'){
                    enemigo.x=x;
                    enemigo.y=y+1;
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[x][y]=vacio;
                    enemigo.fondo=img_enemigo_right;
                    matriz[x][y+1]=enemigo;
                    bup=false;
                    bdown=false;
                    brigth=true;
                    bleft=false;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                if(matriz[x][y-1].nombre==='va'){
                    enemigo.x=x;
                    enemigo.y=y-1;
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[x][y]=vacio;
                    enemigo.fondo=img_enemigo_left;
                    matriz[x][y-1]=enemigo;
                    bup=false;
                    bdown=false;
                    brigth=false;
                    bleft=true;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
               // while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x-1][y].nombre==='va'){
                            enemigo.x=x-1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_up;
                            matriz[x-1][y]=enemigo;
                            bup=true;
                            bdown=false;
                            brigth=false;
                            bleft=false;

                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y+1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y+1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_right;
                            matriz[x][y+1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=true;
                            bleft=false;

                        }
                    }
                    pintarPantalla();
                //}
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va' && matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'){
                //while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x+1][y].nombre==='va'){
                            enemigo.x=x+1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_down;
                            matriz[x+1][y]=enemigo;
                            bup=false;
                            bdown=true;
                            brigth=false;
                            bleft=false;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_left;
                            matriz[x][y-1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=false;
                            bleft=true;
                        }
                    }
                    pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x-1][enemigo.y].nombre==='va'&&matriz[enemigo.x][enemigo.y+1].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                //while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x+1][y].nombre==='va'){
                            enemigo.x=x+1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_down;
                            matriz[x+1][y]=enemigo;
                            bup=false;
                            bdown=true;
                            brigth=false;
                            bleft=false;

                        }
                    }
                    if(movimiento===2){
                        if(matriz[x-1][y].nombre==='va'){
                            enemigo.x=x-1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_up;
                            matriz[x-1][y]=enemigo;
                            bup=true;
                            bdown=false;
                            brigth=false;
                            bleft=false;

                        }
                    }
                    pintarPantalla();
                //}
            }
            else if(matriz[enemigo.x][enemigo.y+1].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'&&matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x-1][enemigo.y].nombre!='va'){
                //while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x][y+1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y+1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_right;
                            matriz[x][y+1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=true;
                            bleft=false;

                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_left;
                            matriz[x][y-1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=false;
                            bleft=true;

                        }
                    }
                    pintarPantalla();
               // }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'&&matriz[enemigo.x][enemigo.y+1].nombre!='va' && matriz[enemigo.x+1][enemigo.y].nombre!='va'){
               // while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x-1][y].nombre==='va'){
                            enemigo.x=x-1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_up;
                            matriz[x-1][y]=enemigo;
                            bup=true;
                            bdown=false;
                            brigth=false;
                            bleft=false;

                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_left;
                            matriz[x][y-1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=false;
                            bleft=true;

                        }
                    }
                    pintarPantalla();
                //}
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
               // while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x+1][y].nombre==='va'){
                            enemigo.x=x+1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_down;
                            matriz[x+1][y]=enemigo;
                            bup=false;
                            bdown=true;
                            brigth=false;
                            bleft=false;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y+1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y+1;
                            var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                            matriz[x][y]=vacio;
                            enemigo.fondo=img_enemigo_right;
                            matriz[x][y+1]=enemigo;
                            bup=false;
                            bdown=false;
                            brigth=true;
                            bleft=false;

                        }
                    }
                    pintarPantalla();
                }
                //Validaciones de 3 opciones de moverse
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_down;
                        matriz[x+1][y]=enemigo;
                        bup=false;
                        bdown=true;
                        brigth=false;
                        bleft=false;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_right;
                        matriz[x][y+1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=true;
                        bleft=false;

                    }
                }
                if(movimiento===3){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_up;
                        matriz[x-1][y]=enemigo;
                        bup=true;
                        bdown=false;
                        brigth=false;
                        bleft=false;

                    }
                }
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_down;
                        matriz[x+1][y]=enemigo;
                        bup=false;
                        bdown=true;
                        brigth=false;
                        bleft=false;

                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_right;
                        matriz[x][y+1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=true;
                        bleft=false;

                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_left;
                        matriz[x][y-1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=false;
                        bleft=true;
                    }
                }
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_down;
                        matriz[x+1][y]=enemigo;
                        bup=false;
                        bdown=true;
                        brigth=false;
                        bleft=false;

                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_right;
                        matriz[x][y+1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=true;
                        bleft=false;

                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_left;
                        matriz[x][y-1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=false;
                        bleft=true;
                    }
                }
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_up;
                        matriz[x-1][y]=enemigo;
                        bup=true;
                        bdown=false;
                        brigth=false;
                        bleft=false;

                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_right;
                        matriz[x][y+1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=true;
                        bleft=false;

                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_left;
                        matriz[x][y-1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=false;
                        bleft=true;
                    }
                }
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,4);
                if(movimiento===1){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_up;
                        matriz[x-1][y]=enemigo;
                        bup=true;
                        bdown=false;
                        brigth=false;
                        bleft=false;

                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_right;
                        matriz[x][y+1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=true;
                        bleft=false;

                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_left;
                        matriz[x][y-1]=enemigo;
                        bup=false;
                        bdown=false;
                        brigth=false;
                        bleft=true;
                    }
                }
                if(movimiento===4){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                        matriz[x][y]=vacio;
                        enemigo.fondo=img_enemigo_down;
                        matriz[x+1][y]=enemigo;
                        bup=false;
                        bdown=true;
                        brigth=false;
                        bleft=false;
                    }
                }
                pintarPantalla();
            }
            if(existeHeroe()){
                if(heroeCerca(enemigo)){
                    if(bdown){
                        var temx=enemigo.x+1;
                        var tempy=enemigo.y;
                        while(matriz[temx][tempy].nombre==='va'){
                            var temp_bala=new Bala('b',img_bala_down);
                            matriz[temx][tempy]=temp_bala;
                            temx=temx+1;
                        }
                        pintarPantalla();
                        limpiarBalas();
                        if(validarDisparoEnemigo(temx,tempy)){
                            vidas=vidas-1;
                            if(vidas===0){
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                imprimirMatrizLogica();
                                document.getElementById("t_vidas").innerHTML=vidas;
                                var canvas = document.getElementById("myCanvas");
                                var ctx = canvas.getContext("2d");
                                ctx.fillText("Juego perdido",50,50);
                            }
                            else{
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                imprimirMatrizLogica();
                                alert("Te quedan "+vidas+" vidas");
                                iniciarJuego();
                                document.getElementById("t_vidas").innerHTML=vidas;
                            }
                        }
                    }
                    if(bup){
                        var temx=enemigo.x-1;
                        var tempy=enemigo.y;
                        while(matriz[temx][tempy].nombre==='va'){
                            var temp_bala=new Bala('b',img_bala_down);
                            matriz[temx][tempy]=temp_bala;
                            temx=temx+1;
                        }
                        limpiarBalas();
                        pintarPantalla();
                        if(validarDisparoEnemigo(temx,tempy)){
                            vidas=vidas-1;
                            if(vidas===0){
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                document.getElementById("t_vidas").innerHTML=vidas;
                                var canvas = document.getElementById("myCanvas");
                                var ctx = canvas.getContext("2d");
                                ctx.fillText("Juego perdido",50,50);
                                terminoPartida();
                            }
                            else{
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                alert("Te quedan "+vidas+" vidas");
                                iniciarJuego();
                                document.getElementById("t_vidas").innerHTML=vidas;
                            }
                        }
                    } if(bleft){
                        var temx=enemigo.x;
                        var tempy=enemigo.y-1;
                        while(matriz[temx][tempy].nombre==='va'){
                            var temp_bala=new Bala('b',img_bala_down);
                            matriz[temx][tempy]=temp_bala;
                            //doDelay(10);
                            temx=temx+1;
                        }
                        limpiarBalas();
                        pintarPantalla();
                        if(validarDisparoEnemigo(temx,tempy)){
                            //vida=vida-20;
                            vidas=vidas-1;
                            if(vidas===0){
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                document.getElementById("t_vidas").innerHTML=vidas;
                                var canvas = document.getElementById("myCanvas");
                                var ctx = canvas.getContext("2d");
                                ctx.fillText("Juego perdido",50,50);
                            }
                            else{
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                alert("Te quedan "+vidas+" vidas");
                                iniciarJuego();
                                document.getElementById("t_vidas").innerHTML=vidas;
                            }
                        }
                    }if(brigth){
                        var temx=enemigo.x;
                        var tempy=enemigo.y+1;
                        while(matriz[temx][tempy].nombre==='va'){
                            var temp_bala=new Bala('b',img_bala_down);
                            matriz[temx][tempy]=temp_bala;
                            //doDelay(10);
                            temx=temx+1;
                        }
                        limpiarBalas();
                        pintarPantalla();
                        if(validarDisparoEnemigo(temx,tempy)){
                            //vida=vida-20;
                            vidas=vidas-1;
                            if(vidas===0){
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                document.getElementById("t_vidas").innerHTML=vidas;
                                var canvas = document.getElementById("myCanvas");
                                var ctx = canvas.getContext("2d");
                                ctx.fillText("Juego perdido",50,50);
                                alert("Juego perdido");
                            }
                            else{
                                matriz[temx][tempy].vidas=vidas;
                                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                                matriz[temx][tempy]=vacio;
                                pintarPantalla();
                                alert("Te quedan "+vidas+" vidas");
                                iniciarJuego();
                                document.getElementById("t_vidas").innerHTML=vidas;
                            }
                        }
                    }
                }
            }
        }
}
//Funcion que ejecuta todos los hilos con cada enemigo existente
function moverEnemigos(){
        for(var x=0;x<listaEnemigos.length;x++){
            Concurrent.Thread.create(MoverEnemigo, listaEnemigos[x]);
        }
}
//Funcion que se encarga de colocar los enemigos en el terreno de juego
function colocarEnemigos(){
    var contador=0;
    while(contador!=enemigos){
        var x=0;
        var y=0;
        while(matriz[x][y].nombre!='va'){
            x=generaRandom(1,19);
            y=generaRandom(1,19);
        }
        for (var i = 0; i < dimensiones; i++)
        {
            for (var j = 0; j < dimensiones; j++) {
                if(x===i && y===j){
                    var temp=generaRandom(1,3);
                    if(temp===1){
                        var enemigo=new Tank1('t1',i,j,img_enemigo_down,'r',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    if(temp===2){
                        var enemigo=new Tank2('t2',i,j,img_enemigo_down,'c',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    if(temp===3){
                        var enemigo=new Tank3('t3',i,j,img_enemigo_down,'b',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    contador=contador+1;
                }
            }
        }
    }
    moverEnemigos();
    setTimeout(colocarEnemigos,60000);
}
//Funcion que ejecuta el nivel 1
function nivel2(){
    document.getElementById("t_vidas").innerHTML=vidas;
    document.getElementById("t_vida").innerHTML=vida;
    crearMurosMetal();
    colocarConcretoRandom();
    colocarObjetivos();
    colocarEnemigos();
    iniciarJuego();
    setTimeout(colocarEnemigos,60000);
}
//Funcion que ejecuta el nivel 1
function nivel3(){
    document.getElementById("t_vidas").innerHTML=vidas;
    document.getElementById("t_vida").innerHTML=vida;
    crearMurosMetal();
    colocarConcretoRandom();
    colocarObjetivos();
    colocarEnemigos();
    iniciarJuego();
    setTimeout(colocarEnemigos,60000);
}
//Funcion que se encarga de iniciar el juego del heroe
function iniciarJuego(){
    var px=1;
    var py=1;
    var bleft=true;
    var brigth=true;
    var bup=true;
    var bdown=true;
    var heroe_l=new Heroe('h',1,1,img_heroe_down,'disparar',vidas);
    matriz[px][py]=heroe_l;
    imprimirMatrizLogica();
    pintarPantalla();
    function anim(e){
        console.log(e.keyCode);
        if (e.keyCode === 39){
            var xtem=px;
            var ytem=py+1;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                py=py+1;
                var heroet=new Heroe('h',px,py,img_heroe_right,'disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=true;
                bup=false;
                bdown=false;
                imprimirMatrizLogica();
                pintarPantalla();
            }else{
                bleft=false;
                brigth=true;
                bup=false;
                bdown=false;
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,img_heroe_right,'disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 37){
            var xtem=px;
            var ytem=py-1;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                py=py-1;
                var heroet=new Heroe('h',px,py,img_heroe_left,'disparar',vidas);
                matriz[px][py]=heroet;
                bleft=true;
                brigth=false;
                bup=false;
                bdown=false;
                imprimirMatrizLogica();
                pintarPantalla();
            }else{
                bleft=true;
                brigth=false;
                bup=false;
                bdown=false;
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,img_heroe_left,'disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 40){
            var xtem=px+1;
            var ytem=py;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                px=px+1;
                var heroet=new Heroe('h',px,py,img_heroe_down,'disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=false;
                bdown=true;
                imprimirMatrizLogica();
                pintarPantalla();
            }else{
                bleft=false;
                brigth=false;
                bup=false;
                bdown=true;
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,img_heroe_down,'disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 38){
            var xtem=px-1;
            var ytem=py;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                px=px-1;
                var heroet=new Heroe('h',px,py,img_heroe_up,'disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=true;
                bdown=false;
                pintarPantalla();
            }else{
                var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,img_heroe_up,'disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=true;
                bdown=false;
                pintarPantalla();
            }
        }
        else if(e.keyCode===32){
            if(bleft){
                var temx=px;
                var tempy=py-1;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b',img_bala_left);
                    matriz[temx][tempy]=temp_bala;
                    pintarPantalla();
                    // doDelay(10);
                    tempy=tempy-1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    if(matriz[temx][tempy].nombre==='t1'||matriz[temx][tempy].nombre==='t2'|| matriz[temx][tempy].nombre==='t3'){
                        matriz[temx][tempy].vivo=false;
                    }
                    if(matriz[temx][tempy].nombre==='opn'){
                        objetivos_nucleo=objetivos_nucleo-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    if(matriz[temx][tempy].nombre==='opt'){
                        objetivos_torres=objetivos_torres-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[temx][tempy]=vacio;
                    pintarPantalla();
                }
            }
            if(brigth){
                var temx=px;
                var tempy=py+1;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b',img_bala_right);
                    matriz[temx][tempy]=temp_bala;
                    pintarPantalla();
                    //doDelay(10);
                    tempy=tempy+1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    if(matriz[temx][tempy].nombre==='t1'||matriz[temx][tempy].nombre==='t2'|| matriz[temx][tempy].nombre==='t3'){
                        matriz[temx][tempy].vivo=false;
                    }
                    if(matriz[temx][tempy].nombre==='opn'){
                        objetivos_nucleo=objetivos_nucleo-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    if(matriz[temx][tempy].nombre==='opt'){
                        objetivos_torres=objetivos_torres-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[temx][tempy]=vacio;
                    pintarPantalla();
                }
            }
            if(bup){
                var temx=px-1;
                var tempy=py;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b',img_bala_up);
                    matriz[temx][tempy]=temp_bala;
                    pintarPantalla();
                    //doDelay(10);
                    temx=temx-1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    if(matriz[temx][tempy].nombre==='t1'||matriz[temx][tempy].nombre==='t2'|| matriz[temx][tempy].nombre==='t3'){
                        matriz[temx][tempy].vivo=false;
                    }
                    if(matriz[temx][tempy].nombre==='opn'){
                        objetivos_nucleo=objetivos_nucleo-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    if(matriz[temx][tempy].nombre==='opt'){
                        objetivos_torres=objetivos_torres-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[temx][tempy]=vacio;
                    pintarPantalla();
                }
            }
            if(bdown){
                var temx=px+1;
                var tempy=py;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b',img_bala_down);
                    matriz[temx][tempy]=temp_bala;
                    pintarPantalla();
                    //doDelay(10);
                    temx=temx+1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    if(matriz[temx][tempy].nombre==='t1'||matriz[temx][tempy].nombre==='t2'|| matriz[temx][tempy].nombre==='t3'){
                        matriz[temx][tempy].vivo=false;
                    }
                    if(matriz[temx][tempy].nombre==='opn'){
                        objetivos_nucleo=objetivos_nucleo-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    if(matriz[temx][tempy].nombre==='opt'){
                        objetivos_torres=objetivos_torres-1;
                        var objetivos_primarios=objetivos_nucleo+objetivos_torres;
                        if(objetivos_primarios===0){
                            alert("Has ganado el nivel "+nivel);
                            alert("Has ganado el nivel "+nivel);
                            if(nivel===1){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel2();
                            }
                            if(nivel===2){
                                nivel=nivel+1;
                                vidas=3;
                                vida=100;
                                nivel3();
                            }
                            if(nivel===3){
                                alert("Has ganado el juego felicidades");
                            }
                        }
                    }
                    var vacio=new Bloque_vacio('va',img_bloque_vacio,false);
                    matriz[temx][tempy]=vacio;
                    pintarPantalla();
                }
            }
        }
    } document.onkeydown = anim;
}
//Funcion que ejecuta el nivel 1
function nivel1(){
    document.getElementById("t_vidas").innerHTML=vidas;
    document.getElementById("t_vida").innerHTML=vida;
    crearMurosMetal();
    colocarConcretoRandom();
    colocarObjetivos();
    colocarEnemigos();
    iniciarJuego();
    setTimeout(colocarEnemigos,60000);
}
function main(){
    nivel1();
}
main();