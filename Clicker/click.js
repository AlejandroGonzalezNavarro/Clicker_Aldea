//Variables
var click = 1; //Clicks por click
var TotalM = 0; //Cuenta total de madera
var TotalP = 0; //Cuenta total de piedra
var TotalC = 0; //Cuenta total de comida
var CosteRec = 3; //Coste de mejorar la recoleccion(click)
//Edificios
var TotalA = 0; //Total de aldeanos
var TotalC1 = 0; //Total de chozas(solo para 1 aldeano)
//Trabajadores
var Workers = 0; //Total de trabajadores
var WorkerM = 0; //Autoclick de madera
var WorkerP = 0; //Autoclick de piedra
var WorkerC = 0; //Autoclick de comida
var WorkSpeed = 1000; //ms de Autoclick de trabajadores
var WorklvlM = 0; //Nivel de formacion de trabajadores madera
var WorklvlP = 0; //Nivel de formacion de trabajadores piedra
var WorklvlC = 0; //Nivel de formacion de trabajadores comida
var myopacity = 1; //Opacidad usada en el efecto Fade
//Funciones
/*--------------VARIOS--------------*/
//Hace un efecto fade de los elementos con id especificados en elem
function Fade(elem,c) {
    var e = document.getElementById(elem);
    if (c == 1) {
        e.style.opacity = 1;
    }
    var FadeEffect = setInterval(function () {
        if (e.style.opacity > 0) {
            e.style.opacity -= 0.1;
        } else {
            clearInterval(FadeEffect);
            e.innerHTML = "";
        }
    }, 100);
}
//Hace un aviso cuando no tienes recursos para comprar la mejora
function SinRec(Recurso) {
    var e = document.getElementById(Recurso);
    e.innerHTML = ' No tienes suficientes recursos';
    Fade(Recurso,1);
}
//Hace un aviso cuando no tienes casas para contener aldeanos
function SinEsp(Recurso) {
    var e = document.getElementById(Recurso);
    e.innerHTML = ' No tienes suficientes casas';
    Fade(Recurso,1);
}
//
function SinAld(Recurso) {
    var e = document.getElementById(Recurso);
    e.innerHTML = ' No hay suficientes aldeanos';
    Fade(Recurso,1);
}
//Actualiza el coste de los recursos para mejorar el click
function Actualizar_Coste() {
    var Cost = Math.pow(3, click);
    var e = document.getElementById("click_incrp");
    e.innerHTML = Cost;
    var e = document.getElementById("click_incrm");
    e.innerHTML = Cost;
}
//Intervalo en el que se quita comida por cada aldeano, si la comida llega a cero los aldeanos moriran poco a poco
function Deglucion(){
    setInterval(function () {
        if(WorkerM > 0){
            TotalM += 3*WorkerM;
            Actualizar_Madera();
        }
        if(WorkerP > 0){
            TotalP += 3*WorkerP;
            Actualizar_Piedra();
        }
        if(WorkerC > 0){
            TotalC += 3*WorkerC;
            Actualizar_Comida();
        }
        if(TotalC > 0){
            TotalC -= TotalA*2;
            Actualizar_Comida();
        }
        if(TotalC <= 0){
            TotalC = 0;
            Actualizar_Comida();
            if(TotalA > 0){
                Muerte_Aldeano();
            }
        }
    }, WorkSpeed);
}
//Al activarse reduce el numero de aldeanos, su consumo de alimento y su produccion de alimento
function Muerte_Aldeano() {
    var resta = Math.ceil(TotalA/10);
    TotalA -= resta;
    Actualizar_Aldeano();
    Actualizar_produccionC();
    var x = Math.floor(Math.random() * 3) + 1;
    if(x <= 1){
        Workers -=resta;
        WorkerC -=resta;
        Actualizar_WorkC();
    } else if(x == 2){
        Workers -=resta;
        WorkerP -=resta;
        Actualizar_WorkP();
    } else if(x == 3){
        Workers -=resta;
        WorkerM -=resta;
        Actualizar_WorkM();
    }
    Actualizar_WorkNo();
}
/*--------------CONTADORES--------------*/
//Contador de madera
function Actualizar_Madera() {
    var e = document.getElementById("totalM");
    e.innerHTML = TotalM;
}
//Contador de piedra
function Actualizar_Piedra() {
    var e = document.getElementById("totalP");
    e.innerHTML = TotalP;
}
//Contador de comida
function Actualizar_Comida() {
    var e = document.getElementById("totalC");
    e.innerHTML = TotalC;
}
//Produccion de Madera
function Actualizar_produccionM() {
    var e = document.getElementById("ProduccionM");
    e.innerHTML = ' '+ (WorkerM*3) +'/s';
}
//Produccion de Piedra
function Actualizar_produccionP() {
    var e = document.getElementById("ProduccionP");
    e.innerHTML = ' '+(WorkerP*3)+'/s';
}
//Produccion de Comida
function Actualizar_produccionC() {
    var e = document.getElementById("ProduccionC");
    e.innerHTML = ' '+ (0 - TotalA*2 + WorkerC*3) +'/s';
}
//Contador de aldeanos
function Actualizar_Aldeano() {
    var e = document.getElementById("totalA");
    e.innerHTML = TotalA;
}
//Contador de chozas
function Actualizar_Choza() {
    var e = document.getElementById("totalC1");
    e.innerHTML = TotalC1;
}
//Contador de aldeanos no trabajadores
function Actualizar_WorkNo() {
    var e = document.getElementById("WorkNo");
    e.innerHTML = TotalA - Workers;
}
//Contador de trabajadores madera
function Actualizar_WorkM() {
    var e = document.getElementById("WorkM");
    e.innerHTML = WorkerM;
}
//Contador de trabajadores piedra
function Actualizar_WorkP() {
    var e = document.getElementById("WorkP");
    e.innerHTML = WorkerP;
}
//Contador de trabajadores comida
function Actualizar_WorkC() {
    var e = document.getElementById("WorkC");
    e.innerHTML = WorkerC;
}
/*--------------CLICKS--------------*/
//Click Madera
document.getElementById("clickM").onclick = function() {
    TotalM = parseFloat(TotalM) + parseFloat(click);
    Actualizar_Madera();
};
//Click Piedra
document.getElementById("clickP").onclick = function() {
    TotalP = parseFloat(TotalP) + parseFloat(click);
    Actualizar_Piedra();
};
//Click Comida
document.getElementById("clickC").onclick = function() {
    TotalC = parseFloat(TotalC) + parseFloat(click);
    Actualizar_Comida();
};
//Incremento de Clicks por click
document.getElementById("Mejorar_recoleccion").onclick = function() {
    var Cost = Math.pow(3, click);
    if(TotalM < Cost || TotalP < Cost){
        SinRec("SinRecoleccion");
    } else {
        CosteRec = Math.pow(3, click);
        click = Math.ceil(click*1.01);
        TotalM = parseFloat(TotalM)-parseFloat(CosteRec);
        Actualizar_Madera();
        TotalP = parseFloat(TotalP)-parseFloat(CosteRec);
        Actualizar_Piedra();
        Actualizar_Coste();
    }
};
/*--------------EDIFICIOS--------------*/
//Click Aldeano
document.getElementById("clickA").onclick = function() {
    if(TotalA == TotalC1){
        SinEsp("SinAldeano")
    } else if(TotalC < 20){
        SinRec("SinAldeano");
    } else {
        TotalC -= 20;
        Actualizar_Comida();
        TotalA +=  1;
        Actualizar_Aldeano();
        Actualizar_produccionC();
        Actualizar_WorkNo();
    }
};
//Click choza
document.getElementById("clickC1").onclick = function() {
    if(TotalM < 20){
        SinRec("SinChoza");
    } else {
        TotalC1 += 1;
        Actualizar_Choza();
        TotalM -= 20;
        Actualizar_Madera();
    }
};
/*--------------TRABAJADORES--------------*/
//Leñadores, ganan madera por tiempo
document.getElementById("clickworkM").onclick = function() {
    if(Workers > TotalA){
        WorkerM -= 1;
        Workers -= 1;
        var e = document.getElementById("WorkM");
        e.innerHTML = WorkerM;
        Actualizar_produccionM();
        Actualizar_WorkNo();
    }
    if(Workers == TotalA){
        SinAld("SinWorkM");
    } else {
        WorkerM += 1;
        Workers += 1;
        var e = document.getElementById("WorkM");
        e.innerHTML = WorkerM;
        Actualizar_produccionM();
        Actualizar_WorkNo();
    }
};
//Mineros, ganan piedra por tiempo
document.getElementById("clickworkP").onclick = function() {
    if(Workers > TotalA){
        WorkerP -= 1;
        Workers -= 1;
        var e = document.getElementById("WorkP");
        e.innerHTML = WorkerP;
        Actualizar_produccionP();
        Actualizar_WorkNo();
    }
    if(Workers == TotalA){
        SinAld("SinWorkP");
    } else {
        WorkerP += 1;
        Workers += 1;
        var e = document.getElementById("WorkP");
        e.innerHTML = WorkerP;
        Actualizar_produccionP();
        Actualizar_WorkNo();
    }
};
//Recolectores, ganan comida por tiempo
document.getElementById("clickworkC").onclick = function() {
    if(Workers > TotalA){
        WorkerC -= 1;
        Workers -= 1;
        var e = document.getElementById("WorkC");
        e.innerHTML = WorkerC;
        Actualizar_produccionC();
        Actualizar_WorkNo();
    }
    if(Workers == TotalA){
        SinAld("SinWorkC");
    } else {
        WorkerC += 1;
        Workers += 1;
        var e = document.getElementById("WorkC");
        e.innerHTML = WorkerC;
        Actualizar_produccionC();
        Actualizar_WorkNo();
    }
};