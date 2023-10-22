

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
var bolaAtual = [];

// O tamanho da bola
var tamBola;

// Posição atual da bola [X, Y]
var posAtual = [];
var movBolas = []

// Irá guardar o Interval de movimento da bola
var mover;;

// Se é um jogo com powerUps, é naturalmente falso
var especial = false;

// Diz se tem uma bola de poder na tela
var powerIn = false;

// A posição da bola de poder
var posPower = [0, 0];

// Os powerUps possiveis
var escolhaPower = ['aumentar', 'diminuir', 'invertX', 'invertY', 'diminuirP', 'aumentarP', 'duplicar', 'triplicar'];
// , 

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

// Função chama ao apertar o botão Play, e passa o modo, se é normal ou especial
function playButton(modo){

    // Se for especial
    if(modo == 'especial'){

        // Fala que a rodada é especial
        especial = true;

        // Diz que não existe nenhum porwerUp na tela
        powerIn = false;

        // Apaga o intervalo que faz aparecer poderes, caso já tenha tido rodadas anteriores
        clearInterval(powerInt);

        // Inicia o intevalo que faz aparecer os powerUps
        powerInt = setInterval(function (){

            // Se for uma rodada especial e não tiver um powerUp na tela
            if(especial && !powerIn){

                // Cria um powerUp
                powerUp();

            }

        }, 15000);

    }

    // A direção horizontal se torna igual ao movimento original


    

    // Reseta o número de batidas
    batidas = 0;

    // Retira a tela dos botões de play
    document.getElementById('play').style.display = 'none';

    // retira a tela final
    document.getElementById('telaFinal').style.display = 'none';

    // Cria uma nova bola na tela
    criarBola();



    // Pega o tamanho da bola
    tamBola = bolaAtual[0].clientHeight;

    // Vai esperar um segundo para começar a mover a bola
    setTimeout(function (){

        // O movimento da bola
        mover = setInterval(function (){

            // Mover a bola
            moverBola();

        }, 20);

    }, 1000);

}

// Ativado ao mover o mouse
function mousePos(event){

    // Se o jogo estiver rodando
    if(statusJogo == 'run'){

        // Espera um tempo
        setTimeout(function (){

            // Atualiza a altura do mouse
            mousePosition = event.clientY;

            // Move o primeiro Stick
            moveP1();

        }, 100);

    }

}

// Movimento do primeiro Stick
function moveP1(){

    // O quanto o Stick tem que se mexer
    let movimento;

    // Se a altura do mouse for diferente da altura do primeiro Stick
    if(mousePosition != posP[0][1]){

        // Descobre o quanto o movimento tem que se mexer
        movimento = mousePosition - posP[0][1];
        
        // Se a altura do primeiro Stick + o quanto ele tem que se mexer for maior que a altura da tela menos a altura do primeiro Stick dividido por 2 OU a altura do primeiro stick mais o movimento for menor que o tamanho do primeiro Stick dividido por 2
        if(posP[0][1] + movimento > altTela - tamP[0][1] / 2 || posP[0][1] + movimento < 0 + tamP[0][1] / 2){

            // Sai da função
            return;

        }

        // Muda a altura do primeiro Stick
        posP[0][1] += movimento;

        // Realmente muda a altura
        document.getElementById('p1').style.top = posP[0][1] + 'px';

    }


}

// Cria a bola
function criarBola(){

    // Cria uma div
    let bola = document.createElement('div');

    // Define o id da bola como 'bola'
    let numId = bolaAtual.length + 1
    bola.id = 'bola' + numId;
    bola.classList.add('bola')

    // A bola vai começar no meio da tela
    let posX = parseInt(Number(largTela) / 2);

    // A bola vai começar no meio da tela
    let posY = parseInt(Number(altTela) / 2);

    // Define a posição da bola
    posAtual.push([posX, posY]);

    movBolas.push([movOriginalHori, movOriginalVerti]);
    // Roda um valor aleatório que define se vai começar indo pra esquerda ou direita
    if(Math.random() > 0.5){

        // A bola vai começar indo pra esquerda
        movBolas[bolaAtual.length][0] *= -1;

    }

    // Roda um valor aleatório que define se vai começar indo pra cima ou baixo
    if(Math.random() > 0.5){

        // A bola vai começar subindo
        movBolas[bolaAtual.length][1] *= -1;

    }

    // Coloca a bola na altura certa
    bola.style.top =  posY+ 'px';

    // Coloca a bola no lugar certo
    bola.style.left = posX + 'px';

    // Coloca a bola na tela
    document.getElementById('mesa').appendChild(bola);

    // bolaAtual.push([document.getElementById('bola' + numId)])
    bolaAtual = document.getElementsByClassName('bola')

    // Define o jogo como 'run'
    statusJogo = 'run';

}

