
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




