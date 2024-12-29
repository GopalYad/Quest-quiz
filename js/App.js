
const actionToggle = document.getElementById('toggle');
actionToggle.addEventListener('click', (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})