console.log("hello world!")

let deckList = []
let tempDeckList = []
const buttonDiv = document.getElementById('buttonspace')

loadCards()


function initButtonListener(button) {
    let drawNewButton = document.getElementById('mulliganBtn')
    drawNewButton.addEventListener("click", function () {
        drawCards()
    })

}

function loadCards() {
    fetch('cardsarr.json')
        .then(response => response.json())
        .then((data) => {
            for (let obj in data) {
                deckList.push(data[obj])
            }
        }).then(drawCards)
        .then(initButtonListener)

}



function drawCards() {
    console.log(deckList)
    console.log("Drawing cards")
    let numberToPull;
    if (deckList.length < 3) {
        numberToPull = deckList.length;
    } else {
        numberToPull = 3
    }
    // console.log(numberToPull + " to pull")
    while (numberToPull != 0) {
        console.log(numberToPull + " cards left to pull")
        tempDeckList
            .push((deckList.splice((Math.floor(Math.random() * deckList.length)), 1))[0])
        //removes random cards from 1st deck and adds to temp deck
        numberToPull--;
    }
    removeOtherNodes(document.getElementById("cardspace"))
    for (let card in tempDeckList) {
        console.log("Printing card " + tempDeckList[card])
        let cardToDisplay = document.createElement("div")
        cardToDisplay.classList.add('card')
        let textElement = document.createElement("p")
        let cardText = document.createTextNode(tempDeckList[card])
        textElement.appendChild(cardText)
        cardToDisplay.appendChild(textElement)

        cardToDisplay.addEventListener("click", function () {
            console.log(this.textContent)
            let tempCard = this
            removeOtherNodes(this.parentNode)
            tempDeckList.splice((tempDeckList.indexOf(this.textContent)), 1)
            Array.prototype.push.apply(deckList, tempDeckList)
            tempDeckList = [] // clear temp array
            console.log(deckList)

            document.getElementById("cardspace").appendChild(tempCard)

        })
        document.getElementById("cardspace").appendChild(cardToDisplay)
    }

}

function removeOtherNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function selectCard() {

}
