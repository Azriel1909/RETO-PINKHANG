;(function(){
  'use strict'
  // Configuración
  var game = {
    word: 'ALURA',
    stateNum: 7,
    state1:['A','L'],
    state2:['C','J','P','O']
  }

  var $html = {
    man: document.getElementById('man'),
    // Se adivinó
    state1: document.querySelector('.state1'),
    // Cometió error
    state2: document.querySelector('.state2')
  }
  // Cambiamos la imagen
  function drawGame(game){
    var $elemento
    $elemento = $html.man
    var stateNum = game.stateNum
    if (stateNum === 8) {
      // interpretamos el estado como el estado anterior
      stateNum = game.sBack
    }
    $elemento.src = './0' + stateNum + '.png'

    // Letras adivinadas
    var word = game.word
    var state1 = game.state1
    $elemento = $html.state1
    // Eliminar elementos anteriores
    $elemento.innerHTML = ''

    for(let letter of word) {
      let $span = document.createElement('span')
      let $txt = document.createTextNode('')
      if (state1.indexOf(letter) >= 0) {
        // Si la palabra se adivinó, la mostramos.
        $txt.nodeValue = letter
      }
      $span.setAttribute('class', 'guessed letter')
      $span.appendChild($txt)
      $elemento.appendChild($span)
    }
    // Letras erróneas
    var state2 = game.state2
    $elemento = $html.state2
    // Eliminar elementos anteriores
    $elemento.innerHTML = ''
    for (let letterE of state2) {
      let $span = document.createElement('span')
      let $txt = document.createTextNode(letterE)
      $span.setAttribute('class' , 'wrong letter')
      $span.appendChild($txt)
      $elemento.appendChild($span)
    }
  }

// Función de transición
  function guessGame(game,letter){
    // modificamos en la configuración anterior para ahorrar memoria, sólo actualizamos valores.
    var stateNum = game.stateNum
    if (stateNum === 1 || stateNum === 8) {
      return
    }
    var state1 = game.state1
    var state2 = game.state2
    if (state1.indexOf(letter) >= 0 || state2.indexOf(letter) >= 0){
      return
    }
    var word = game.word
    if (word.indexOf(letter) >= 0 ) {
      let youWin = true
      for (let letterN of word) {
        if (state1.indexOf(letterN) < 0 && letterN != letter ) {
          youWin = false
          game.sBack = game.stateNum
          break
        }
      }
      if (youWin) {
        game.stateNum = 8;
      }
      // agregamos la letra a las letras adivinadas
      state1.push(letter)
    } else {
      game.stateNum--
      // agregamos la letra a las letras incorrectas
      state2.push(letter)
    }
  }
  window.onkeypress = function guessLetter(eventA) {
    var letter =  eventA.key
    letter = letter.toUpperCase()
    if(/^[A-ZÑ]/.test()) {
      return
    }
    guessGame(game, letter)
    drawGame(game)
  }
  drawGame(game)
}())