// Função que move a bola
function moverBola(){
    for(let c = 0; c < bolaAtual.length; c++){
        

        // Se a posição X da bola mais a direção que ela esta indo mais o tamanho da bola dividido por 2 for maior ou igual a largura da tela
        if(posAtual[c][0] + movBolas[c][0] + tamBola / 2 >= largTela){

            // Define o eixo X da bola como a largura da tela menos o tamanho da bola dividido por 2
            posAtual[c][0] = largTela - tamBola / 2;

        // Senão se o eixo X da bola menos o tamanho da bola dividido por 2 mais a direção que a bola esta indo for menor ou igual a 0
        }else if(posAtual[c][0] - (tamBola / 2) + movBolas[c][0]  <= 0){

            // Define o eixo X como 0 mais o tamanho da bola dividido por 2
            posAtual[c][0] = 0 + tamBola / 2;

        // Senão
        }else{
            // Move a bola horizontalmente
            posAtual[c][0] += movBolas[c][0];

        }


        // Se o eixo Y da bola mais o tamanho da bola dividido por 2 mais a direção que ela esta indo na vertical for maior ou igual a altura da tela
        if(posAtual[c][1] + tamBola / 2 + movBolas[c][1] >= altTela){

            // Define a altura atual da bola como a altura da tela menos o tamanho da bola dividido por 2
            posAtual[c][1] = altTela - tamBola / 2;

            // Inverte a direção que a bola está indo verticalmente
            movBolas[c][1] *= -1;

        // Senão se a altura atual da bola menos o tamanho da bola dividido por 2 mais a direção que ele está indo na vertical for maior ou igual a 0
        }else if(posAtual[c][1] - tamBola / 2 + movBolas[c][1] <= 0){

            // Define a altura da bola como 0 mais o tamanho da bola dividido por 2
            posAtual[c][1] = 0 + tamBola / 2;

            // Inverte a direção que a bola está indo verticalmente
            movBolas[c][1]*= -1;

        // Senão
        }else{

            // Move a bola verticalmente
            posAtual[c][1] += movBolas[c][1];

        }


        // Se a altura da bola mais a direção que ela está indo for maior que a altura do primeiro Stick menos o tamanho dele dividido por 2
        // ( Se a altura da bola for maior que o ponto mais alto do primeiro Stick ) E
        // a altura da bola mais a direção que ela está indo for menor que a altura do primeiro Stick mais o tamanho dele dividido por 2
        // ( Se a altura da bola for menor que o ponto mais baixo do primeiro Stick )
        if(posAtual[c][1] + movBolas[c][1] > posP[0][1] - tamP[0][1] / 2 && posAtual[c][1] + movBolas[c][1] < posP[0][1] + tamP[0][1] / 2){

            // Se o eixo X da bola menos o tamanho da bola dividido por 2 for menor ou igual ao eixo X do primeiro Stick mais a largura do Stick dividido por 2
            if(posAtual[c][0] - tamBola / 2 + movBolas[c][0] <= posP[0][0] + tamP[0][0] / 2){

                // Inverte a direção horizontal
                movBolas[c][0] *= -1;

                // Diz que a última pessoa a bater na bola foi o primeiro Stick
                ultBatida = 'left';

                // Define o eixo X da bola como o eixo X do primeiro Stick mais a largura do primeiro Stick dividido por 2 mais o tamanho da bola dividido por 2
                posAtual[c][0] = posP[0][0] + tamP[0][0] / 2 + tamBola / 2;

                // Adiciona mais 1 ao contador de batidas
                batidas++;

            }

        }



        // Se o eixo X da bola mais a direção que ela está indo for maior que a altura do segundo Stick menos a altura dele dividido por 2
        // ( Se a altura da bola for maior que o ponto mais alto do segundo Stick ) E
        // e o eixo X da bola mais a direção que ela está indo for menor que a altura do segundo Stick mais a altura dele dividido por 2
        if(posAtual[c][1] + movBolas[c][1] > posP[1][1] - tamP[1][1] / 2 && posAtual[c][1] + movBolas[c][1] < posP[1][1] + tamP[1][1] / 2){

            // Se o eixo X da bola mais o tamanho dela dividido por 2 for maior ou igual a largura da tela menos o eixo X do segundo Stick menos a largura do segundo Stick dividido por 2
            if(posAtual[c][0] + tamBola / 2 + movBolas[c][1] >= largTela - posP[1][0] - tamP[1][0] / 2){

                // Inverte a direção horizontal da bola
                movBolas[c][0] *= -1;
                
                // define que o último a bater na bola foi o segundo Stick
                ultBatida = 'right';
                
                posAtual[c][0] = largTela - posP[0][0] - tamP[0][0] - tamBola / 2;

                // Adiciona mais um ao valor da contagem de batidas
                batidas++;

            }

        }


        // Se a posição X da bola menos o tamanho da bola dividido por 2 for menor ou igual a 0 OU a posição X da bola mais o tamanho da bola dividido por 2 for maior ou igual a largura da tela 
        if(posAtual[c][0] - tamBola / 2 <= 0 || posAtual[c][0] + tamBola / 2 >= largTela){
            
            document.getElementById(bolaAtual[c].id).remove()
            movBolas.splice(c, 1)
            posAtual.splice(c, 1)

            // Remove a bola em jogo
            if(bolaAtual.length == 0){
                // Para de mover a bola
                clearInterval(mover);

                // Para de adicionar poderes
                clearInterval(powerInt);

                

                // Define o status do jogo como parado
                statusJogo = 'stop';

                // Chama a tela final
                telaFinal();

            
                return
            }
            continue
        }



        // Altera a posição horizontal da bola
        bolaAtual[c].style.left = posAtual[c][0] + 'px';

        // Altera a posição vertical da bola
        bolaAtual[c].style.top = posAtual[c][1] + 'px';

    }

    // Move o segundo Stick
    movP2()


    // Se o número de batidas for maior que 0
    if(batidas > 0){

        for(let c = 0; c < bolaAtual.length; c++){
            // Se a bola estiver descendo
            if(movBolas[c][1] > 0){

                // Define a direção como direção original mais direção original vezes o número de batidas dividido por 5
                movBolas[c][1] = movOriginalVerti + movOriginalVerti * (batidas / 5);

                // Se a direção vertical for maior que 25
                if(movBolas[c][1] > 25){

                    // Volta a direção a 25
                    movBolas[c][1] = 25;

                }

            // Senão
            }else{

                // Define a direção como direção original mais direção original vezes o número de batidas dividido por 5, tudo isso vezes -1
                movBolas[c][1] = (movOriginalVerti + movOriginalVerti * (batidas / 5))*-1;

                // Se a direção vertical for menor que -25
                if(movBolas[c][1] < -25){

                    // Volta a direção a 25
                    movBolas[c][1] = -25;
            
                }

            }

            // Se a bola estiver indo pra direita
            if(movBolas[c][0] > 0){

                // Define a direção como direção original mais direção original vezes 0 número de batidas vezes 5
                movBolas[c][0] = movOriginalHori + movOriginalHori * (batidas / 5);
                
                // Se a direção horizontal for maior que 25
                if(movBolas[c][0] > 25){
                    
                    // Volta a direção a 25
                    movBolas[c][0] = 25;
                    
                }
                
            // Senão
            }else{

                // Define a direção como direção original mais direção original vezes 0 número de batidas vezes 5, tudo isso vezes -1
                movBolas[c][0] = (movOriginalHori + movOriginalHori * (batidas / 5))*-1;

                // Se a direção for menor que -25
                if(movBolas[c][0] < -25){

                    // Volta a direção a -25
                    movBolas[c][0] = -25;

                }

            }

        }
    }


    // Se tiver um poder na tela
    if(powerIn){
        
        // Se o eixo x da bola mais o tamanho da bola dividido por 2 menos 5 for maior que o eixo X da bola de poder menos o tamanho da bola dividido por 2 E
        // O eixo X da bola menos o tamanho da bola dividido por 2 mais 5 for menor que o eixo X da bola de poder mais o tamanho da bola dividido por 2
        if(posAtual[0][0] + tamBola / 2 - 5 > posPower[0] - tamBola / 2 && posAtual[0][0] - tamBola / 2 + 5 < posPower[0] + tamBola / 2 ){

            // Se a altura da bola mais o tamanho da bola dividido por 2 for maior que o eixo Y da bola de poder menos o tamanho da bola dividido por 2 E
            // e a altura da bola mais o tamanho da bola dividido por 2 for menor que o eixo Y da bola de poder mais o tamanho da bola dividido por 2
            if(posAtual[0][1] + tamBola / 2 > posPower[1] - tamBola / 2 && posAtual[0][1] + tamBola / 2 <  posPower[1] + tamBola / 2){

                // Chama a função power()
                power();

                // Remove a bola de poder
                document.getElementById('powerUp').remove();

                // Define que não existe powerUps na tela
                powerIn = false;
            
            // Senão se a altura da bola menos o tamanho da bola dividido por 2 for menor que a altura da bola de poder mais o tamanho da bola dividido por 2 E
            // e a altura da bola menos o tamanho da bola dividido por 2 for maior que a altura da bola de poder menos o tamanho da bola
            }else if(posAtual[0][1] - tamBola / 2 < posPower[1] + tamBola / 2 && posAtual[0][1] - tamBola / 2 >  posPower[1] - tamBola / 2){

                // Chama a função power()
                power();

                // Remove a bola de poder
                document.getElementById('powerUp').remove();

                // Define que não existe powerUps na tela
                powerIn = false;

            }

        }

    }

    document.getElementById('cont').innerHTML = batidas;

}

