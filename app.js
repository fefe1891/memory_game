const cardArray = [
    {
        name: 'burner',
        img: 'images/burner.jpg',
    },
    {
        name: 'coco',
        img: 'images/coco.jpg',
    },
    {
        name: 'globe',
        img: 'images/globe.jpg',
    },
    {
        name: 'grams',
        img: 'Images/grams.jpg',
    },
    {
        name: 'star',
        img: 'images/star.jpg',
    },
    {
        name: 'timber',
        img: 'images/timber.jpg',
    },
    {
        name: 'burner',
        img: 'images/burner.jpg',
    },
    {
        name: 'coco',
        img: 'images/coco.jpg',
    },
    {
        name: 'globe',
        img: 'images/globe.jpg',
    },
    {
        name: 'grams',
        img: 'Images/grams.jpg',
    },
    {
        name: 'star',
        img: 'images/star.jpg',
    },
    {
        name: 'timber',
        img: 'images/timber.jpg',
    },
]




cardArray.sort(() =>0.5 - Math.random())


const grid = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const lowestCardDisplay = document.querySelector('#lowestScore');
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []
const startBtn = document.querySelector('#start-button');
const restartBtn = document.querySelector('#restart-button');


function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'Images/darby.jpg');
        card.setAttribute('data-id', i.toString());
        card.addEventListener('click', flipCard);
        grid.appendChild(card);

    }
}



function checkMatch() {
    const card = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1];
    console.log(card)
    console.log('check for match!')
    if (optionOneId == optionTwoId) {
        card[optionOneId].setAttribute('src', 'Images/darby.jpg')
        card[optionTwoId].setAttribute('src', 'Images/darby.jpg')
        alert('You clicked same image!')
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match!');
        card[optionOneId].setAttribute('src', 'Images/rainbow.jpg')
        card[optionTwoId].setAttribute('src', 'Images/rainbow.jpg')
        card[optionOneId].removeEventListener('click', flipCard)
        card[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        card[optionOneId].setAttribute('src', 'Images/darby.jpg')
        card[optionTwoId].setAttribute('src', 'Images/darby.jpg')
        alert('Sorry try again!')
    }
   resultDisplay.textContent = cardsWon.length.toString();
    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congrats images all matched!';
        restartBtn.style.display = 'block';
        let lowestScore = localStorage.getItem('lowestScore');
        lowestScore = lowestScore === null ? null : Number (lowestScore);
        if (lowestScore === null || cardsWon.length < lowestScore) {
          localStorage.setItem('lowestScore', cardsWon.length.toString());
          lowestCardDisplay.textContent = 'Lowest Score: ' + cardsWon.length.toString();
        }
    }

}

function startGame() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    cardArray.sort(() =>0.5 - Math.random());
    cardsChosen = [];
    cardsChosenIds = [];
    cardsWon = [];
    resultDisplay.textContent = '';
    createBoard();

    const lowestScore = localStorage.getItem('lowestScore');
    if (lowestScore !== null) {
        lowestCardDisplay.textContent = 'Lowest Score' + lowestScore;
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId);
    console.log(cardsChosen);
    console.log(cardsChosenIds);
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }

}

function resetGame() {
    cardsChosen = [];
    cardsChosenIds = [];
    cardsWon = [];
    resultDisplay.textContent = '0';
    startGame();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);








