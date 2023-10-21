

// Posição atual da bola [X, Y]
var posAtual = [0, 0];

// Número de rebatidas ocorridas durante o jogo
var batidas = 0;

// Velocidade original da bola na horizontal
var movOriginalHori = 5;

// Velocidade original da bola na vertical
var movOriginalVerti = 5;

// A velocidade que a bola esta indo atualmente na horizontal
var direcaoHori;

// A velocidade que a bola esta indo atualmente na vertical
var direcaoVerti;

// Largura da tela
var largTela = document.getElementById('mesa').clientWidth;

// Altura da tela
var altTela = document.getElementById('mesa').clientHeight;

// Posição do mouse
var mousePosition;

// Coloca o primeiro Stick no meio da tela
document.getElementById('p1').style.top = parseInt(altTela / 2) + 'px';

// Coloca o segundo Stick no meio da tela
document.getElementById('p2').style.top = parseInt(altTela / 2) + 'px';

// As alturas do primeiro e do segund o Stick
var posP = [[80, parseInt(altTela / 2)], [80, parseInt(altTela / 2)]];

// Pega a altura dos Sticks
var tamP = [[document.getElementById('p1').clientWidth, document.getElementById('p1').clientHeight], [document.getElementById('p2').clientWidth, document.getElementById('p2').clientHeight]];

// A velocidade do movimento do Stick
var movP = 0.1;

// O status do jogo, se está rodando ou não
var statusJogo = 'stop';

// Pega a bola atual
var bolaAtual;

// O tamanho da bola
var tamBola;

// Irá guardar o Interval de movimento da bola
var mover;;

// Se é um jogo com powerUps, é naturalmente falso
var especial = false;

// Diz se tem uma bola de poder na tela
var powerIn = false;

// A posição da bola de poder
var posPower = [0, 0];

// Os powerUps possiveis
var escolhaPower = ['aumentar', 'diminuir', 'invertX', 'invertY', 'diminuirP', 'aumentarP'];

// O stick que bateu na bola por último ('left' ou 'right')
var ultBatida;

// Intervalo que coloca powerUps na tela
var powerInt = setInterval(function (){

    // Se for um jogo com powerUps e não tiver nenhum na tela
    if(especial && !powerIn){

        // Cria um powerUp
        powerUp();

    }

}, 15000);

// Função que roda ao carregar a pagina
function play(){

    // Faz aparecer as opções de jogo (normal e especial)
    document.getElementById('play').style.display = 'flex';

}

function playButton(modo){
    if(modo == 'especial'){
        especial = true
        powerIn = false
        clearInterval(powerInt)
        powerInt = setInterval(function (){
            if(especial && !powerIn){
                powerUp()
            }
        }, 15000)
    }
    direcaoHori = movOriginalHori
    if(Math.random() > 0.5){
        direcaoHori *= -1;
    }
    direcaoVerti = movOriginalVerti
    if(Math.random() > 0.5){
        direcaoVerti *= -1;
    }
    batidas = 0
    document.getElementById('play').style.display = 'none'
    document.getElementById('telaFinal').style.display = 'none'
    criarBola()
    bolaAtual = document.getElementById('bola')
    tamBola = bolaAtual.clientHeight
    setTimeout(function (){
        mover = setInterval(function (){
            moverBola()
        }, 20)
    }, 1000)

    moverBola()
}


function mousePos(event){
    if(statusJogo == 'run'){
        setTimeout(function (){
            mousePosition = event.clientY
            moveP1()
        }, 100)
    }
}

function moveP1(){
    let movimento;
    if(mousePosition != posP[0][1]){
        movimento = mousePosition - posP[0][1]
        
        if(posP[0][1] + movimento > altTela - tamP[0][1] / 2 || posP[0][1] + movimento < 0 + tamP[0][1] / 2){
            return
        }

        posP[0][1] += movimento
        document.getElementById('p1').style.top = posP[0][1] + 'px'

    }

}




function criarBola(){
    let bola = document.createElement('div')
    bola.id = 'bola'
    let posX = parseInt(Number(largTela) / 2)
    let posY = parseInt(Number(altTela) / 2)
    posAtual = [posX, posY]
    bola.style.top =  posY+ 'px'
    bola.style.left = posX + 'px'
    document.getElementById('mesa').appendChild(bola)
    statusJogo = 'run'
}

