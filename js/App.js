import { fetchQuizData, getQuizBySubject } from './getData.js';

const firstPage = document.querySelector('.first__page')
const secondPage = document.querySelector('.second__page')
const thirdPage = document.querySelector('.third__page')


const subjectButtons = document.querySelectorAll('.button__features button');
const questionContainer = document.querySelector('.question__container');
const questionNumber = document.querySelector('.question-number');
const questionTotal = document.querySelector('.question-total');
const questionText = document.querySelector('.question');
const options = document.querySelectorAll('.option');
const progressBar = document.querySelector('.progress-bar.done');
const submitButton = document.querySelector('.submit-answer');
const selectPrompt = document.querySelector('.select-prompt');
const finalScore = document.querySelector('.final-score');
const completeQuestionTotal = document.querySelector('.complete-question-total');
const subjectTitle = document.querySelector('.subject-title');
const subjectImage = document.querySelector('.subject-img');
const restartButton = document.querySelector('.restart');
const toggleTheme = document.getElementById('toggle');

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let quizData = null;


firstPage.style.display = 'flex';
secondPage.style.display = 'none';
thirdPage.style.display = 'none';


async function initializeApp() {
  quizData = await fetchQuizData();
  if (quizData) {
    initializeEventListeners();
  }
}

function initializeEventListeners() {

  subjectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feature = button.getAttribute('data-feature');
      startQuiz(feature);
    });
    
    // Keyboard handling for subject buttons
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const feature = button.getAttribute('data-feature');
        startQuiz(feature);
      }
    });
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selectAnswer(option);
    });
    
 
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectAnswer(option);
      }
    });
  });

  submitButton.addEventListener('click', checkAnswer);
  

  submitButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      checkAnswer();
    }
  });


  restartButton.addEventListener('click', resetQuiz);

  restartButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      resetQuiz();
    }
  });

  toggleTheme.addEventListener('change', toggleThemeHandler);
}


function toggleThemeHandler() {
  if (toggleTheme.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}


function startQuiz(subject) {
  currentQuiz = getQuizBySubject(quizData, subject);
  
  if (!currentQuiz) return;
  
  currentQuestionIndex = 0;
  score = 0;
  

  // updateSubjectHeader(currentQuiz);
  

  questionTotal.textContent = currentQuiz.questions.length;
  completeQuestionTotal.textContent = currentQuiz.questions.length;
  

  firstPage.style.display = 'none';
  secondPage.style.display = 'block';
  thirdPage.style.display = 'none';
  

  loadQuestion();
}

// function updateSubjectHeader(quiz) {
//   const subjectHeaders = document.querySelectorAll('.result-header');
  
//   subjectHeaders.forEach(header => {
//     const subjectIconContainer = header.querySelector('.subject-icon-container');
//     const subjectTitle = header.querySelector('.subject-title');
//     const subjectImg = header.querySelector('.subject-img');
    
//     subjectTitle.textContent = quiz.title;
    
//     switch(quiz.title.toLowerCase()) {
//       case 'html':
//         subjectIconContainer.style.backgroundColor = 'var(--html-bg)';
//         break;
//       case 'css':
//         subjectIconContainer.style.backgroundColor = 'var(--css-bg)';
//         break;
//       case 'javascript':
//         subjectIconContainer.style.backgroundColor = 'var(--js-bg)';
//         break;
//       case 'accessibility':
//         subjectIconContainer.style.backgroundColor = 'var(--accessibility-bg)';
//         break;
//     }
    
//     subjectImg.src = quiz.icon || `./assets/icon-${quiz.title.toLowerCase()}.svg`;
//     subjectImg.alt = quiz.title;
//   });
// }

function loadQuestion() {
  if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
    showResults();
    return;
  }
  
  const question = currentQuiz.questions[currentQuestionIndex];

  resetOptions();
  selectedOption = null;
  selectPrompt.classList.add('hidden');
  

  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = question.question;
  

  const progressPercentage = (currentQuestionIndex / currentQuiz.questions.length) * 100;
  progressBar.style.setProperty('--progress', `${progressPercentage}%`);
  document.querySelector('.progress-bar.whole').setAttribute('aria-valuenow', progressPercentage);
  

  options.forEach((option, index) => {
    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
    const optionText = question.options[index];
    

    option.innerHTML = '';
    

    const optionBox = document.createElement('div');
    optionBox.className = 'option-box';
    optionBox.textContent = optionLetter;
    option.appendChild(optionBox);
    

    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = optionText;
    

    textSpan.style.color = document.documentElement.hasAttribute('data-theme') ? '#FFFFFF' : '#313E51';
    textSpan.style.fontWeight = '600';
    textSpan.style.display = 'block';
    
    option.appendChild(textSpan);
    
  
    option.setAttribute('aria-label', `Option ${optionLetter}: ${optionText}`);
    option.setAttribute('aria-checked', 'false');
    option.setAttribute('tabindex', '0'); // Make it focusable
  });
  

  submitButton.disabled = true;
}

