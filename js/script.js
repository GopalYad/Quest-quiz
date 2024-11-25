import { switchMode } from "./switchtogglebtn.js";
const toggleSwitch = document.querySelector('.light-dark-switch input[type ="checkbox"]')
toggleSwitch.addEventListener('change', switchMode, false);