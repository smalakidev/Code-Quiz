var questionsBank = [
    {
        question: "What HTML Stand for?",
        choices: ["tues", "mon", "frid"],
        answer: "fridH"
    },
    {
        question: "what color do you like?",
        choices: ["blue", "yello", "green"],
        answer: "green"
    },    
    {
        question: "what is the sky?",
        choices: ["tues", "mon", "frid"],
        answer: "frid"
    },

];


console.log("THIS IS THIS", this)

//getElementbyID allows us to be able to click on anything
//with an ID name on the HTMl and work accordingly
var startBtn = document.getElementById("startBtn");
                  //  $("#startBtn"); jQuery;
var quizArea = document.getElementById("quizArea");
var startScreen = document.getElementById("startScreen")
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var timeDiv = document.getElementById("time");
var check = document.getElementById("check");
var form = document.getElementById("end-screen")
var submit = document.getElementById("submit");
var inputEl = document.getElementById("initials");
var index =  0;
var time = 75;
//questionsBank.length * 15;
var timer;

//This tells us exactly the button that is being clicked on by the user
function checkAnswer(){
    console.log("CLICKED!!!!!!", this, this.value )
    //comparing the users selection to the answer of the question
    //Hints try console.log(this) 

//compare users answer to actual answer
    if (questionsBank[index].answer !== this.value) {
        //incorrect
        //alert user they were incorrect
      //  alert("Incorrect!")
      console.log(check, questionDiv)
        check.textContent = "Incorrect";
        //penalize the time
        time = time - 15;
       
        //redisplay the time 
        timeDiv.textContent = time;
    }else{
        //correct
        //diplay correct
     //   alert("Cirrect!")
     check.textContent = "Correct";
     
    }



    //move to the next question
    index++;
    //check to see if we have more questions
        //if we do not have more questions, end the game
        if(index === questionsBank.length){
            //call fucntion to end the game
          //  alert("NO MORE QUESTIONS, END GAME")
            endGame();
        }else{
                    getQuestion()
        }

};

function getQuestion (){
    //display question
    //display each choice in button
        //assigned an onclick to check the users answer (checkanswer())
  //  console.log(questionsBank[index].question)

    //clear out previouse btns, so we can append new btns
    choicesDiv.innerHTML = "";

    //APPEND QUESTION. This brings the questions to the forefront. We are
    //singling out the first question from that first index position.
    questionDiv.textContent = questionsBank[index].question;
    //CHOICES ARRAY VARIABLE with use of dot notation.
    var choicesArr = questionsBank[index].choices;

    for (let i = 0; i < choicesArr.length; i++) {
     //   console.log(choicesArr[i])
        var btn = document.createElement("button");
        btn.setAttribute("class", "choices");
        btn.setAttribute("value", choicesArr[i])
        btn.textContent = choicesArr[i]
        btn.onclick = checkAnswer;
        choicesDiv.appendChild(btn);   
    }
};

function clock (){
    time--;
    timeDiv.textContent = time;

    //condition that checks to see if time = 0. Clearinterval stops the timer.
    if(time <= 0){ 
        endGame();
        console.log("END QUIZ")
    }

    //if time == 0 then end our game
    //else cont w/ quiz
}

startBtn.addEventListener("click", function(){
    quizArea.removeAttribute("class");
    startScreen.setAttribute("class", "hide");

    //timer
    timer = setInterval(clock, 1000);
    //create a function to diaplay question and choices
    getQuestion();
})

function endGame(){
    //clear our interval
    clearInterval(timer);
    console.log(time);
    // hide quiz are
    quizArea.setAttribute("class", "hide");
    //show form 
    form.removeAttribute("class")
    document.getElementById("final-score").textContent = time;
};


function saveScores(){
    //grabbing text entered by the user storing into the variable
    var initials = inputEl.value;

    console.log("submit", time, initials);
    //get saved scores from localstorage or if not any, set it to an empty array
    var highscoresArr = JSON.parse(localStorage.getItem("highscores")) || [];

    //create a new score obj for current user
    var userScore = {
        score: time,
        init : initials
    };

        //push userscore obj into highscoresArr (which is an array)
    highscoresArr.push(userScore);
    //turning array into a string and storing it into localstore. This is 
    //a key value pair.
    localStorage.setItem("highscores", JSON.stringify(highscoresArr));

    //redirect page
    window.location.href ="highscores.html";

};


//form submit btn
submit.onclick = saveScores;