// Select an answer option
function selectAnswer(option) {

  options.forEach(opt => {
    opt.classList.remove('selected');
    opt.setAttribute('aria-checked', 'false');
  });
  

  option.classList.add('selected');
  option.setAttribute('aria-checked', 'true');
  selectedOption = option;
  submitButton.disabled = false;
  selectPrompt.classList.add('hidden');
}


function checkAnswer() {
  if (!selectedOption) {
    selectPrompt.classList.remove('hidden');
    return;
  }
  
  const question = currentQuiz.questions[currentQuestionIndex];
  const selectedAnswerIndex = parseInt(selectedOption.id) - 1;
  const correctAnswer = question.answer;
  const selectedAnswerText = question.options[selectedAnswerIndex];
  

  options.forEach(option => {
    option.disabled = true;
  });
  

  submitButton.disabled = true;
  

  if (selectedAnswerText === correctAnswer) {
    selectedOption.classList.add('correct__option');
    score++;
  } else {
    selectedOption.classList.add('wrong__option');
    

    options.forEach((option, index) => {
      if (question.options[index] === correctAnswer) {
        option.classList.add('correct__option');
      }
    });
  }

  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 500);
}

// Reset options for the next question
function resetOptions() {
  options.forEach(option => {
    // Remove all state classes
    option.classList.remove('selected', 'correct__option', 'wrong__option', 'unselected__option');
    
    // Reset element state
    option.disabled = false;
    
    // Clear inline styles that may have been applied
    option.removeAttribute('style');
  });
}

// Show the results screen
function showResults() {
  secondPage.style.display = 'none';
  thirdPage.style.display = 'block';
  
  // Set the score
  finalScore.textContent = score;
  
  // Add result class to show the container
  document.querySelector('.result__container').classList.add('result');
}

// Reset the quiz and go back to subject selection
function resetQuiz() {
  firstPage.style.display = 'flex';
  thirdPage.style.display = 'none';
  
  // Remove result class to hide the container
  document.querySelector('.result__container').classList.remove('result');
  
  // Reset quiz state
  currentQuiz = null;
  currentQuestionIndex = 0;
  score = 0;
  selectedOption = null;
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Tab navigation is handled by the browser
  
  // Arrow keys for option selection in quiz
  if (secondPage.style.display === 'block') {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      focusNextOption();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPreviousOption();
    }
  }
});

// Focus the next option
function focusNextOption() {
  const focusedElement = document.activeElement;
  if (focusedElement && focusedElement.classList.contains('option')) {
    const currentIndex = Array.from(options).indexOf(focusedElement);
    const nextIndex = (currentIndex + 1) % options.length;
    options[nextIndex].focus();
  } else {
    options[0].focus();
  }
}

// Focus the previous option
function focusPreviousOption() {
  const focusedElement = document.activeElement;
  if (focusedElement && focusedElement.classList.contains('option')) {
    const currentIndex = Array.from(options).indexOf(focusedElement);
    const prevIndex = (currentIndex - 1 + options.length) % options.length;
    options[prevIndex].focus();
  } else {
    options[options.length - 1].focus();
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
