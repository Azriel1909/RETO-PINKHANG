;(function(){
  'use strict'
  var game = {
    word: 'HOLA',
    stateNum: 4,
    state1:['L','A'],
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
    $elemento.src = './0' + game.stateNum + '.png'

    // Letras adivinadas
    var word = game.word
    var state1 = game.state1
    $elemento = $html.state1

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
    for (let letterE of state2) {
      let $span = document.createElement('span')
      let $txt = document.createTextNode(letterE)
      $span.setAttribute('class' , 'wrong letter')
      $span.appendChild($txt)
      $elemento.appendChild($span)
    }
  }
  console.log(game)
  drawGame(game)
}())