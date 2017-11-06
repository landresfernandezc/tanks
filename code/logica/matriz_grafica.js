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
function crearMurosMetal(){
    for (var x = 0; x< dimensiones; x++) {
        matriz[x] = new Array(dimensiones);
        for (var y = 0; y < dimensiones; y++) {
            if(y===0 || x===0 || y===19 || x===19){
                var b_metal=new Bloque_metal('bm','imagenes/bloque_metal.png',true);
                matriz[x][y] = b_metal;
            }
            else{
                var b_vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[x][y] = b_vacio;
            }

        }
    }
}
//This function return a number random between of 1 and 8
function generaRandom(inicio,final){
    var x = Math.floor((Math.random() * final) + inicio);
    return x;
}
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
                        var b_concreto=new Bloque_concreto('bc','imagenes/bloque_concreto.png',false);
                        matriz[x][y]=b_concreto;
                        contador=contador+1;
                }
            }
        }
    }
}

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
                    var objetivo_primario=new Objetivo_primario('op','imagenes/objetivo_torre.png',false);
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
                    var objetivo_primario=new Objetivo_primario('bc','imagenes/primario_nucleo.png',false);
                    matriz[x][y]=objetivo_primario;
                    contador=contador+1;
                }
            }
        }
    }
}
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
                        var enemigo=new Tank1('t1',i,j,'imagenes/tank_down.bmp','r',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    if(temp===2){
                        var enemigo=new Tank2('t2',i,j,'imagenes/tank_down.bmp','c',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    if(temp===3){
                        var enemigo=new Tank3('t3',i,j,'imagenes/tank_down.bmp','b',true);
                        matriz[x][y]=enemigo;
                        listaEnemigos.push(enemigo);
                    }
                    contador=contador+1;
                }
            }
        }
    }
}
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
function validarMovimiento(x,y) {
    if(matriz[x][y].nombre==='va'){
        return true;
    }
    else{
        return false;
    }
}
function validarDisparo(x,y) {
    //matriz[x][y].nombre!='va'
    if(matriz[x][y].nombre!='bm'){
        return true;
    }
    else{
        return false;
    }
}
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
function limpiarBalas(){
    for (var i = 0; i < dimensiones; i++)
    {
        for (var j = 0; j < dimensiones; j++){
            if(matriz[i][j].nombre==='b'){
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[i][j]=vacio;
            }
        }
    }
}
function iniciarJuego(){
    var px=1;
    var py=1;
    var bleft=true;
    var brigth=true;
    var bup=true;
    var bdown=true;
    var heroe_l=new Heroe('h',1,1,'imagenes/heroe_down.png','disparar',vidas);
    matriz[px][py]=heroe_l;
    imprimirMatrizLogica();
    pintarPantalla();
    function anim(e){
        console.log(e.keyCode);
        if (e.keyCode === 39){
            var xtem=px;
            var ytem=py+1;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                py=py+1;
                var heroet=new Heroe('h',px,py,'imagenes/heroe_right.png','disparar',vidas);
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
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,'imagenes/heroe_right.png','disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 37){
            var xtem=px;
            var ytem=py-1;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                py=py-1;
                var heroet=new Heroe('h',px,py,'imagenes/heroe_left.png','disparar',vidas);
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
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,'imagenes/heroe_left.png','disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 40){
            var xtem=px+1;
            var ytem=py;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                px=px+1;
                var heroet=new Heroe('h',px,py,'imagenes/heroe_down.png','disparar',vidas);
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
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,'imagenes/heroe_down.png','disparar',vidas);
                matriz[px][py]=heroet;
                pintarPantalla();
            }
        }
        else if (e.keyCode === 38){
            var xtem=px-1;
            var ytem=py;
            if(validarMovimiento(xtem,ytem)){
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                px=px-1;
                var heroet=new Heroe('h',px,py,'imagenes/heroe_up.png','disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=true;
                bdown=false;
                imprimirMatrizLogica();
                pintarPantalla();
            }else{
                var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                matriz[px][py]=vacio;
                pintarPantalla();
                var heroet=new Heroe('h',px,py,'imagenes/heroe_up.png','disparar',vidas);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=true;
                bdown=false;
                imprimirMatrizLogica();
                pintarPantalla();
            }
        }
        else if(e.keyCode===32){
            if(bleft){
                var temx=px;
                var tempy=py-1;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b','imagenes/bala_left.png');
                    matriz[temx][tempy]=temp_bala;
                    imprimirMatrizLogica();
                    pintarPantalla();
                   // doDelay(10);
                    tempy=tempy-1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[temx][tempy]=vacio;
                    imprimirMatrizLogica();
                    pintarPantalla();
                }
            }
            if(brigth){
                var temx=px;
                var tempy=py+1;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b','imagenes/bala_right.png');
                    matriz[temx][tempy]=temp_bala;
                    imprimirMatrizLogica();
                    pintarPantalla();
                    //doDelay(10);
                    tempy=tempy+1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[temx][tempy]=vacio;
                    imprimirMatrizLogica();
                    pintarPantalla();
                }
            }
            if(bup){
                var temx=px-1;
                var tempy=py;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b','imagenes/bala_up.png');
                    matriz[temx][tempy]=temp_bala;
                    imprimirMatrizLogica();
                    pintarPantalla();
                    //doDelay(10);
                    temx=temx-1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[temx][tempy]=vacio;
                    imprimirMatrizLogica();
                    pintarPantalla();
                }
            }
            if(bdown){
                var temx=px+1;
                var tempy=py;
                while(matriz[temx][tempy].nombre==='va'){
                    var temp_bala=new Bala('b','imagenes/bala_down.png');
                    matriz[temx][tempy]=temp_bala;
                    imprimirMatrizLogica();
                    pintarPantalla();
                    //doDelay(10);
                    temx=temx+1;
                }
                limpiarBalas();
                pintarPantalla();
                if(validarDisparo(temx,tempy)){
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[temx][tempy]=vacio;
                    imprimirMatrizLogica();
                    pintarPantalla();
                }
            }
        }
    } document.onkeydown = anim;
}
function MoverEnemigo(enemigo){
        while(enemigo.vivo){
            var movimiento=0;
            var x=enemigo.x;
            var y=enemigo.y;
            if(matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x-1][y].nombre==='va'){
                    enemigo.x=x-1;
                    enemigo.y=y;
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[x][y]=vacio;
                    matriz[x-1][y]=enemigo;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x+1][y].nombre==='va'){
                    enemigo.x=x+1;
                    enemigo.y=y;
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[x][y]=vacio;
                    matriz[x+1][y]=enemigo;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                if(matriz[x][y+1].nombre==='va'){
                    enemigo.x=x;
                    enemigo.y=y+1;
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[x][y]=vacio;
                    matriz[x][y+1]=enemigo;
                    pintarPantalla();
                }
            }
            else if(matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&& matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                if(matriz[x][y-1].nombre==='va'){
                    enemigo.x=x;
                    enemigo.y=y-1;
                    var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                    matriz[x][y]=vacio;
                    matriz[x][y-1]=enemigo;
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
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x-1][y]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y+1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y+1;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y+1]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
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
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x+1][y]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y-1]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
                    pintarPantalla();
                //}
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x-1][enemigo.y].nombre==='va'&&matriz[enemigo.x][enemigo.y+1].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre!='va'){
                //while(matriz[x][y].nombre!='va'){
                    movimiento=generaRandom(1,2);
                    if(movimiento===1){
                        if(matriz[x+1][y].nombre==='va'){
                            enemigo.x=x+1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x+1][y]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x-1][y].nombre==='va'){
                            enemigo.x=x-1;
                            enemigo.y=y;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x-1][y]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
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
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y+1]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y-1]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
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
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x-1][y]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y-1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y-1;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y-1]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
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
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x+1][y]=enemigo;
                        }
                    }
                    if(movimiento===2){
                        if(matriz[x][y+1].nombre==='va'){
                            enemigo.x=x;
                            enemigo.y=y+1;
                            var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                            matriz[x][y]=vacio;
                            matriz[x][y+1]=enemigo;
                        }
                    }
                    imprimirMatrizLogica();
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
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x+1][y]=enemigo;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y+1]=enemigo;
                    }
                }
                if(movimiento===3){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x-1][y]=enemigo;
                    }
                }
                imprimirMatrizLogica();
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x+1][y]=enemigo;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y+1]=enemigo;
                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y-1]=enemigo;
                    }
                }
                imprimirMatrizLogica();
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre!='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x+1][y]=enemigo;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y+1]=enemigo;
                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y-1]=enemigo;
                    }
                }
                imprimirMatrizLogica();
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre!='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,3);
                if(movimiento===1){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x-1][y]=enemigo;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y+1]=enemigo;
                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y-1]=enemigo;
                    }
                }
                imprimirMatrizLogica();
                pintarPantalla();
            }
            else if(matriz[enemigo.x+1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y+1].nombre==='va'&&matriz[enemigo.x-1][enemigo.y].nombre==='va' && matriz[enemigo.x][enemigo.y-1].nombre==='va'){
                // while(matriz[x][y].nombre!='va'){
                movimiento=generaRandom(1,4);
                if(movimiento===1){
                    if(matriz[x-1][y].nombre==='va'){
                        enemigo.x=x-1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x-1][y]=enemigo;
                    }
                }
                if(movimiento===2){
                    if(matriz[x][y+1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y+1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y+1]=enemigo;
                    }
                }
                if(movimiento===3){
                    if(matriz[x][y-1].nombre==='va'){
                        enemigo.x=x;
                        enemigo.y=y-1;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x][y-1]=enemigo;
                    }
                }
                if(movimiento===4){
                    if(matriz[x+1][y].nombre==='va'){
                        enemigo.x=x+1;
                        enemigo.y=y;
                        var vacio=new Bloque_vacio('va','imagenes/bloque_vacio.jpg',false);
                        matriz[x][y]=vacio;
                        matriz[x+1][y]=enemigo;
                    }
                }
                imprimirMatrizLogica();
                pintarPantalla();
            }
        }



}
function moverEnemigos(){
        for(var x=0;x<listaEnemigos.length;x++){
            //MoverEnemigo(listaEnemigos[x]);
            Concurrent.Thread.create(MoverEnemigo, listaEnemigos[x]);
        }
}
function main() {
    crearMurosMetal();
    colocarConcretoRandom();
    colocarObjetivos();
    colocarEnemigos();
    moverEnemigos();
    iniciarJuego();
}
main();