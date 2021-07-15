# BlackJack
A js BlackJack game practice

## Usage

###FlowChart
```flow
st=>start: Pedir Carta
op=>operation: Aparece la Carte
cond=>condition: ¿sus puntos son 21 o cercanos a el numero? Yes or No?
e=>end: Detener

st->op->cond
cond(yes)->e
cond(no)->op
```