function moverBola(){
    if(posAtual[0] + direcaoHori + tamBola / 2 >= largTela){
        posAtual[0] = largTela - tamBola / 2
        direcaoHori *= -1
    }else if(posAtual[0] - (tamBola / 2) + direcaoHori  <= 0){
        posAtual[0] = 0 + tamBola / 2
        direcaoHori *= -1
    }else{
        posAtual[0] += direcaoHori
    }

    if(posAtual[1] + tamBola / 2 + direcaoVerti >= altTela){
        posAtual[1] = altTela - tamBola / 2
        direcaoVerti *= -1
    }else if(posAtual[1] - tamBola / 2 + direcaoVerti <= 0){
        posAtual[1] = 0 + tamBola / 2
        direcaoVerti *= -1
    }else{
        posAtual[1] += direcaoVerti
    }

    if(posAtual[1] + direcaoVerti > posP[0][1] - tamP[0][1] / 2 && posAtual[1] + direcaoVerti < posP[0][1] + tamP[0][1] / 2){
        if(posAtual[0] - tamBola / 2 + direcaoHori <= posP[0][0] + tamP[0][0] / 2){
            direcaoHori *= -1
            ultBatida = 'left'
            posAtual[0] = posP[0][0] + tamP[0][0] / 2 + tamBola / 2
            batidas++
        }
    }
    

    if(posAtual[1] + direcaoVerti > posP[1][1] - tamP[1][1] / 2 && posAtual[1] + direcaoVerti < posP[1][1] + tamP[1][1] / 2){
        if(posAtual[0] + tamBola / 2 >= largTela - posP[1][0] - tamP[1][0] / 2){
            direcaoHori *= -1
            ultBatida = 'right'
            batidas++
        }
    }

    if(posAtual[0] - tamBola / 2 <= 0 || posAtual[0] + tamBola / 2 >= largTela){
        clearInterval(mover)
        clearInterval(powerInt)
        bolaAtual.remove()
        statusJogo = 'stop'
        telaFinal()
        return
    }

    bola.style.left = posAtual[0] + 'px'
    bola.style.top = posAtual[1] + 'px'

    movP2()

    if(batidas > 0){
        if(direcaoVerti > 0){
            direcaoVerti = movOriginalVerti + movOriginalVerti * (batidas / 5)
            if(direcaoVerti > 25){
                direcaoVerti = 25
            }
        }else{
            direcaoVerti = (movOriginalVerti + movOriginalVerti * (batidas / 5))*-1
            if(direcaoVerti < -25){
                direcaoVerti = -25
            }
        }
        if(direcaoHori > 0){
            direcaoHori = movOriginalHori + movOriginalHori * (batidas / 5)
            if(direcaoHori > 25){
                direcaoHori = 25
            }
        }else{
            direcaoHori = (movOriginalHori + movOriginalHori * (batidas / 5))*-1
            if(direcaoHori < -25){
                direcaoHori = -25
            }
        }
    }

    

    if(powerIn){
        
        if(posAtual[0] + tamBola / 2 - 5 > posPower[0] - tamBola / 2 && posAtual[0] - tamBola / 2 + 5 < posPower[0] + tamBola / 2 ){
            if(posAtual[1] + tamBola / 2 > posPower[1] - tamBola / 2 && posAtual[1] + tamBola / 2 <  posPower[1] + tamBola / 2){
                power()
                document.getElementById('powerUp').remove()
                powerIn = false
            }else if(posAtual[1] - tamBola / 2 < posPower[1] + tamBola / 2 && posAtual[1] - tamBola / 2 >  posPower[1] - tamBola / 2){
                power()
                document.getElementById('powerUp').remove()
                powerIn = false
            }
        }
    }

}

