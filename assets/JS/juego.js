// C = Clubs (treboles)
// S = Swords (espadas)
// D = Diamonds (diamantes)
// H = Hearts (corazones)

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0
    puntosSkynet = 0

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasSkynet = document.querySelector('#skynet-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta funcion me permite crear un nuevo Deck
const crearDeck = () =>{
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
    deck = _.shuffle(deck);
    console.log(deck);
}
crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
    //pedirCarta();
}

//Esta funcion le da valor a la carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN (valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}
//Turno de la computadora
const turnoSkynet = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosSkynet = puntosSkynet + valorCarta(carta);
        puntosHTML[1].innerText = puntosSkynet;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta'); 
        divCartasSkynet.append(imgCarta);
        if(puntosMinimos > 21){
            break;
        }
    }while(puntosSkynet < puntosMinimos && (puntosMinimos<=21));
    
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

//Elementos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta'); 
    divCartasJugador.append(imgCarta);
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
    turnoSkynet(puntosJugador);
})
//boton nuevo juego
// btnNuevo.addEventListener('click', () =>{
//     console.clear();
//     deck = [];
//     deck = crearDeck();

//     puntosJugador = 0;
//     puntosSkynet = 0;
//     puntosHTML[0].innerText =0;
//     puntosHTML[1].innerText =0;
//     divCartasSkynet.innerHTML = '';
//     divCartasJugador.innerHTML = '';
//     btnPedir.disabled = false;
//     btnDetener.disabled = false;
// });
btnNuevo.addEventListener('click', () => {
   
    console.clear();
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
    location.reload();
  
    
  
 });