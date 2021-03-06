import Question from "./Question.js";
import Quiz from "./Quiz.js"

const App = (() => {
  // cache the DOM
  const quizEl = document.querySelector(".quiz");
  const quizQuestionEl = document.querySelector(".quiz__question");
  const trackerEl = document.querySelector(".quiz__tracker");
  const taglineEl = document.querySelector(".quiz__tagline");
  const choicesEl = document.querySelector(".quiz__choices");
  const progressInnerEl = document.querySelector(".progress__inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  const q1 = new Question(
        "Vilket år är Rojin född? ",
        [1991, 1992, 1996, 1997],
        2
      );
      const q2 = new Question(
        "Vilket Land föddes Rojin i? ",
        ["Turkiet", "Norge", "Danmark", "Sverige"],
        3
      );
      const q3 = new Question(
        "Vad för ögonfärg har Rojin? ",
        ["bruna", "kastanjbruna", "mörkbruna", "blåa"],
        1
      );
      const q4 = new Question(
        "Vilket stad bor Rojin i? ",
        ["Växjö", "Malmö", "Stockholm", "Uppsala"],
        2
      );

  const quiz = new Quiz([q1, q2, q3, q4]);

  const listeners = () => {
    nextButtonEl.addEventListener("click", function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
      if (selectedRadioElem) {
        const key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
      }
    })

    restartButtonEl.addEventListener("click", function() {
      // 1. reset the quiz
      quiz.reset();
      // 2. renderAll
      renderAll();
      // 3. restore the next button
      nextButtonEl.style.opacity = 1;
    })
  }

  const setValue = (elem, value) => {
    elem.innerHTML = value;
  }

  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
  }

  const renderChoicesElements = () => {
    let markup = "";
    const currentChoices = quiz.getCurrentQuestion().choices;
    currentChoices.forEach((elem, index) => {
      markup += `
        <li class="quiz__choice">
          <input type="radio" name="choice" class="quiz__input" data-order="${index}" id="choice${index}">
          <label for="choice${index}" class="quiz__label">
            <i></i>
            <span>${elem}</span>
          </label>
        </li>
      `
    });

    setValue(choicesEl, markup);
  }

  const renderTracker = () => {
    const index = quiz.currentIndex;
    setValue(trackerEl, `${index+1} of ${quiz.questions.length}`)
  }

  const getPercentage = (num1, num2) => {
    return Math.round((num1/num2) * 100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%";
      }
    }, 3)
  }

  const renderProgress = () => {
    // 1. width
    const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
    // 2. launch(0, width)
    launch(0, currentWidth);
  }

  const renderEndScreen = () => {
    setValue(quizQuestionEl, `Great Job!`);
    setValue(taglineEl, `Complete!`);
    setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
    nextButtonEl.style.opacity = 0;
    renderProgress();
  }

  const renderAll = () => {
    if (quiz.hasEnded()) {
      // renderEndScreen
      renderEndScreen();
    } else {
      // 1. render the question
      renderQuestion();
      // 2. Render the choices elements
      renderChoicesElements()
      // 3. Render Tracker
      renderTracker();
      // 4. Render Progress
      renderProgress();
    }
  }

  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();

App.renderAll();
App.listeners();



// import Question from "./Question.js";
// import Quiz from "./Quiz.js";

// const App = (() => {
//   //cache the DOM
//   const quizEl = document.querySelector(".quiz");
//   const quizQuestionEl = document.querySelector(".quiz__question");
//   const trackerEl = document.querySelector(".quiz__tracker");
//   const taglineEl = document.querySelector("quiz__tagline");
//   const choicesEl = document.querySelector(".quiz__choices");
//   const progressInnerEl = document.querySelector(".progress__inner");
//   const nextButtonEl = document.querySelector(".next");
//   const restartButtonEl = document.querySelector(".restart");

//   const q1 = new Question(
//     "Vilket år är Rojin född? ",
//     [1991, 1992, 1996, 1997],
//     2
//   );
//   const q2 = new Question(
//     "Vilket Land föddes Rojin i? ",
//     ["Turkiet", "Norge", "Danmark", "Sverige"],
//     3
//   );
//   const q3 = new Question(
//     "Vad för ögonfärg har Rojin? ",
//     ["bruna", "kastanjbruna", "mörkbruna", "blåa"],
//     1
//   );
//   const q4 = new Question(
//     "Vilket stad bor Rojin i? ",
//     ["Växjö", "Malmö", "Stockholm", "Uppsala"],
//     2
//   );
//   const q5 = new Question(
//     "console.log(typeof []) would return what?",
//     ["Array", "Object", "null", "array"],
//     1
//   )

//   const quiz = new Quiz([q1, q2, q3, q4, q5]);

