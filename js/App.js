const actionToggle = document.getElementById("toggle");
const img = document.createElement("img");
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

//select all the btn(hml,css,,)
const btns = document.querySelectorAll(".js-btn-features button");
//loop through to add event
btns.forEach((button) => {
  button.addEventListener("click", () => {
    //use data data atribute to know which btn is to be seleclted
    const feature = button.dataset.feature;
    // console.log(`Button clicked: ${feature}`);

    //each time button is clicked, it give value of that button e.g feature =html(by clicking html button)
    showClick(feature);
    // document.querySelector('.toggle__bar').classList.add('active')

    //after clicking remove the elements
    document.querySelector(".content__quiz").classList.add("active");
    document.querySelector(".button__features").classList.add("active");
    document
      .querySelector(".question__container")
      .classList.remove("question__container");
  });
});

//used to identify attribute from data.json that button feature which data is to be retrive
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

//retrive all specific question form json
function getQuestions(matchItem) {
  const questionArray = [];
  matchItem.questions.forEach((item) => {
    questionArray.push(item.question);
  });
  return questionArray;
}
//retive option
function getOptions(matchItem) {
  const optionArray = [];
  matchItem.questions.forEach((questions) => {
    optionArray.push(questions.options);
  });
  return optionArray;
}
//retrive answers
function getAnswer(matchItem) {
  const answerArray = [];
  matchItem.questions.forEach((question) => {
    answerArray.push(question.answer);
  });
  return answerArray;
}

//display qeustiona dnd option in the frontend
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

//checks answer by matching to options
function checkResult(answer) {
  let currentIndex = 0;
  let score = 0;

  console.log(score);

  const optionElement = document.querySelectorAll(".option");
  const nextSubmitBtn = document.querySelector(".submit-answer");
  nextSubmitBtn.disabled = true;
  optionElement.forEach((option) => {
    option.addEventListener("click", () => {
     nextSubmitBtn.disabled=false
     optionElement.forEach((btn)=>btn.classList.remove('correct__option'))
     option.classList.add('correct__option')

    });
  });
  nextSubmitBtn.addEventListener("click", () => {
    
    if (currentIndex < answer.length - 1) {
     
      nextSubmitBtn.disabled = true;
      currentIndex++;
      optionElement.forEach((btn)=>btn.classList.remove('correct__option'))
     
    } else {
      nextSubmitBtn.disabled = true;
    }
  });
}





