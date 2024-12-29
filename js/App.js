
const actionToggle = document.getElementById('toggle');
actionToggle.addEventListener('click', (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})
const response = await fetch('./data.json');
const data = await response.json();


console.log(data);
data.quizzes.forEach((item) => {
    console.log(item.title); 
});


data.quizzes.forEach((item)=>{
    console.log(item.icon)
})

data.quizzes.forEach((item)=>{
    item.questions.forEach((item)=>{
      console.log(item.options)
    })
})

const btns = document.querySelectorAll('.js-btn-features button');

btns.forEach((button)=>{
    button.addEventListener('click',()=>{
        const feature = button.dataset.feature;
        // console.log(`Button clicked: ${feature}`);
        showClick(feature);
    })
})
 

function showClick(feature){
    let matchItem;
   
    data.quizzes.forEach((item)=>{
       if(feature === item.title){
        console.log(item)
        getQuiz(item)
        
       }
    })
   
}

function getQuiz(element){
   console.log(element.title)
   console.log(element.icon)
   element.questions.forEach((questions)=>{
    console.log(questions.answer)
   })
}







