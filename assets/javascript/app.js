var count = 30;
var myClock;
var unAnswered = 0;
var correct = 0;
var inCorrect = 0;
var answers = [];

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
    choices: ["1,2,3", "0,1,2", "3,5,7", "2,4,8"],
    correctAnswer: "1,2,3",
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

function showQuestions() {
    for (var i = 0; i < question.length; i++) {
        var questionNumber = i + 1;
        $(".questions").append("<h5 question>" + questionNumber + ". " + question[i].text + "</h5>");
        $(".questions").append("<form class='choices" + i + "'>");
        $(".choices" + i).append("<input type=radio value=" + question[i].choices[0] + " name=choice" + i + " id =q" + i + "c0>");
        $(".choices" + i).append("<label for=q" + i + "c0>" + question[i].choices[0]);
        $(".choices" + i).append("<input type=radio value=" + question[i].choices[1] + " name=choice" + i + " id =q" + i + "c1>");
        $(".choices" + i).append("<label for=q" + i + "c1>" + question[i].choices[1]);
        $(".choices" + i).append("<input type=radio value=" + question[i].choices[2] + " name=choice" + i + " id =q" + i + "c2>");
        $(".choices" + i).append("<label for=q" + i + "c2>" + question[i].choices[2]);
        $(".choices" + i).append("<input type=radio value=" + question[i].choices[3] + " name=choice" + i + " id =q" + i + "c3>");
        $(".choices" + i).append("<label for=q" + i + "c3>" + question[i].choices[3]);
    }
}

function myTimer() {
    //called every second when the clock is set
    //if the count decrements below zero the interval is cleared.
    $(".time-remaining").text("Time Remaining: " + count + " seconds");
    count--;
    if (count < 0) {
        clearInterval(myClock);
        score();
    }
};

function score() {
    //check the answers
    for (var i = 0; i < question.length; i++) {
        var inputName = "choice" + i;
        if ($('input[name=' + inputName + ']:checked')) {
            //if a question is answered, correct it
            console.log("HERE " + $('input[name=' + inputName + ']:checked').val() + question[i].correctAnswer);
            if (question[i].correctAnswer === $('input[name=' + inputName + ']:checked').val()) {
                //correct answer
                correct++;
            }
            else if($('input[name=' + inputName + ']:checked').val()) {
                //incorrect answer
                inCorrect++;
            }
        }
    }
    //unanswered
    unAnswered = question.length - correct - inCorrect;

    //print the results
    $(".second").hide();
    $(".third").append("<h2 class=text-center> All Done!");
    $(".third").append("<h3 class=text-center> Correct Answers: " + correct);
    $(".third").append("<h3 class=text-center> InCorrect Answers: " + inCorrect);
    $(".third").append("<h3 class=text-center> Unanswered: " + unAnswered);
}

// jQuery Ready Function waits for the document to complete loading before initiating JavaScript
$(document).ready(function () {

    $("#start-button").on("click", function () {
        //when the start button is clicked, hide it and start the clock.
        $("#start-button").hide();
        //  Set the button alert's timeout to run three seconds after the function's called.
        myClock = setInterval(myTimer, 1000);
        $(".time-remaining").text("Time Remaining: ");
        showQuestions();
        $("#done-button").show();
    });

    $("#done-button").on("click", function () {
        //when the done button is clicked, hide the questions and display score
        score();
    });

});

//change height to auto
//set number back to 30