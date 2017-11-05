/**
 * Created by Andres on 11/4/2017.
 */
var dimensiones=20;
var matriz=new Array(dimensiones);
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
//This function return a number random between of 1 and 8
function generaRandom(inicio,final){
    var x = Math.floor((Math.random() * final) + inicio);
    return x;
}
function colocarConcretoRandom(){
    var contador=0;
    while(contador!=200){
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
colocarConcretoRandom();
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
            }
        }
    }
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
function limpiarBalas() {
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
    var heroe_l=new Heroe('h',1,1,'imagenes/heroe_down.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_right.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_right.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_left.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_left.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_down.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_down.bmp','disparar',3);
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
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_up.bmp','disparar',3);
                matriz[px][py]=heroet;
                bleft=false;
                brigth=false;
                bup=true;
                bdown=false;
                imprimirMatrizLogica();
                pintarPantalla();
            }else{
                var heroet=new Heroe('h',px*30,py*30,'imagenes/heroe_up.bmp','disparar',3);
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
                    //sleep(5000);
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
                    //sleep(5000);
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
iniciarJuego();