 //Update the below URL with the appropriate version if necessary.
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 import {
     getAuth,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged,
     signOut
 //Update the below URL with the appropriate version if necessary.
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


 // INSERT YOUR FIREBASE CONFIG OBJECT HERE
 const firebaseConfig = {
apiKey: "AIzaSyA-p82sI3KCH8PUvWP-tl8ChXc4QUubKnU",
authDomain: "codecrafters-pomodoro.firebaseapp.com",
databaseURL: "https://codecrafters-pomodoro-default-rtdb.firebaseio.com",
projectId: "codecrafters-pomodoro",
storageBucket: "codecrafters-pomodoro.appspot.com",
messagingSenderId: "803490510130",
appId: "1:803490510130:web:80098ae0c3cf770e80932b",
measurementId: "G-WXFYRDNDN7"
};

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const userEmail = document.querySelector("#userEmail");
 const userPassword = document.querySelector("#userPassword");
 const authForm = document.querySelector("#authForm");
 const secretContent = document.querySelector("#secretContent");
 const signUpButton = document.querySelector("#signUpButton");
 const signInButton = document.querySelector("#signInButton");
 const signOutButton = document.querySelector("#signOutButton");
 const taskList = document.querySelector("#taskList");
 const calendarButton = document.querySelector("#calendarButton");

 secretContent.style.display = 'none';

 const userSignUp = async() => {
     const signUpEmail = userEmail.value;
     const signUpPassword = userPassword.value;
     createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
     .then((userCredential) => {
         const user = userCredential.user;
         console.log(user);
         alert("Your account has been created!");
         showTaskListAndCalendar();
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode + errorMessage)
     })
 }

 const userSignIn = async() => {
     const signInEmail = userEmail.value;
     const signInPassword = userPassword.value;
     signInWithEmailAndPassword(auth, signInEmail, signInPassword)
     .then((userCredential) => {
         const user = userCredential.user;
         alert("You have signed in successfully!");
         showTaskListAndCalendar();
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode + errorMessage)
     })
 }

 const checkAuthState = async() => {
     onAuthStateChanged(auth, user => {
         if(user) {
             authForm.style.display = 'none';
             secretContent.style.display = 'block';
             showTaskListAndCalendar();
         }
         else {
             authForm.style.display = 'block';
             secretContent.style.display = 'none';
             hideTaskListAndCalendar();
         }
     })
 }

 const userSignOut = async() => {
     await signOut(auth);
     hideTaskListAndCalendar();
 }

 const showTaskListAndCalendar = () => {
     taskList.style.display = 'block';
     calendarButton.style.display = 'block';
 }

 const hideTaskListAndCalendar = () => {
     taskList.style.display = 'none';
     calendarButton.style.display = 'none';
 }

 checkAuthState();

 signUpButton.addEventListener('click', userSignUp);
 signInButton.addEventListener('click', userSignIn);
 signOutButton.addEventListener('click', userSignOut);

 // Pomodoro Timer
 let timer;
 let isRunning = false;
 let minutes = 25;
 let seconds = 0;

 const minutesElement = document.querySelector("#minutes");
 const secondsElement = document.querySelector("#seconds");
 const startButton = document.querySelector("#startButton");
 const resetButton = document.querySelector("#resetButton");

 startButton.addEventListener('click', () => {
     if (!isRunning) {
         isRunning = true;
         timer = setInterval(() => {
             if (seconds == 0) {
                 if (minutes == 0) {
                     clearInterval(timer);
                     alert("Time's up!");
                 } else {
                     minutes--;
                     seconds = 59;
                 }
             } else {
                 seconds--;
             }
             minutesElement.textContent = String(minutes).padStart(2, '0');
             secondsElement.textContent = String(seconds).padStart(2, '0');
         }, 1000);
     }
 });

 resetButton.addEventListener('click', () => {
     clearInterval(timer);
     isRunning = false;
     minutes = 25;
     seconds = 0;
     minutesElement.textContent = String(minutes).padStart(2, '0');
     secondsElement.textContent = String(seconds).padStart(2, '0');
 });

 // Task List
 const newTaskInput = document.querySelector("#newTask");
 const addTaskButton = document.querySelector("#addTaskButton");
 const tasksElement = document.querySelector("#tasks");

 addTaskButton.addEventListener('click', () => {
     const newTask = newTaskInput.value;
     if (newTask) {
         const listItem = document.createElement("li");
         const checkbox = document.createElement("input");
         checkbox.type = "checkbox";
         listItem.appendChild(checkbox);
         const taskText = document.createElement("span");
         taskText.textContent = newTask;
         listItem.appendChild(taskText);
         tasksElement.appendChild(listItem);
         newTaskInput.value = '';
     }
 });

 // Calendar
 const calendarContainer = document.querySelector("#calendarContainer");

 calendarButton.addEventListener('click', () => {
     if (calendarContainer.style.display === "none") {
         calendarContainer.style.display = "block";
     } else {
         calendarContainer.style.display = "none";
     }
 });

 // Background Color
const bgColorInput = document.querySelector('#bgColor');

// Set the background color from local storage when the page loads
document.body.style.backgroundColor = localStorage.getItem('bgColor') || '#ffffff';
bgColorInput.value = localStorage.getItem('bgColor') || '#ffffff';

bgColorInput.addEventListener('change', function() {
    // Update the background color and save it in local storage
    document.body.style.backgroundColor = this.value;
    localStorage.setItem('bgColor', this.value);
});

const animalSelect = document.querySelector('#animalSelect');
const animalImageContainer = document.querySelector('#animalImageContainer');

animalSelect.addEventListener('change', function() {
    // Clear any existing image
    animalImageContainer.innerHTML = '';

    // If an animal is selected, display its image
    if (this.value) {
        const img = document.createElement('img');
        img.src = `${this.value}.png`;  // The images are in the same directory as your HTML and JavaScript files
        animalImageContainer.appendChild(img);

        // Save the selected animal in local storage
        localStorage.setItem('selectedAnimal', this.value);
    } else {
        // If no animal is selected, remove the saved value from local storage
        localStorage.removeItem('selectedAnimal');
    }
});

// Load the selected animal from local storage when the page loads
const selectedAnimal = localStorage.getItem('selectedAnimal');
if (selectedAnimal) {
    animalSelect.value = selectedAnimal;

    // Display the image of the selected animal
    const img = document.createElement('img');
    img.src = `${selectedAnimal}.png`;  // The images are in the same directory as your HTML and JavaScript files
    animalImageContainer.appendChild(img);
}