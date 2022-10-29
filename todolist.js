let addTasks = document.getElementById("add")
taskForToday();
addTasks.addEventListener("click", function (e) {
    let addTime = document.getElementById("time");
    let addTask = document.getElementById("task");
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
    }
    let myObj = {
        time: addTime.value,
        task: addTask.value
    }

    tasksObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(tasksObj));

    taskForToday();
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert" role="alert" id="Success">
                                 Success: Your Task Has Been Allotted for ${addTime.value}
                         </div> `
    addTime.value = "";
    addTask.value = "";
    setTimeout(() => {
        message.innerHTML = ``;

    }, 3000);

})
function taskForToday() {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
    }
    let displayTask = document.getElementById("table");
    let html = ` <thead>
                 
                  <th> Time </th>
                  <th style="width:15%"> Task </th>
                  <th>Delete</th>
                  <th>Edit</th>
                  <th>Done </th>  
                 </thead>`
    tasksObj.forEach(function (element, index) {
        html += `<tr>
                        
                         <td class="incompleted">${element.time}</td>
                         <td class="incompleted">${element.task} </td>
                         <td> <button id="${index}" class="deleteBtn" onclick="deleteBtn(this.id)">Delete</button> </td>
                         <td> <button id="${index}" class="deleteBtn" onclick="editBtn(this.id)">Edit</button> </td>
                         <td><input type="checkbox" value= "${element.value}" oninput="done(this.parentNode.parentNode)"></td>
                    </tr>`
    })
    displayTask.innerHTML = html;

}
function done(index) {
    let taskComplete = index.getElementsByTagName("td")[0];
    let times = index.getElementsByTagName("td")[1];
    taskComplete.classList.toggle("completed");
    times.classList.toggle("completed");
}
function deleteBtn(index) {
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
    }
    tasksObj.splice(index, 1);
    tasks = localStorage.setItem("tasks", JSON.stringify(tasksObj));

    taskForToday();
}
function editBtn(index) {
    let addTime = document.getElementById("time");
    let addTask = document.getElementById("task");

    addTask.value = tasksObj[index]["task"];
    addTime.value = tasksObj[index]["time"];
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        tasksObj = [];
    } else {
        tasksObj = JSON.parse(tasks);
    }
    tasksObj.splice(index, 1);
    tasks = localStorage.setItem("tasks", JSON.stringify(tasksObj));
    taskForToday();
}
function clock() {
    let date = new Date();
    let clock = document.getElementById("clock");
    clock.innerHTML = date.toLocaleString('en-GB');;
}
setInterval(clock, 1000);


