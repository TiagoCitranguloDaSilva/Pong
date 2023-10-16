
var posAtual = [0, 0]
var batidas = 0
var movOriginalHori = 5
var movOriginalVerti = 5
var direcaoHori = movOriginalHori
var direcaoVerti = movOriginalVerti
var largTela = document.getElementById('mesa').clientWidth
var altTela = document.getElementById('mesa').clientHeight
var mousePosition;
document.getElementById('p1').style.top = parseInt(altTela / 2) + 'px'
document.getElementById('p2').style.top = parseInt(altTela / 2) + 'px'
var posP = [[80, parseInt(altTela / 2)], [80, parseInt(altTela / 2)]]
console.log(posP[0][1])
var tamP = [document.getElementById('p1').clientWidth, document.getElementById('p1').clientHeight]
var movP = 0.1
var statusJogo = 'stop'
var bolaAtual
var tamBola
var mover;
var especial = false
var powerIn = false
var posPower = [0, 0]

var powerInt = setInterval(function (){
    if(especial && !powerIn){
        powerUp()
    }
}, 15000)



function play(){
    document.getElementById('play').style.display = 'flex'
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
    direcaoVerti = movOriginalVerti
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
        
        if(posP[0][1] + movimento > altTela - tamP[1] / 2 || posP[0][1] + movimento < 0 + tamP[1] / 2){
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

    if(posAtual[1] + direcaoVerti > posP[0][1] - tamP[1] / 2 && posAtual[1] + direcaoVerti < posP[0][1] + tamP[1] / 2){
        if(posAtual[0] - tamBola / 2 + direcaoHori <= posP[0][0] + tamP[0] / 2){
            direcaoHori *= -1
            posAtual[0] = posP[0][0] + tamP[0] / 2 + tamBola / 2
            batidas++
        }
    }
    

    if(posAtual[1] + direcaoVerti > posP[1][1] - tamP[1] / 2 && posAtual[1] + direcaoVerti < posP[1][1] + tamP[1] / 2){
        if(posAtual[0] + tamBola / 2 >= largTela - posP[1][0] - tamP[0] / 2){
            direcaoHori *= -1
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
    if(document.getElementById('powerUp').classList[0] == 'aumentar'){
        console.log('entrou')
        let tamOriginal = tamBola
        tamBola = 100
        document.getElementById('bola').style.width = tamBola + 'px'
        document.getElementById('bola').style.height = tamBola + 'px'
        setTimeout(function (){
            document.getElementById('bola').style.width = tamOriginal + 'px'
            document.getElementById('bola').style.height = tamOriginal + 'px'
            tamBola = tamOriginal
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

        
        if(posP[1][1] + movimento > altTela - tamP[1] / 2 || posP[1][1] + movimento < 0 + tamP[1] / 2){
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
    let escolhaPower = ['aumentar']
    let esc = escolhaPower[Math.floor(Math.random() * (escolhaPower.length - 1))]
    console.log(esc)
    let circulo = criarCirculo()
    circulo.classList.add(esc)
    document.getElementById('mesa').appendChild(circulo)
    posPower = [(Math.floor(Math.random() * (largTela / 4 - tamBola / 2 + 200)) * 2), (Math.floor(Math.random() * altTela / 2 - tamBola / 2 )) + 170]
    document.getElementById('powerUp').style.left = posPower[0] + 'px'
    document.getElementById('powerUp').style.top =  posPower[1]+ 'px'
}

function criarCirculo(){
    let circulo = document.createElement('div')
    circulo.id = 'powerUp'
    return circulo
}