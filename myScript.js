/* can use localStorage to store user variables as strings
window.localStorage.setItem('user', 'Steve Legon');
window.localStorage.getItem('user');
but this has to be a string   */

// TODO, NOTE, FIXME, CHANGES or FUTURE

window.onload = function () {

    var qIndex = -1; // index of current question
    var status = 0; // not started the run yet
    var myTimer; // the timer
    var seconds = 0; // starting time

    var sIndex = 0; // index of current section in mySections
    var section; // what type of section this is eg "ADD"
    var arrSections = ["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"]; // standard operators
    var intSectionsLeft = arrSections.length; // number of sections left
    var numClicks = 0; // number of clicks in this section
    var repeats = false; // are we doing the mistakes


    var numQuestions = 12; // number of questions in this section
    var questionsLeft = numQuestions; // number left to do in this section

    var arrFirst = []; // array for first numbers
    var arrLast = []; // array for last numbers
    var arrQuestions = []; // this will be the array of questions
    var rightAnswer = -1; // the correct answer to the current question
    var indexCorrect = -1; // index of the correct choice

    // define all DOM variables - ID's and classes
    var qFirst = document.getElementById("qFirst");
    var qSecond = document.getElementById("qSecond");
    var qAnswer = document.getElementById("qAnswer");
    var test = document.getElementById("test");
    var start = document.getElementById("start");

    var questions = document.getElementsByClassName("question");
    var answers = document.getElementsByClassName("answer");

    var ansOne = document.getElementById("answerOne");
    var ansTwo = document.getElementById("answerTwo");
    var ansThree = document.getElementById("answerThree");
    var ansFour = document.getElementById("answerFour");
    var ansFive = document.getElementById("answerFive");
    var ansSix = document.getElementById("answerSix");

    var timeDigits = document.getElementById("timeDigits");
    var operator = document.getElementById("operator");

    /*
    window.localStorage.setItem('name', '12');
    myVar = parseInt(window.localStorage.getItem('name'));
    alert(myVar*2);
     this code works so we can store a variable
     */
    //////////////////////////////////////////////////////////////////////

    start.onclick = function () ////// START BUTTON to start the test   /////////////////////
    {
        if (true) //(status == 0)		// if we are not already running
        {
            // make 2 random arrays
            arrFirst = newArray(numQuestions);
            arrFirst = randArray(arrFirst);

            arrLast = newArray(numQuestions);
            arrLast = randArray(arrLast);

            var testNum = 5; //NOTE temp code only do 5's
            for (var i = 0; i < numQuestions; i++) {
                arrLast[i] = testNum;
            }
            // alert(arrLast[1]);

            makeQuestions();

            status = 1; // set to 1 for adding
            qIndex = 0; // set to 0 for first question

            section = arrSections[sIndex]; // the current section

            if (questionsLeft > 0) {
                showQuestion();
            } // show the first question

            // make the text visible by making it black (it's white in the CSS)
            for (i = 0; i < questions.length; i++) {
                questions[i].style.color = "black";
            }
            for (i = 0; i < answers.length; i++) {
                answers[i].style.color = "black";
            }
            seconds = 0;
            startWatch();
            start.textContent = "PAUSE";
        } else {
            alert("PAUSE")
        } // code to pause after current question
    }; //  END onclick //

    // ANSWER CLICKS  onclick for answer buttons (must be an easier way)  ////////////////////
    ansOne.onclick = function () {
        answerClicked(0);
    };
    ansTwo.onclick = function () {
        answerClicked(1);
    };
    ansThree.onclick = function () {
        answerClicked(2);
    };
    ansFour.onclick = function () {
        answerClicked(3);
    };
    ansFive.onclick = function () {
        answerClicked(4);
    };
    ansSix.onclick = function () {
        answerClicked(5);
    };

    function answerClicked(index) /////   respond to clicks on answer buttons   /////////////
    {
        this.index = index;
        //// WRONG
        if (index != indexCorrect) {
            for (i = 0; i < answers.length; i++) {
                if (i != indexCorrect) {
                    answers[i].style.visibility = "hidden"; // hide all but correct
                }
            }
            if (qIndex == arrQuestions.length - 1) {
                qIndex = 0;
                repeats = true;
            } else {
                qIndex++;
            }
            setTimeout(reveal, 1000); // reveal after 1 second
        }
        /////  RIGHT
        else {
            arrQuestions[qIndex].complete = true; // done with this question
            questionsLeft--; // decrement the number left
            if (qIndex >= arrQuestions.length - 1) {
                qIndex = 0;
                repeats = true;
            } else {
                qIndex++;
            }
            if (questionsLeft > 0) {
                showQuestion();
            } // show the next question
            else {
                endSection();
            }
        }
    } //  END  //

    test.onclick = function () /////  to test code  ///////////////////////////////////////////
    {


        //alert("Test clicked");
        //startTimer();

        //clearTimeout( clearTime );

    } //  END  //

    ////////////  CALLED FUNCTIONS  /////////////////////////////////////////////////////////////

    function showQuestion() /////  find and show the question  ///////////////////////////////
    {
        // make sure function is never called when no questions left

        for (var n = 0; n < arrQuestions.length; n++) {
            var counter = n + qIndex; // start at qIndex
            counter = counter % arrQuestions.length; // remainder = index

            if (arrQuestions[counter].complete == false) // an active question
            {
                qIndex = counter; // make it next question
                break;
            }
        }
        if (repeats) {
            for (n = 0; n < questions.length; n++) {
                questions[n].style.borderColor = "rgba(150,0,0,0.25)";
            }

        }
        switch (section) {
            case "ADD":
                qFirst.textContent = arrQuestions[qIndex].firstNum;
                qSecond.textContent = arrQuestions[qIndex].lastNum;
                rightAnswer = arrQuestions[qIndex].sum;
                showAnswers();
                break; // quit when you find it

            case "SUBTRACT":
                operator.style.fontSize = "50px"; // need to make it bigger
                operator.textContent = "-";
                qFirst.textContent = arrQuestions[qIndex].sum;
                qSecond.textContent = arrQuestions[qIndex].lastNum;
                rightAnswer = arrQuestions[qIndex].firstNum;
                showAnswers();
                break;
            case "MULTIPLY":
                operator.textContent = "x";
                qFirst.textContent = arrQuestions[qIndex].firstNum;
                qSecond.textContent = arrQuestions[qIndex].lastNum;
                rightAnswer = arrQuestions[qIndex].product;
                showAnswers();
                break;
            case "DIVIDE":
                operator.textContent = String.fromCharCode(247);
                qFirst.textContent = arrQuestions[qIndex].product;
                qSecond.textContent = arrQuestions[qIndex].lastNum;
                rightAnswer = arrQuestions[qIndex].firstNum;
                showAnswers();
                break;
        }
    } //  END  //

    function showAnswers() ////// display possible answers in the 'answers' buttons  //////////
    {
        var choices = answers.length; // standard is 6 buttons so 6 options
        if (rightAnswer < choices) // if the answer is less than this
        {
            choices = rightAnswer + 1; // if rightAnswer is 3; choices = 4
        }
        var offset = Math.floor(Math.random() * choices); // if rightAnswer is 3 we have 0 1 2 or 3
        for (i = 0; i < answers.length; i++) {
            answers[i].textContent = rightAnswer - offset; // if offset is 2 then 1 will be 1st choice
            if (offset == 0)( // buttons end up with 1 2 3 4 5 6
                indexCorrect = i
            )
            offset--; // offset will end up as a negative
        }
    } //  END  //

    function reveal() /////////   make everything visible again  ///////////////////////////
    {
        for (i = 0; i < answers.length; i++) {
            answers[i].style.visibility = "visible";
        }
        //qIndex ++;
        if (qIndex >= arrQuestions.length) {
            qIndex = 0;
        }
        if (questionsLeft > 0) {
            showQuestion();
        } else {
            endSection();
        }
    } //  END  //

    function endSection() //////   all questions completed   ////////////////////////////////
    {
        if (sIndex == arrSections.length - 1) // finished last section
        {
            clearTimeout(myTimer); // stop the timer
            for (n = 0; n < questions.length; n++) {
                questions[n].style.borderColor = "rgba(200,200,200,0.15)";
            }
            qIndex = 0; // first question
            for (i = 0; i < questions.length; i++) {
                questions[i].style.color = "white";
            }
        } else // next section
        {
            sIndex++; // next section
            repeats = false;
            for (n = 0; n < questions.length; n++) {
                questions[n].style.borderColor = "rgba(200,200,200,0.15)";
            }
            qIndex = 0; // first question
            arrFirst = newArray(numQuestions);
            arrFirst = randArray(arrFirst);

            arrLast = newArray(numQuestions);
            arrLast = randArray(arrLast);

            var testNum = 5; //NOTE temp code
            for (i = 0; i < numQuestions; i++) {
                arrLast[i] = testNum;
            }
            // alert(arrLast[1]);

            makeQuestions();
            section = arrSections[sIndex]; // the current section

            if (questionsLeft > 0) {
                showQuestion();
            } // show the first question
        }
    } //  END  //

    function newArray(size) /////// newArray  make an array of numbers (1 to size inclusive)
    {
        var thisArray = [];
        for (i = 0; i < size; i++) {
            thisArray[i] = i + 1;
        }
        return thisArray;
    } //  END  //

    function randArray(thisArray) ////// randomise an array  ////////////////////////////////
    {
        var temp, rand;
        for (i = 0; i < thisArray.length; i++) {
            temp = thisArray[i];
            rand = Math.floor(Math.random() * numQuestions); // 0 to 11
            thisArray[i] = thisArray[rand]; // swap numbers
            thisArray[rand] = temp;
        }
        return thisArray;
    } //  END  //

    function makeQuestions() // make array of questions based on 2 arrays of numbers  ////////
    {
        for (i = 0; i < numQuestions; i++) {
            arrQuestions[i] = new Question(arrFirst[i], arrLast[i]);
            // make a question then add it to the array of questions
        }
        questionsLeft = arrQuestions.length;
    } //  END  //

    //var count = 0;


    // minutes = 0; 	//hours = 0; 	// var clearState; 	// var secs, mins, gethours ;


    function startWatch() ////////////   TIMER    //////////////////////////////////////////
    { // display the stopwatch
        var x = document.getElementById("timeDigits");
        myColon = seconds % 60 < 10 ? " : 0" : " : "; // format for minutes & seconds
        var myMinSec = Math.floor(seconds / 60) + myColon + seconds % 60;
        x.innerHTML = myMinSec;
        // after displaying the stop watch, increment seconds
        seconds++;
        // call the setTimeout( ) to keep the stop watch alive !
        myTimer = setTimeout(startWatch, 1000); // function calls itself every second
        // call this function from the START button; end it from FINISH code
    } //  END  //

    //////////////    CONSTRUCTORS  //////////////////////////


    function Question(first, last) ///////   Constructor for Question objects  ///////////////
    {
        this.firstNum = first; // first number
        this.lastNum = last; // second number
        this.sum = first + last; // sum of numbers
        this.product = first * last; // product of numbers
        this.complete = false; // boolean, question complete
    } //  END  //


} // end of window.onload	/////////////////////////////////////////////////////////////////