//   // eventlistners
//   const listeners = () => {
//     nextButtonEl.addEventListener("click", () => {
//       //we are getting the input button who is checked or click on
//       let selectedRadioElem = document.querySelector('input[name="choice"]:checked');
//       if (selectedRadioElem) {
//         const key = Number(selectedRadioElem.getAttribute("data-order"));
//         quiz.guess(key);
//         renderAll();
//       }
//       // if (selectedRadioElem) {
//       //   // we get the data order
//       //   const key = Number(selectedRadioElem.getAttribute("data-order"));
//       //   //we are compering the click elem/key in our guess function. and it's compared to the original answer key
//       //   quiz.guess(key);
//       //   renderAll();
//       // }
//     });


//     restartButtonEl.addEventListener("click", () => {
//       //1. reset quix
//       quiz.reset();
//       //2. render all
//       renderAll();
//       //3. get button back
//       nextButtonEl.style.opacity = 1;
//     });
//   };

//   //function for change text, questions
//   // const setValue = (elem, value) => {
//   //   elem.innerHTML = value;
//   // };

//    //setValue 
//    const setValue = (elem, value) => {
//     elem.innerHTML = value;
//   }

//   //creating a renderQuestion
//   const renderQuestion = _ => {
//     const question = quiz.getCurrentQuestion().question;
//     setValue(quizQuestionEl, question);
//   }

//   const renderChoicesElements = () => {
//     let markup = "";
//     //get all the choices, answer possibilities
//     const currentChoices = quiz.getCurrentQuestion().choices;
//     //console.log(currentChoices);
//     currentChoices.forEach((elem, index) => {
//       markup += `
			
//       <li class="quiz__choice">
//       <input type="radio" name="choice" class="quiz__input" data-order="${index}" id="choice${index}">
//       <label for="choice${index}" class="quiz__label">
//         <i></i>
//         <span>${elem}</span>
//       </label>
//     </li>
	
// 		`;
//     });
//     //then the markup with help of innerhtml or we  can reuse the function set value
//     setValue(choicesEl, markup);
//   };

//   //render tracker

//   const renderTracker = () => {
//     //getting the index
//     const index = quiz.currentIndex;
//     // setting the tracker with back-ticks, index + 1  = 1 of quiz.q.length = questions array = 4
//     setValue(trackerEl, `${index+1} of ${quiz.questions.length}`)
//   };

//   // Creating a percentage function
//   const getPercentage = (num1, num2) => {
//     return Math.round((num1/num2) * 100);
//   }

//   //creating loading or launch
//   const launch = (width, maxPercent) => {
//     //create loading bar and set interval
//     let loadingBar = setInterval(() => {
//       //if statement checkin width is bigger then max,
//       if (width > maxPercent) {
//         clearInterval(loadingBar);
//       } else {
//         //if it's not max we iterate and changing the progress bar
//         width++;
//         progressInnerEl.style.width = width + "%";
//       }
//     }, 3);
//   };
//   // render Progress
//   const renderProgress = () => {
//     // 1. width
//     const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
//     // 2. launch(0, width)
//     launch(0, currentWidth);
//   }

//   const renderEndScreen = () => {
//     setValue(quizQuestionEl, `Great Job!`);
//     setValue(taglineEl, `Complete!`);
//     setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
//     nextButtonEl.style.opacity = 0;
//     renderProgress();
//   }

//   const renderAll = _ => {
//     if (quiz.hasEnded()) {
//       // renderEndScreen
//       renderEndScreen();
//     } else {
//       // 1. render the question
//       renderQuestion();
//       // 2. Render the choices elements
//       renderChoicesElements()
//       // 3. Render Tracker
//       renderTracker();
//       // 4. Render Progress
//       renderProgress();
//     }
//   }

//   return {
//     renderAll: renderAll,
//     listeners: listeners
//   }
// })();

// App.renderAll();
// App.listeners();
// // const q1 = new Question(`What's 1 + 1? `, [2, 3, 4, 6], 0);
// // console.log(q1.isCorrect(0));
//
// const q1 = new Question('what is 2 + 2?', [2,3,4,5], 2);
// const q2 = new Question('how old is Elmin?', [21,22,23,30], 3 );
//
//
// const qArray = [q1, q2];
//
// console.log(qArray)
//
// const myQuiz = new Quiz (qArray);
//
// console.log(myQuiz.getCurrentQuestion());
// //button next click
// myQuiz.nextIndex();
// console.log(myQuiz.getCurrentQuestion());
//
//
// // MOdule Pattern
//
// const App = (function() {
//
// 	let counter = 0;
// 	const incrementCounter = () => {
// 		counter++;
// 	}
//
// 	const doubleConter = () => {
// 		counter *=2;
// 	}
//
// 	const getCounter = () => {
// 		return counter;
// 	}
//
// 	const setCounter = (newNum) => {
// 		counter = newNum;
// 	}
//
// 	//public methods - revealing module pattern
// 	return {
// 		get: getCounter,
// 		set: setCounter,
// 	}
// })();
//