function power(){
    let tamOriginal
    let powerUpTipo = document.getElementById('powerUp').classList[0]
    if(powerUpTipo == 'aumentar'){
        tamOriginal = tamBola
        tamBola = 100
        document.getElementById('bola').style.width = tamBola + 'px'
        document.getElementById('bola').style.height = tamBola + 'px'
        setTimeout(function (){
            document.getElementById('bola').style.width = tamOriginal + 'px'
            document.getElementById('bola').style.height = tamOriginal + 'px'
            tamBola = tamOriginal
        }, 5000)
    }
    if(powerUpTipo == 'diminuir'){
        tamOriginal = tamBola
        tamBola = 40
        document.getElementById('bola').style.width = tamBola + 'px'
        document.getElementById('bola').style.height = tamBola + 'px'
        setTimeout(function (){
            document.getElementById('bola').style.width = tamOriginal + 'px'
            document.getElementById('bola').style.height = tamOriginal + 'px'
            tamBola = tamOriginal
        }, 5000)
    }
    if(powerUpTipo == 'invertX'){
        direcaoHori *= -1;
    }
    if(powerUpTipo == 'invertY'){
        direcaoVerti *= -1;
    }
    if(powerUpTipo == 'diminuirP'){
        let value = 0
        if(ultBatida == 'left'){
            value = 0
        }else{
            value = 1
        }
        tamOriginal = tamP[value][1]
        tamStick = tamOriginal - tamOriginal / 4
        tamP[value][1] = tamStick
        if(value == 0){
            document.getElementById('p1').style.height = tamStick + 'px'
            document.getElementById('p1').style.backgroundColor = 'cyan'
        }else{
            document.getElementById('p2').style.height = tamStick + 'px'
            document.getElementById('p2').style.backgroundColor = 'cyan'
        }
        setTimeout(function (){
            tamP[value][1] = tamOriginal
            if(value == 0){
                document.getElementById('p1').style.height = tamP[value][1] + 'px'
                document.getElementById('p1').style.backgroundColor = 'white'
            }else{
                document.getElementById('p2').style.height = tamP[value][1] + 'px'
                document.getElementById('p2').style.backgroundColor = 'white'
            }
        }, 5000)
    }
    if(powerUpTipo == 'aumentarP'){
        let value = 0
        if(ultBatida == 'left'){
            value = 0
        }else{
            value = 1
        }
        tamOriginal = tamP[value][1]
        tamStick = tamOriginal + tamOriginal / 2
        tamP[value][1] = tamStick
        if(value == 0){
            document.getElementById('p1').style.height = tamStick + 'px'
            document.getElementById('p1').style.backgroundColor = 'cyan'
        }else{
            document.getElementById('p2').style.height = tamStick + 'px'
            document.getElementById('p2').style.backgroundColor = 'cyan'
        }
        setTimeout(function (){
            tamP[value][1] = tamOriginal
            if(value == 0){
                document.getElementById('p1').style.height = tamP[value][1] + 'px'
                document.getElementById('p1').style.backgroundColor = 'white'
            }else{
                document.getElementById('p2').style.height = tamP[value][1] + 'px'
                document.getElementById('p2').style.backgroundColor = 'white'
            }
        }, 5000)
    }
}

function refresh(){
    document.location.reload()
}

function movP2(){

    let movimento;
    if(posAtual[1] != posP[1][1]){
        movimento = posAtual[1] - posP[1][1]

        
        if(posP[1][1] + movimento > altTela - tamP[1][1] / 2 || posP[1][1] + movimento < 0 + tamP[1][1] / 2){
            return
        }


        posP[1][1] += movimento
        document.getElementById('p2').style.top = posP[1][1] + 'px'

    }
    
    
}

function telaFinal(){
    document.getElementById('telaFinal').style.display = 'flex'
    document.getElementById('msg').innerHTML = 'Parabéns, ocorreram ' + batidas + ' rebatidas!'
}

function powerUp(){
    powerIn = true
    let esc = Math.floor(Math.random() * escolhaPower.length)
    console.log(esc)
    esc = escolhaPower[esc]
    let circulo = criarCirculo()
    circulo.classList.add(esc)
    document.getElementById('mesa').appendChild(circulo)
    posPower = [(Math.floor(Math.random() * (largTela / 4 - tamBola / 2 + largTela / 5 - largTela / 8) + 80) * 2), (Math.floor(Math.random() * altTela / 2 - tamBola / 2 )) + 170]
    document.getElementById('powerUp').style.left = posPower[0] + 'px'
    document.getElementById('powerUp').style.top =  posPower[1]+ 'px'
}

function criarCirculo(){
    let circulo = document.createElement('div')
    circulo.id = 'powerUp'
    return circulo
}