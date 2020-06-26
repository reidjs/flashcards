var cardStore = {}
var currentQuestionNumber = 0

const getLocationHash = () => {
    const hash = window.location.hash
    const queryIndex = hash.indexOf('?')
    if (queryIndex < 0) {
        return hash.slice(1)
    } else {
        return hash.slice(1, queryIndex)
    }
}
const renderFlashcards = (markdown) => {
    // all lines that start with #
    const questionRegex = /(?<=#+\s)(.*)(?=\n)/gm
    // all lines that are between lines that start with #\s
    const answerRegex = /(?<=#+.*\n)((.|\n)*?)(?=(#|^$))/gm

    // console.log(markdown.split('# '))
    // split on newline
    // if first 2 chars are #\s it is a question
    // otherwise add onto 
    const questions = []
    const answers = []
    let answer = ''
    const lines = markdown.split('\n')
    console.log(lines)
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]
        console.log(line.slice(0, 2))
        if (line.slice(0, 2) == '# '){
            if (answer.length > 0) {
                answers.push(answer)
                answer = ''
            }
            questions.push(line)
        } else {
            answer += line
        }
        answer += '\n'
    }
    answers.push(answer)

    // const questions = markdown.match(questionRegex)
    // const answers = markdown.match(answerRegex)
    if (questions.length !== answers.length) {
        console.error('Questions and answers length does not match!')
    }
    const total = questions.length
    return { questions, answers, total }
}

const fetchJson = async (url) => {
    let res = await fetch(url)
    const data = await res.json()
    return data
}

const fetchText = async (url) => {
    let res = await fetch(url)
    const text = await res.text()
    return text
}
const loadFlashCardDownloadLinks = async () => {
    const links = await fetchJson('https://api.github.com/repos/reidjs/flashcards/contents/categories')
    return links
}
const getDownloadUrl = (name, links) => {
    if(links.length == 0) return 
    for(let i = 0; i < links.length; i++) {
        if (links[i].name == name) {
            return links[i].download_url
        }
    }
}

const getCardStack = () => {
    const hash = getLocationHash()
    return cardStore[hash]
}

const populateStore = async (link) => {
    const url = link.download_url
    const rawMarkdown = await fetchText(url)
    const { questions, answers, total } = renderFlashcards(rawMarkdown)
    cardStore[link.name] = { questions, answers, total }
}

document.addEventListener('DOMContentLoaded', async () => {
    const links = await loadFlashCardDownloadLinks()
    const cardStacks = document.getElementById('card-stack-nav')
    const questionLinks = document.getElementById('question-links')
    const flashCardTitle = document.getElementById('flash-card-title')
    const flashCardBody = document.getElementById('flash-card-body')
    const flashCardQuestion = document.getElementById('flash-card-question')
    const flashCardAnswer = document.getElementById('flash-card-answer')
    const nextCardButton = document.getElementById('next-flash-card')
    const previousCardButton = document.getElementById('previous-flash-card')
    const flipCardButton = document.getElementById('flip-flash-card')


    // var e = document.getElementById('test')
    var observer = new MutationObserver((event) => {
        // console.log(event)
        const isAnswer = flashCardQuestion.classList.contains('hidden')
        flashCardTitle.innerHTML = isAnswer ? 'Answer' : 'Question'
    })

    observer.observe(flashCardQuestion, {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    })


    function flipCard() {
        flashCardQuestion.classList.toggle('hidden')
        flashCardAnswer.classList.toggle('hidden')
        // if (flashCardQuestion.classList.contains('hidden'))
    }

    flashCardBody.addEventListener('click', flipCard)
    flipCardButton.addEventListener('click', flipCard)

    const changeCard = dir => {
        const newCard = currentQuestionNumber + dir
        showQuestionSide()
        setCard(newCard)
    }

    const initDeck = () => {
        currentQuestionNumber = 0
        flashCardAnswer.classList.add('hidden')
        const questions = getCardStack().questions.length

        // set up quick jump buttons
        questionLinks.innerHTML = ''
        for(let i = 0; i < questions; i++) {
            const li = document.createElement('li') 
            const a = document.createElement('a')

            li.classList.add('page-item')
            a.classList.add('page-link')

            a.innerHTML = i + 1
            a.addEventListener('click', () => setCard(i))

            li.appendChild(a)
            questionLinks.appendChild(li)
        }

        setCard(0)
    }

    const updateQuestionLinksActiveNumber = (n) => {
        const ul = questionLinks.childNodes
        if (ul.length == 0) return
        // const ol = questionLinks.childNodes[0]
        // console.log(ol)
        for(let i = 0; i < ul.length; i++) {
            if (i !== n) {
                ul[i].classList.remove('active')
            } else {
                ul[i].classList.add('active')
            }
        }
    }

    const showQuestionSide = () => {
        flashCardQuestion.classList.remove('hidden')
        flashCardAnswer.classList.add('hidden')
    }

    const setCard = (n) => {
        const s = getCardStack()
        if (n < 0) return
        if (n >= s.total) return
        flashCardQuestion.innerHTML = s.questions[n]
        flashCardAnswer.innerHTML = s.answers[n]
        showQuestionSide()
        currentQuestionNumber = n
        updateQuestionLinksActiveNumber(n)
    }   

    nextCardButton.addEventListener('click', () => changeCard(1))
    previousCardButton.addEventListener('click', () => changeCard(-1))

    // set up topnav based on markdown files
    for(let i = 0; i < links.length; i++) {
        const link = links[i]
        const li = document.createElement('li')
        li.classList.add('nav-item')
        const a = document.createElement('a')
        a.classList.add('nav-link')
        const re = /^([^.]+)/gm
        a.innerHTML = link.name.match(re)
        a.href = `#${link.name}`
        li.appendChild(a)
        cardStacks.appendChild(li)
        await populateStore(links[i])
    }

    window.onhashchange = (e) => {
        initDeck(0)
    }

    if (window.location.hash) {
        initDeck(0)
    }
})