// Função que faz os powerUps acontecerem
function power(){

    // Cria uma variável que vai guardar o tamanho original das coisas
    let tamOriginal;

    // Pega o powerUp escolhido
    let powerUpTipo = document.getElementById('powerUp').classList[0];

    // Se o poder for do tipo 'aumentar'
    if(powerUpTipo == 'aumentar'){

        // Pega o tamanho original da bola
        tamOriginal = tamBola

        // Aumenta o tamanho da bola em 20
        tamBola = tamOriginal + 20;

        // Muda a largura da bola
        document.getElementsByClassName('bola')[0].style.width = tamBola + 'px';

        // Muda a altura da bola
        document.getElementsByClassName('bola')[0].style.height = tamBola + 'px';

        // Vai fazer a bola voltar ao tamanho original em 5 segundos
        setTimeout(function (){

            // Faz a bola voltar a largura normal
            document.getElementsByClassName('bola')[0].style.width = tamOriginal + 'px';

            // Faz a bola voltar a altura normal
            document.getElementsByClassName('bola')[0].style.height = tamOriginal + 'px';

            // Redefine o tamanho da bola
            tamBola = tamOriginal;

        }, 5000);

    }

    // Se for do tipo 'diminuir'
    if(powerUpTipo == 'diminuir'){

        // Guarda o tamanho original da bola
        tamOriginal = tamBola;

        // Muda o tamanho da bola
        tamBola = tamOriginal - 20;

        // Muda a largura da bola
        document.getElementsByClassName('bola')[0].style.width = tamBola + 'px';

        // Muda a altura da bola
        document.getElementsByClassName('bola')[0].style.height = tamBola + 'px';

        // Vai fazer a bola voltar ao tamanho normal depois de 5 segundos
        setTimeout(function (){

            // Faz a bola voltar a largura normal
            document.getElementsByClassName('bola')[0].style.width = tamOriginal + 'px';

            // Faz a bola voltar a altura normal
            document.getElementsByClassName('bola')[0].style.height = tamOriginal + 'px';

            // Redefine o tamanho da bola
            tamBola = tamOriginal;

        }, 5000);

    }

    // Se for do tipo 'invertX'
    if(powerUpTipo == 'invertX'){

        // Inverte a direção horizontal
        movBolas[0][0] *= -1;

    }

    // Se for do tipo 'invertY'
    if(powerUpTipo == 'invertY'){

        // Inverte a direção Y
        movBolas[0][1] *= -1;

    }

    // Se for do tipo 'diminuirP'
    if(powerUpTipo == 'diminuirP'){

        // Cria uma variavel
        let arrayValue = 0;

        // Se a última batida for do Stick 1
        if(ultBatida == 'left'){

            // Define o valor da array como 0
            arrayValue = 0;

        }else{

            // Define o valor da array como 1
            arrayValue = 1;

        }

        // Guarda a altura do Stick que tocou por último na bola
        tamOriginal = tamP[arrayValue][1];

        // Muda o tamanho do Stick para o tamanho original menos o tamanho original dividido por 4
        tamStick = tamOriginal - tamOriginal / 4;

        // Muda o tamanho do Stick
        tamP[arrayValue][1] = tamStick;

        // Se o valor da array for 0
        if(arrayValue == 0){

            // Muda a altura do Stick
            document.getElementById('p1').style.height = tamStick + 'px';

            // Muda a cor do Stick
            document.getElementById('p1').style.backgroundColor = 'cyan';

        // Senão
        }else{

            // Muda a altura do Stick
            document.getElementById('p2').style.height = tamStick + 'px';

            // Muda a cor do Stick
            document.getElementById('p2').style.backgroundColor = 'cyan';

        }

        // Vai fazer o Stick voltar ao tamanho normal
        setTimeout(function (){

            // Redefine o tamanho original do Stick
            tamP[arrayValue][1] = tamOriginal;

            // Se o valor da array for 0
            if(arrayValue == 0){

                // Redefine a altura do Stick
                document.getElementById('p1').style.height = tamP[arrayValue][1] + 'px';

                // Muda a cor do Stick de volta para branco
                document.getElementById('p1').style.backgroundColor = 'white';

            // Senão
            }else{

                // Redefine a altura do Stick
                document.getElementById('p2').style.height = tamP[arrayValue][1] + 'px';

                // Muda a cor do Stick de volta para branco
                document.getElementById('p2').style.backgroundColor = 'white';
                
            }

        }, 5000);

    }

    // Se for do tipo 'aumentarP'
    if(powerUpTipo == 'aumentarP'){

        // Valor da array
        let arrayValue;

        // Se a bola encostou por último no Stick da esquerda
        if(ultBatida == 'left'){

            // Define o valor da array como 0
            arrayValue = 0;

        // Senão
        }else{

            // Define o valor da array como 1
            arrayValue = 1;

        }

        // Guarda a altura do segundo Stick
        tamOriginal = tamP[arrayValue][1];

        // Define o tamanho do Stick como o tamanho original mais o tamanho original dividido por 2
        tamStick = tamOriginal + tamOriginal / 2;

        // Muda o tamanho do Stick
        tamP[arrayValue][1] = tamStick;

        // Se o valor da array for 0
        if(arrayValue == 0){

            // Muda a altura do Stick
            document.getElementById('p1').style.height = tamP[arrayValue][1] + 'px';

            // Muda a cor do Stick para ciano
            document.getElementById('p1').style.backgroundColor = 'cyan';

        // Senão
        }else{

            // Muda a altura do Stick
            document.getElementById('p2').style.height = tamP[arrayValue][1] + 'px';

            // Muda a cor do Stick para ciano
            document.getElementById('p2').style.backgroundColor = 'cyan';

        }

        // Faz o Stick voltar ao normal
        setTimeout(function (){

            // Redefine a altura do Stick
            tamP[arrayValue][1] = tamOriginal;

            // Se o valor da array for 0
            if(arrayValue == 0){

                // Volta o Stick a altura padrão
                document.getElementById('p1').style.height = tamP[arrayValue][1] + 'px';

                // Volta a cor do Stick a branco
                document.getElementById('p1').style.backgroundColor = 'white';

            // Senão
            }else{

                // Volta o Stick a altura padrão
                document.getElementById('p2').style.height = tamP[arrayValue][1] + 'px';

                // Volta a cor do Stick a branco
                document.getElementById('p2').style.backgroundColor = 'white';

            }

        }, 5000);

    }

    if(powerUpTipo == 'duplicar'){
        criarBola()
        posAtual[1] = [largTela/2, altTela/2]
        movBolas[1] = [5, 5]
        setTimeout(function (){

            if(bolaAtual.length > 1){
                bolaAtual[1].remove()
                posAtual.splice(1, 1)
                movBolas.splice(1, 1)
            }

        }, 5000);
    }
    if(powerUpTipo == 'triplicar'){
        criarBola()
        posAtual[1] = [largTela/2, altTela/2]
        movBolas[1] = [5, 5]
        criarBola()
        posAtual[1] = [largTela/2, altTela/2]
        movBolas[1] = [-5, -5]
        setTimeout(function (){

            if(bolaAtual.length > 1){
                bolaAtual[1].remove()
                posAtual.splice(1, 1)
                movBolas.splice(1, 1)
            }
            if(bolaAtual.length > 1){
                bolaAtual[1].remove()
                posAtual.splice(1, 1)
                movBolas.splice(1, 1)
            }

        }, 5000);
    }

}

