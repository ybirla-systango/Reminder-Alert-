var reminderList=document.getElementById("reminder-list");
var reminderInput=document.getElementById("reminder-input");
var reminderInterval=document.getElementById("reminder-interval");
var reminderForm=document.getElementById("reminder-form"); 
var mArr = [];

reminderForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

// local storage render
var reminderFromLocalStorage=localStorage.getItem("reminder-list");
if(reminderFromLocalStorage) {
    var items = JSON.parse(reminderFromLocalStorage);
    for( var i=0;i<items.length;i++){
        renderCardReminder(items[i].text,items[i].timeout);
    }
}

// Function for card render
function renderCardReminder(text, timeout) {
    var card=document.createElement("div");
    
    card.className="reminder-card";
    var metaDiv=document.createElement("div")
    var heading=document.createElement("h3");
    heading.innerHTML=text;
    heading.id=Math.floor(Math.random() * 100);
    var para=document.createElement("p");
    var currentDate=new Date();
    
    para.innerHTML=currentDate.toLocaleString()
    metaDiv.appendChild(heading);
    metaDiv.appendChild(para);

    card.appendChild(metaDiv);

    var deleteIcon=document.createElement("i");
    deleteIcon.className="fas fa-trash";

    var interval = setInterval(() => {
        alert(`${heading.innerHTML} ${new Date().toLocaleString()}`);
    }, timeout * 60000);

    card.appendChild(deleteIcon);
    reminderList.appendChild(card);

    deleteIcon.addEventListener("click",function(){
        console.log(interval);
        clearInterval(interval);
        card.remove();
        mArr = mArr.filter((el) => el.text !== text);
        if (mArr.length === 0) {
            localStorage.removeItem("reminder-list");
        } else {
            localStorage.setItem("reminder-list", JSON.stringify(mArr));
        }
    })

    var updateIcon=document.createElement("i");
    updateIcon.className="fas fa-edit";
    card.appendChild(updateIcon);
    // update logic write here 
    updateIcon.addEventListener("click",function(){
        var updateMsg= window.prompt("Update Message");
        var updateTimeInterval=window.prompt("Update Time Interval")
        text=updateMsg;
        timeout=updateTimeInterval;
        if (text&&timeout) {
            updateCardReminder(text,timeout)
        }
    })
    function updateCardReminder(text,timeout){
        mArr.forEach((el) => {
            if (el.text === heading.innerHTML) {
                el.text = text;
            }
        });
        localStorage.setItem("reminder-list", JSON.stringify(mArr));
        heading.innerHTML=text;
        clearInterval(interval)
        interval = setInterval(() => {
            alert(`${text} ${new Date().toLocaleString()}`);
        }, timeout * 60000);
    }
    // Add data in local storage   
    mArr.push({
        text,
        timeout
    })
    localStorage.setItem("reminder-list",JSON.stringify(mArr));
}

// Button for add card Items
var addReminderBtn=document.getElementById("reminder-btn");
addReminderBtn.addEventListener("click",function(){
    if(reminderInput.value===""){
        alert("Enter Reminder Item!!");
        return;   
    }
    renderCardReminder(reminderInput.value, reminderInterval.value);
    reminderInput.value = "";
})