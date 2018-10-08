//long count for questiona
var count = 30;
//timer variable
var myClock;
//total unanswered, incorrect, correct answers
var unAnswered = 0;
var correct = 0;
var inCorrect = 0;
//state of the slide show
var state = "question";
//counter for index of question
var i = 0;
//clicked on selection
var selection;

//array of objects that contains the questions, choices, and the correct answer.
var question = [{
    text: "I am an odd number. Take away one letter and I become even. What number am I?",
    choices: ["1", "7", "8", "11"],
    correctAnswer: "7",
},
{
    text: "There is a three digit number. The second digit is four times as big as the third digit, while the first digit is three less than the second digit. What is the number?",
    choices: ["141", "285", "821", "741"],
    correctAnswer: "141",
},
{
    text: "Which 3 numbers have the same answer whether they’re added or multiplied together?",
    choices: ["1, 2, 3", "0, 1, 2", "3, 5, 7", "2, 4, 8"],
    correctAnswer: "1, 2, 3",
},
{
    text: "Which number comes first if all single digit numbers are arranged alphabetically?",
    choices: ["1", "4", "8", "9"],
    correctAnswer: "8",
},
{
    text: "Which of the following numbers is twice the sum of its digits?",
    choices: ["98", "68", "32", "18"],
    correctAnswer: "18",
},
{
    text: "Which of the following letter is NOT in any of the numbers when written as words?",
    choices: ["A", "K", "Q", "Z"],
    correctAnswer: "K",
},
{
    text: "Which of the following numbers is equal to the sum of the cube of its digits?",
    choices: ["152", "179", "283", "371"],
    correctAnswer: "371",
},
{
    text: "Which number comes next in the Fibonacci Sequence 1, 1, 2, 3, 5, 8, 13, 21, 34?",
    choices: ["89", "55", "42", "47"],
    correctAnswer: "55",
},
];

function showQuestion() {
    //show counter
    $(".time-remaining").text("Time Remaining: 30 seconds");
    //hide previous question
    $(".questions").empty();
    //displays a question and 4 answer choices
    var questionNumber = i + 1;
    $(".questions").append("<h4 question>" + questionNumber + ". " + question[i].text + "</h5>");
    $(".questions").append("<h5 class=choices id=q" + i + "c0>" + question[i].choices[0]);
    $(".questions").append("<h5 class=choices id=q" + i + "c1>" + question[i].choices[1]);
    $(".questions").append("<h5 class=choices id=q" + i + "c2>" + question[i].choices[2]);
    $(".questions").append("<h5 class=choices id=q" + i + "c3>" + question[i].choices[3]);
};

function setIntervalTime() {
    //clear existing timer and set the timer function to be called every second
    clearInterval(myClock);
    myClock = setInterval(myTimer, 1000);
}

function myTimer() {
    //called every second when the clock is set
    if (state === "question") {
        $(".time-remaining").text("Time Remaining: " + count + " seconds");
    }
    count--;
    //if the count decrements below zero the interval is cleared.
    if (count < 0) {
        if (state === "question") {
            //if showing the question when the clock runs out, clear the interval, set state to answer, increment unanswered count, set selection to nothing and correct the answer
            clearInterval(myClock);
            state = "answer";
            unAnswered++;
            selection = "";
            correctAnswer();
        }
        else {
            //if showing the answer when the clock runs out, clear the interval, set state to question, increment the index of the question
            clearInterval(myClock);
            state = "question";
            i++;
            if (i >= question.length) {
                //if the index of the question is at the end, show the final score
                finalScore();
            }
            else {
                //otherwise reset the count to 30 and show the next question
                count = 30;
                setIntervalTime();
                showQuestion();
            }
        }
    }
};

function correctAnswer() {
    //if a question is answered, correct it

    //set the counter to 5 to display the correct answer
    count = 5;
    setIntervalTime();

    //hide question
    $(".questions").empty();
    //hide timer
    $(".time-remaining").empty();

    //correct the answer, tabulate
    if (question[i].correctAnswer === selection) {
        // correct answer
        correct++;
        $(".questions").append("<h4>" + "Yes");
    }
    else {
        //incorrect answer
        if (selection !== "") {
            //wrong selection was made
            inCorrect++;
            $(".questions").append("<h4>" + "No");
        }
        else {
            //incorrect because of timeout
            $(".questions").append("<h4>" + "Out of time!");
        }
    }

    $(".questions").append("<h4>" + "The correct answer is " + question[i].correctAnswer + ".");
};

function finalScore() {
    //print the final results
    $(".second").hide();
    $(".third").append("<h2 class=text-center> All Done!");
    $(".third").append("<h3 class=text-center> Correct Answers: " + correct);
    $(".third").append("<h3 class=text-center> InCorrect Answers: " + inCorrect);
    $(".third").append("<h3 class=text-center> Unanswered: " + unAnswered);

    //restart button
    $(".third").append("<h1 class=text-center id=restart-button> Restart?");

}

// jQuery Ready Function waits for the document to complete loading before initiating JavaScript
$(document).ready(function () {

    $("#start-button").on("click", function () {
        //when the start button is clicked, hide it and start the clock.
        $("#start-button").hide();
        setIntervalTime();
        showQuestion();
    });

    $(document).on("click", ".choices", function () {
        //when the answer is selected, hide the questions and correct the answer
        selection = $(this).text();
        clearInterval(myClock);
        state = "answer";
        correctAnswer();

    });

    $(document).on("click", "#restart-button", function () {
        //when the restart button is selected, reset the global variables, empty the html, reset the clock and show the questions.
        i=0;
        count = 30;
        state = "question";
        inCorrect = 0;
        unAnswered = 0;
        correct = 0;
        inCorrect = 0;

        $(".second").show();
        $(".third").empty();

        setIntervalTime();
        showQuestion();
    });

});

