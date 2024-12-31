const actionToggle = document.getElementById("toggle");
actionToggle.addEventListener("click", (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});
const response = await fetch("./data.json");
const data = await response.json();

// console.log(data);
// data.quizzes.forEach((item) => {
//     console.log(item.title);
// });

// data.quizzes.forEach((item)=>{
//     console.log(item.icon)
// })

// data.quizzes.forEach((item)=>{
//     item.questions.forEach((item)=>{
//       console.log(item.options)
//     })
// })

const btns = document.querySelectorAll(".js-btn-features button");

btns.forEach((button) => {
  button.addEventListener("click", () => {
    const feature = button.dataset.feature;
    // console.log(`Button clicked: ${feature}`);
    showClick(feature);
    // document.querySelector('.toggle__bar').classList.add('active')
    document.querySelector(".content__quiz").classList.add("active");
    document.querySelector(".button__features").classList.add("active");
    document
      .querySelector(".question__container")
      .classList.remove("question__container");
  });
});

function showClick(feature) {
  let matchItem;
  data.quizzes.forEach((item) => {
    if (feature === item.title) {
      // console.log(item)
      // getQuiz(item)
      matchItem = item;
    }
  });
  //   getQuiz(matchItem)
  const question = getQuestions(matchItem);
  const options = getOptions(matchItem);
  const answer = getAnswer(matchItem);
  console.log(answer);
  // console.log(question)
  // console.log(options);
  displayQuestionsAndOptions(question, options);
  checkResult(answer);

  // displayQuestions(getQuestions(matchItem))
}

function getQuestions(matchItem) {
  const questionArray = [];
  matchItem.questions.forEach((item) => {
    questionArray.push(item.question);
  });
  return questionArray;
}
function getOptions(matchItem) {
  const optionArray = [];
  matchItem.questions.forEach((questions) => {
    optionArray.push(questions.options);
  });
  return optionArray;
}
function getAnswer(matchItem) {
  const answerArray = [];
  matchItem.questions.forEach((question) => {
    answerArray.push(question.answer);
  });
  return answerArray;
}

function displayQuestionsAndOptions(array, arrayOptions) {
  let currentIndex = 0;
  const questionText = document.querySelector(".question");
  const optionsQuiz = document.querySelectorAll(".option");
  const nextSubmitBtn = document.querySelector(".submit-answer");

  function loadQuestionAndOptions(index) {
    questionText.textContent = array[index];
    arrayOptions[index].forEach((option, index) => {
      optionsQuiz[index].textContent = option;
      optionsQuiz[index].style.display = "block";
    });
  }
  loadQuestionAndOptions(currentIndex);
  nextSubmitBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < array.length) {
      loadQuestionAndOptions(currentIndex);
    } else {
      nextSubmitBtn.style.display = "none";
    }
  });
}

function checkResult(answer) {
  let currentIndex = 0;
  const optionElement = document.querySelectorAll(".option");
  const nextSubmitBtn = document.querySelector(".submit-answer");
  optionElement.forEach((option) => {
    option.addEventListener("click", () => {
      //  console.log(option.childNodes[0])

      // question.forEach((answers)=>{
      //   console.log(answers.answer)
      // })
      console.log(answer[currentIndex]);
      console.log(option.childNodes[0].textContent.replace(/"/g, ""));
      if (currentIndex < answer.length) {
        if (
          answer[currentIndex] ===option.childNodes[0].textContent.replace(/"/g, "")
        ) {
          console.log('correct answer')
        } else {
         console.log('incorrect answer')
        }
      }
     
    });
  });
  nextSubmitBtn.addEventListener('click',()=>{
    currentIndex++;
  })
}
