const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progressText');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull');

let currentQuestion=[]
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[]
let questions=[
    {
        question:'Epsom(England) is the place associated with?',
        choice1:'Snooker',
        choice2:'Polo',
        choice3:'Shooting',
        choice4:'Horse Racing',
        answer:4,
    },
    {
        question:'What is the Capital of india',
        choice1:'Kolkata',
        choice2:'Delhi',
        choice3:'Banglore',
        choice4:'Mumbai',
        answer:2,
    },
    {
        question:'What is Famous in India',
        choice1:'Cricket',
        choice2:'Football',
        choice3:'Hockey',
        choice4:'Tennis',
        answer:1,
    },
    {
        question:'Fastest Shorthand Writer was?',
        choice1:' Dr. G. D. Bist',
        choice2:'J.M. Tagore',
        choice3:'J.R.D. Tata',
        choice4:' Khudada Khan',
        answer:1,
    },
    {
        question:'Fathometer is used to measure?',
        choice1:'Earthquakes',
        choice2:'Rainfall',
        choice3:'Ocean Depth',
        choice4:'Sound Intensity',
        answer:3,
    },
    {
        question:'Golf player Vijay Singh belongs to which country?',
        choice1:'India',
        choice2:'England',
        choice3:'USA',
        choice4:'Fiji',
        answer:4,
    },
    {
        question:'"One People, One State, One leader” was the policy of?',
        choice1:'Hitler',
        choice2:'Stalin',
        choice3:'Lenin',
        choice4:' Mussolin',
        answer:1,
    },
    {
        question:'FFC stands for?',
        choice1:'Foreign Finance Corporation',
        choice2:'Film Finance Corporation',
        choice3:'Federation of Football Council',
        choice4:'None of the above',
        answer:2,
    },
    {
        question:'An astronaut in outer space will observe sky as',
        choice1:'Red',
        choice2:'White',
        choice3:'Blue',
        choice4:'Black',
        answer:4,
    },
    {
        question:'Which is a green planet in the solar system?',
        choice1:'Pluto',
        choice2:'Venus',
        choice3:'Mars',
        choice4:'Urenus',
        answer:4,
    },
    {
        question:'Bats can fly in the dark because',
        choice1:'they have a better vision in the dark',
        choice2:'the light startles in them',
        choice3:'they produce high pitched sounds called ultrasonics',
        choice4:'none of the above',
        answer:3,
    },
    {
        question:'Which is considered as the biggest port of India?',
        choice1:'Mumbai',
        choice2:'Kolkata',
        choice3:'Vizag',
        choice4:'Chennai',
        answer:1,
    },
    {
        question:'Name the plant important in sericulture',
        choice1:'Pea',
        choice2:'Mulberry',
        choice3:'Cassia',
        choice4:'Legumes',
        answer:2,
    },
    {
        question:"Name the continent where 'Tundra' type of climate is not found",
        choice1:'Europe',
        choice2:'North America',
        choice3:'Africa',
        choice4:'Asia',
        answer:3,
    },
    {
        question:'G-15 is an economic grouping of',
        choice1:'First World Countries',
        choice2:'Second World Countries',
        choice3:'Third World Countries',
        choice4:'Fourth World Countries',
        answer:3,
    },
    {
        question:'Heavy Water Project (Talcher) and Fertilizer plant (Paradeep) are famous industries of',
        choice1:'Andhra Pradesh ',
        choice2:'Orissa',
        choice3:'Kerala',
        choice4:'Tamil Nadu',
        answer:2,
    },
    {
        question:'At which particular place on earth are days and nights of equal length always?',
        choice1:'Prime Meridian ',
        choice2:'Equator',
        choice3:'Poles',
        choice4:'No where',
        answer:2,
    },
    {
        question:'Kempegowda Festival was organized in which city ?',
        choice1:'Banglore ',
        choice2:'Kolkata',
        choice3:'Delhi',
        choice4:'Mumbai',
        answer:3,
    },
    {
        question:'Fedaration cup,World cup, Allwyn international trophy and challenge cup are awarded to winners of',
        choice1:'Fotball ',
        choice2:'Tennis',
        choice3:'Badminton',
        choice4:'Voleyball',
        answer:4,
    },
    {
        question:'The Worse case time complexity in quick sort is',
        choice1:'O(n) ',
        choice2:'O(n^2)',
        choice3:'O(nlogn)',
        choice4:'None of these',
        answer:2,
    },
    {
        question:'The Famous Dilwara temple is located in',
        choice1:'Rajasthan',
        choice2:'Utthar Pradesh',
        choice3:'Uttharkhand',
        choice4:'Madhya Pradesh',
        answer:1,
    },
]



const SCORE_POINTS=100
const MAX_QUESTIONS=10

startGame=()=>{
    questionCounter=
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}
getNewQuestion=()=>{
    if(availableQuestions.length ===0||questionCounter>MAX_QUESTIONS-1)
    {
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex=Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[questionsIndex]
    question.innerText=currentQuestion.question

    choices.forEach(choice=>{
        const number = choice.dataset['number']
        choice.innerText=currentQuestion['choice'+number]
    })
    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers=true
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers)
        return
        acceptingAnswers=false
        const selectedChoice=e.target
        const selectAnswer=selectedChoice.dataset['number']

        let classToApply=selectAnswer==currentQuestion.answer ? 'correct' :'incorrect'
        
        if(classToApply==='correct')
        {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})



incrementScore=nums=>{
    score+=nums
    scoreText.innerText=score
}
startGame()