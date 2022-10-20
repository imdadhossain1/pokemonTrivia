const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which starter Pokemon has super effective attacks against Ice-type Pokemon?',
        choice1: 'Pikachu',
        choice2: 'Charmander',
        choice3: 'Squirtle',
        choice4: 'Bulbasaur',
        answer: 2,
    }, 
    {
        question: 'Which of the following Pokemon is able to control time?',
        choice1: 'Palkia',
        choice2: 'Dialga',
        choice3: 'Darkrai',
        choice4: 'Rayquaza',
        answer: 2,
    },
    {
        question: 'Which of the following Pokemon is NOT an Eeveelution?',
        choice1: 'Vaporeon',
        choice2: 'Sylveon',
        choice3: 'Flygon',
        choice4: 'Leafeon',
        answer: 3,
    },
    {
        question: 'Which Pokemon was created through genetic manipulation?',
        choice1: 'Mewtwo',
        choice2: 'Jirachi',
        choice3: 'Deoxys',
        choice4: 'Mew',
        answer: 1,
    },
    {
        question: 'Which town is Ash from?',
        choice1: 'Pewter City',
        choice2: 'Viridian City',
        choice3: 'Cerulean City',
        choice4: 'Pallet Town',
        answer: 4,
    },
    {
        question: 'Who is the "God" of all Pokemon?',
        choice1: 'Arceus',
        choice2: 'Suicune',
        choice3: 'Lugia',
        choice4: 'Rayquaza',
        answer: 1,
    },
    {
        question: 'Pikachu has a fondness for what condiment',
        choice1: 'BBQ Sauce',
        choice2: 'Mustard',
        choice3: 'Ketchup',
        choice4: 'Mayo',
        answer: 3,    
    },
    {
        question: "Which of these Pokemon do not appear in the fighting game 'Super Smash Bros. Ultimate?'",
        choice1: 'Pikachu',
        choice2: 'Mewtwo',
        choice3: 'Incineroar',
        choice4: 'Blastoise',
        answer: 4,    
    },
    {
        question: 'In the Pokemon video games, how many badges are required to enter the Pokemon League?',
        choice1: '11',
        choice2: '9',
        choice3: '10',
        choice4: '8',
        answer: 4,  
    },
    {
        question: "What is the name of the nurse that runs all Pokemon Centers",
        choice1: 'Nurse Joy',
        choice2: 'Nurse Merry',
        choice3: 'Nurse Cheer',
        choice4: 'Nurse Happy',
        answer: 1, 
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questions.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()


        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()