// Função que recarrega a página
function refresh(){

    // Recarrega a página
    document.location.reload();

}

// // Movimento o segundo Stick
function movP2(){

    // Irá guardar a diferença de distancia entre o segundo Stick e sua posição final
    let movimento;
    let maior;
    for(let c = 0; c < posAtual.length; c++){
        if(c == 0){
            maior = c
        }else if(posAtual[c][0] > posAtual[maior][0]){
            maior = c
        }
    }

    let emBusca = posAtual[maior]

    // Se a altura da bola for diferente da altura do segundo Stick
    if(emBusca[1] != posP[1][1]){

        // Calcula a diferença da distancia entre a posição da bola e a altura do Stick
        movimento = emBusca[1] - posP[1][1];

        // Se a altura do segundo Stick mais a diferença for maior que a tela menos a altura do Stick dividido por 2 OU
        // A altura do segundo Stick mais o movimento for menor que 0 mais a altura do segundo Stick dividido por 2
        if(posP[1][1] + movimento > altTela - tamP[1][1] / 2 || posP[1][1] + movimento < 0 + tamP[1][1] / 2){

            // Sai da função
            return;

        }

        // Move o segundo Stick
        posP[1][1] += movimento;

        // Realmente move o segundo Stick
        document.getElementById('p2').style.top = posP[1][1] + 'px';

    }
    
    
}

