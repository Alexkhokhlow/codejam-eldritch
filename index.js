let anceints = document.getElementsByClassName("item")
let levels = document.getElementsByClassName("button")
let circle = document.getElementsByClassName('circle')
let selectCard = document.getElementsByClassName('selected_card')
let cardList = document.getElementsByClassName('mixed-cards')
let mixed = document.getElementsByClassName('mixed')[0]
let tracker = document.getElementsByClassName('tracker')[0]
let cardFlag = 0;
let flag = 0;
let anceint = ''
let level = ''
let result = [0,0,0,0,0,0,0,0,0]

let ancientCards = {
  'Azathoth' : [1,2,1,2,3,1,2,4,0],
  'Cthulthu' : [0,2,2,1,3,0,3,4,0],
  'IogSothoth' :[0,2,1,2,3,1,3,4,0],
  'ShubNiggurath' : [1,2,1,3,2,1,2,4,0],
}

let cards = {
  0 : [1],
  1 :[2],
  2 : [3]
}

let blueCard = {
  "easy" : [3,4,5,10],
  "normal" : [7,9,11,12],
  "hard" : [1,2,6,8],
}

let greenCard = {
  "easy" : [1,12,16,17,18],
  "normal" : [7,8,9,10,11,13,14,15],
  "hard" : [2,3,4,5,6],
}

let brownCard = {
  "easy" : [11,12,13,14],
  "normal" : [1,2,3,4,5,15,16,17,18,19,20,21],
  "hard" : [6,7,8,9,10],
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function resultCards(cards,mas){
  let flag = 0
  mas = ancientCards[mas]
  for(let i = 0; i< mas.length;i++){
    result[i] = shuffle(cards[i%3]).splice(0,mas[i])

  }
  console.log(result)
  for(let i = 0; i<circle.length; i++){
    circle[i].textContent = result[i].length
  }
}

function selectCards(level,hero){
    let sum = sumCard(hero)
    let cardsList = [greenCard,brownCard,blueCard]
   
    sum.forEach( (card,cardIndex) => {
        switch(level) {
          
          case 'Очень легко' : {
              if(card<=cardsList[cardIndex]['easy'].length){
            cards[cardIndex] = shuffle(Object.entries(cardsList[cardIndex])[0][1]).slice(0,card)
              } else {
                let mas = shuffle(Object.entries(cardsList[cardIndex])[1][1]).slice(0,card - cardsList[cardIndex]['easy'].length)
                 cards[cardIndex] = shuffle(Object.entries(cardsList[cardIndex])[0][1]).concat(mas)
              }
              break;
          }
          case "Легко" : {
              cards[cardIndex] = shuffle(Object.entries( cardsList[cardIndex])[0][1].concat(Object.entries( cardsList[cardIndex])[1][1])).splice(0,card)
            break;
            }

            case "Нормально" : {
              cards[cardIndex] = shuffle(Object.entries( cardsList[cardIndex])[0][1].concat(Object.entries( cardsList[cardIndex])[1][1]).concat(Object.entries( cardsList[cardIndex])[2][1])).splice(0,card)
              break;
            }

            case "Тяжело" : {
              cards[cardIndex] = shuffle(Object.entries( cardsList[cardIndex])[2][1].concat(Object.entries( cardsList[cardIndex])[1][1])).splice(0,card)
            break;
            }

            case 'Очень тяжело' : {
              if(card<=cardsList[cardIndex]['hard'].length){
            cards[cardIndex] = shuffle(Object.entries(cardsList[cardIndex])[2][1]).slice(0,card)
              } else {
                let mas = shuffle(Object.entries(cardsList[cardIndex])[1][1]).slice(0,card - cardsList[cardIndex]['hard'].length)
                 cards[cardIndex] = shuffle(Object.entries(cardsList[cardIndex])[2][1]).concat(mas)
              }
              break;
          }
        }
    })
    resultCards(cards,hero)
}

function changeSelected(e,parent){
  for(let i = 0; i<parent.length; i++){
    parent[i].classList.remove('selected_item')
  }
  e.target.classList.add('selected_item')
}

function sumCard(hero){
  hero = ancientCards[hero]
  let mas = [0,0,0]
  for(let i = 0; i < hero.length; i++){
    mas[i%3] += hero[i]
  }
  return mas
}

document.addEventListener( 'click', e=>{

  if(e.target.classList.contains("item")){
    changeSelected(e,anceints)
    anceint = e.target.alt
    selectCard[0].classList.remove('show')
    cardList[0].classList.remove('show')
    tracker.classList.remove('show')
    mixed.classList.remove('hide')

  }

  if(e.target.classList.contains("button")){
    changeSelected(e,levels)
    level = e.target.textContent
    selectCard[0].classList.remove('show')
    cardList[0].classList.remove('show')
    tracker.classList.remove('show')
    mixed.classList.remove('hide')

  }

  if(e.target.classList.contains('mixed')){
    if(anceint.length !=0 && level.length != 0){
      cardFlag = 0;
      flag = 0;
      result = [0,0,0,0,0,0,0,0,0]
      selectCards(level,anceint)
      cardList[0].classList.add('show')
      tracker.classList.add('show')
      mixed.classList.add('hide')
    }   
  }    


  if(e.target.classList.contains('mixed-cards')){
    selectCard[0].classList.add('show')
    let color = ''   
    while(circle[flag].textContent == 0){
      flag++
      cardFlag = 0 
    }

    let cardItem = result[flag]
    if(result[flag].length > 1){
      cardItem = result[flag][cardFlag]
      cardFlag++
    }

    circle[flag].textContent--; 

    switch(flag%3){
      case 0: {color = 'green'
          break;
      }
      case 1: {color = 'brown'
      break;
         }
      case 2: {color = 'blue'
          break;
          }
    }
    console.log(color + " " + cardItem)
    selectCard[0].style.backgroundImage = 'url(/assets/MythicCards/' + color +'/'+ color + cardItem +'.png)'
    if(circle.length-2 == flag && circle[flag].textContent == 0){
      cardList[0].classList.remove('show')
    } 
  }
})

