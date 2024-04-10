const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Function that loads the calendar
const loadCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayofNextMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--){
        liTag += `<li class="inactive" onclick=>${lastDateofLastMonth - i + 1}</li>`;
    }
    
    for (let i = 1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth() 
                    && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = firstDayofNextMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - firstDayofNextMonth + 1}`;
        
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}
loadCalendar();

//Function that lets the user scroll through the calendar
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        if (currentMonth < 0 || currentMonth > 11){
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date();
        }

        loadCalendar();
    });
});

//Function that the user creates tasks to complete, assigning them to a date
function addTask() {
    var taskInput = document.getElementById("input-field");
    var taskText = taskInput.value.trim();
    var dateInput = document.getElementById("dateandYear");
    var dateText = dateInput.value.trim();

    if (taskText !== "") {
        var li = document.createElement("li");
        li.innerHTML = dateText + ": " + taskText + '<button class="deleteButton" onclick="deleteTask(this)">Delete</button>'  + '<button class="completeButton" onclick="completeTask(this)">Complete</button>';

        document.getElementById("tasksList").appendChild(li);

        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

//Function that creates notifications
    let notifBox = document.getElementById('notifBar');
    let deletedMsg = '<i class="fa-solid fa-trash"></i> The task has been deleted.';
    let completedMsg = '<i class="fa-solid fa-face-smile"></i> The task has been completed.';
        
    function shownotif(msg){
        let notif = document.createElement('div');
        notif.classList.add('notif');
        notif.innerHTML = msg;
        notifBox.appendChild(notif);
            
        if(msg.includes('deleted')){
            notif.classList.add('deleted');
        }

        if(msg.includes('completed')){
            notif.classList.add('completed');
        }

        setTimeout(()=>{
            notif.remove();
        }, 6000);
    }
        
//Function that deletes a user's task
function deleteTask(task) {
    var li = task.parentNode;
    li.parentNode.removeChild(li);
    shownotif(deletedMsg);
}

//Function that shows a user completed a task
function completeTask(task) {
    var li = task.parentNode;
    li.parentNode.removeChild(li);
    shownotif(completedMsg);
}