// Chama a tela final do jogo
function telaFinal(){

    // Faz a tela final aparecer
    document.getElementById('telaFinal').style.display = 'flex';

    // Coloca uma mensagem final
    document.getElementById('msg').innerHTML = 'Parabéns, ocorreram ' + batidas + ' rebatidas!';

}

// Cria powerUps
function powerUp(){

    // Fala que tem powerUps na tela
    powerIn = true;

    // Escolhe aleatoriamente um dos powerUps possiveis
    let esc = escolhaPower[Math.floor(Math.random() * escolhaPower.length)];

    // Cria um circulo
    let circulo = criarCirculo();

    // Adiciona o powerUp escolhido como classe
    circulo.classList.add(esc);

    // Coloca o circulo de poder na tela
    document.getElementById('mesa').appendChild(circulo);

    // Coloca o circulo numa posição aleatoria
    posPower = [Math.floor((Math.random() * (largTela - posP[0][0] * 4))+ (posP[0][0] * 1.8)) , (Math.floor(Math.random() * altTela / 2 - tamBola / 2 )) + 170];

    // Coloca a bola de poder na coordenada X correta
    document.getElementById('powerUp').style.left = posPower[0] + 'px';

    // Coloca a bola de poder na coordenada Y correta
    document.getElementById('powerUp').style.top =  posPower[1]+ 'px';

}

// Cria o circulo do powerUp
function criarCirculo(){

    // Cria o circulo
    let circulo = document.createElement('div');

    // Define o id do circulo
    circulo.id = 'powerUp';

    // Retorna a div
    return circulo;

}