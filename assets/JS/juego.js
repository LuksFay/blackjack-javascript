(()=>{
    'use strict'
    
let deck = [];
const tipos = ['C','D','H','S'],
     especiales = ['A','J','Q','K'];


let puntosJugadores = [];

//Referencias del HTML
const   btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML = document.querySelectorAll('small');

      //Esta funcion inicializa el juego    
const inicializarJuego = (numJugadores = 2) => {
       deck =  crearDeck();
       puntosJugadores = [];
       for( let i = 0; i<numJugadores; i++){
           puntosJugadores.push(0);
       }
      puntosHTML.forEach(elem => elem.innerText=0);
     divCartasJugadores.forEach(elem => elem.innerHTML='');
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    }
//Esta funcion me permite crear un nuevo Deck
const crearDeck = () =>{

    deck = [];
    for( let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp+tipo);
        }
    }   
    return _.shuffle(deck);
}


//Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
    
}

//Esta funcion le da valor a la carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN (valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}
//turno : 0 = primer jugador y el ultimo sera la computadora
const acumularPuntos = (carta, turno)=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}
const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta); 
        
}
const determinarGanador = () => {

    const [puntosMinimos, puntosSkynet] = puntosJugadores;
    setTimeout(()=>{
        if(puntosSkynet === puntosMinimos){
            alert('Nadie Gana :c');
        }else if (puntosMinimos > 21 ){
            alert('Skynet ganó');
        }else if (puntosSkynet>21){
            alert('Jugador Gana');
        }else{
            alert('Skynet Gana');
        }
        },1000);
        
}
//Turno de la computadora
const turnoSkynet = (puntosMinimos) => {
    let puntosSkynet =  0;

    do{
        const carta = pedirCarta();
        puntosSkynet = acumularPuntos(carta, puntosJugadores.length-1);
        crearCarta(carta, puntosJugadores.length-1);
        
        
    }while(puntosSkynet < puntosMinimos && (puntosMinimos<=21));
    
    determinarGanador();
   
}

//Elementos
//Boton Pedir
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    
    if(puntosJugador > 21){
        console.warn('Perdiste hijo de puta! >:c');
        btnPedir.disabled = true;
        btnDetener.desabled=true;
        turnoSkynet(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('21, piola!');
        btnDetener.desabled=true;
        btnPedir.disabled = true;
        turnoSkynet(puntosJugador);
    }
});

//boton detener
btnDetener.addEventListener('click', () =>{
    btnPedir.disabled=true;
    btnDetener.desabled=true;
    turnoSkynet(puntosJugadores[0]);
})

// boton nuevo juego
btnNuevo.addEventListener('click', () =>{
    
    inicializarJuego();
    
});

})();

