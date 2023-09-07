const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const $$$ = document.getElementById.bind(document)

//setup firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZ279d9RTdWpwBp-AOYNHOQn6hacgiq1Y",
    authDomain: "doan2-5f89d.firebaseapp.com",
    databaseURL: "https://doan2-5f89d-default-rtdb.firebaseio.com",
    projectId: "doan2-5f89d",
    storageBucket: "doan2-5f89d.appspot.com",
    messagingSenderId: "207409186470",
    appId: "1:207409186470:web:577d65162b6f8035015667",
    measurementId: "G-92X157TELM"
  };
firebase.initializeApp(firebaseConfig);
var database = firebase.database()  

// **********************************************************************************************************
// Menu/ sidebar
const sidebarMode = $$('.aside-heading');
const btn_sidebar = $$$('btn-sidebar');

btn_sidebar.onclick = function(){
    if (btn_sidebar.innerHTML === "close") {
        btn_sidebar.innerHTML = "menu"
        sidebarMode.forEach(heading => heading.classList.toggle('hidden'));

    } else {
        btn_sidebar.innerHTML = "close"
        sidebarMode.forEach(heading => heading.classList.remove('hidden'));
    }
}

// Dark mode
const darkMode = document.querySelector('.dark-mode');

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

// logout
var logout = $$$("btn-logout");

logout.onclick = function(){
    window.location.href = "login.html";
}

// next page
const btnpage1 = $$$("btnpage1");
const btnpage2 = $$$("btnpage2");
const btnpage3 = $$$("btnpage3");
const btnpage4 = $$$("btnpage4");
const btnpage5 = $$$("btnpage5");
const btnpage6 = $$$("btnpage6");

const page1 = $$$("page1");
const page2 = $$$("page2");
const page3 = $$$("page3");

function run_page(Id) {
    const btnpages = $$('[id^="btnpage"]');
    btnpages.forEach(btnpage => {
        if (btnpage.id === `btnpage${Id}`) {
            btnpage.classList.add('active');
        } else {
            btnpage.classList.remove('active');
        }
    });

    const pages = $$('[id^="page"]');
    pages.forEach(page => {
        if (page.id === `page${Id}`) {
            page.style.display = "block";
        } else {
            page.style.display = "none";
        }
    });
}

run_page('1');

btnpage1.addEventListener("click", function() {run_page('1');});
btnpage2.addEventListener("click", function() {run_page('2');});
btnpage3.addEventListener("click", function() {run_page('3');});
btnpage4.addEventListener("click", function() {run_page('4');});
btnpage5.addEventListener("click", function() {run_page('5');});
btnpage6.addEventListener("click", function() {run_page('6');});



// ***********************************************************************************************************
// create notification
const input_mp1 = $$$('input-mp1')
const input_mp2 = $$$('input-mp2')
const input_mt1 = $$$('input-mt1')
const input_mt2 = $$$('input-mt2')
const modePlay = $$$('modePlay')
const modeTime = $$$('modeTime')

modePlay.addEventListener("change", function() {
    const modePlay_Value = modePlay.value;
    console.log("Mode: " + modePlay_Value);

    if (modePlay_Value === "modePlay1"){
        input_mp1.style.display = "block"
        input_mp2.style.display = "none"
    }else{
        input_mp1.style.display = "none"
        input_mp2.style.display = "block"
    }
});


modeTime.addEventListener("change", function() {
    const modeTime_Value = modeTime.value;
    console.log("Mode: " + modeTime_Value);

    if (modeTime_Value === "modeTime1"){
        input_mt1.style.display = "flex"
        input_mt2.style.display = "none"   
    }else{
        input_mt1.style.display = "none"
        input_mt2.style.display = "flex"  
    }
});

// 
const t2 = $$$('t2')
const t3 = $$$('t3')
const t4 = $$$('t4')
const t5 = $$$('t5')
const t6 = $$$('t6')
const t7 = $$$('t7')
const t8 = $$$('t8')

function select_t(Id) {
    const ts = $$('[id^="t"]');
    ts.forEach(t => {
        if (t.id === `t${Id}`) {
            t.classList.toggle('active');
        }
    });
}

t2.addEventListener("click", function() {select_t('2');});
t3.addEventListener("click", function() {select_t('3');});
t4.addEventListener("click", function() {select_t('4');});
t5.addEventListener("click", function() {select_t('5');});
t6.addEventListener("click", function() {select_t('6');});
t7.addEventListener("click", function() {select_t('7');});
t8.addEventListener("click", function() {select_t('8');});

// Slide Container *************************************************************************
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
// Hiển thị giá trị thanh trượt mặc định
output.innerHTML = slider.value;
// Cập nhật giá trị thanh trượt hiện tại
slider.addEventListener("input", function() {
    output.innerHTML = this.value;
});

// Calendar ************************************************************************************
const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // update days html
  let days = "";

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  // next MOnth days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  hideTodayBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
  // increase by one
  currentMonth--;
  // check if let than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});

// lets hide today btn if its already current month and vice versa

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

//*******************************************************************************************************  

const createName = $$$('create-name')
const createColor = $$$('create-color')

const taskList = []
const taskListElement = $('.task-list')

const App = {
    handleTime() {
        _this = this;
        const clockDiv = $('.clock')
        const dateDiv = $('.date')
        function time() {
            let d = new Date()
            let h = d.getHours()
            let m = d.getMinutes()
            let s = d.getSeconds()
            let day = d.getDay()
            let date = d.getDate()
            let month = d.getMonth() + 1
            let year = d.getFullYear()

            // handle date
            const dayObj = {
                0:  'Sunday',
                1:  'Monday',
                2:  'Tuesday',
                3:  'Wednesday',
                4:  'Thursday',
                5:  'Friday',
                6:  'Saturday',
            }
            dateDiv.innerHTML = `${days[day]}, ${date}.${month}.${year}`
            
            // handle clock
            let hh = (h<10) ? `0${h}` : `${h}`
            let mm = (m<10) ? `0${m}` : `${m}`
            let ss = (s<10) ? `0${s}` : `${s}`
            clockDiv.textContent = `${hh}:${mm}:${ss}`

            _this.firebase_realTime(year*100000000+month*1000000+date*10000+h*100+m)

            // handle task time
            const comingTaskList = taskList.filter((task) => {
                const taskTime = task.time.year*10000000000+task.time.month*100000000+task.time.day*1000000+task.time.hour*10000+task.time.minute*100
                const realTime = year*10000000000+month*100000000+date*1000000+h*10000+m*100+s
                
                // update task to firebase 
                if ((taskTime-realTime) === 0) {
                    console.log(task);
                    _this.firebase_todo(task.modePlay.slice(-1), task.desc, task.time.hour, task.time.minute)
                }

                return (taskTime-realTime<100 && 0<taskTime-realTime)
            })
            if (comingTaskList.length > 0) {
                const taskUpcoming = comingTaskList[0]
                // $('.upcoming-priority').style.display = 'block'
                // $('.upcoming-priority').textContent = taskUpcoming.priority
                $('.upcoming-name').textContent = taskUpcoming.name
                $('.upcoming-time').textContent = `${taskUpcoming.time.hour}:${taskUpcoming.time.minute} | ${taskUpcoming.time.day}/${taskUpcoming.time.month}/${taskUpcoming.time.year}`
                // if (taskUpcoming.priority === 'normal')
                //     $('.upcoming-priority').classList.remove('important')
                // else
                //     $('.upcoming-priority').classList.add('important')
            }else {
                console.log('no task coming');
                // $('.upcoming-priority').style.display = 'none'
                $('.upcoming-name').textContent = 'Nothing to do . . .'
                $('.upcoming-time').textContent = ``
            } 
        }

        setInterval(time, 1000);
    },

    firebase_realTime(realTime){
        database.ref("/Real_time").update({
            "time": realTime,
        })
    },

    firebase_todo(modeplay, desc, hour, minute) { 
        database.ref("/Todo_List").update({
            "mode": modeplay,
            "Desc": desc,
            "play": 1,
            "time": String(hour)+":"+String(minute)
        })
    },
    sortTaskList(list) {
        list.sort((a, b) => {
            const dateA = new Date(a.time.year, a.time.month, a.time.day, a.time.hour, a.time.minute);
            const dateB = new Date(b.time.year, b.time.month, b.time.day, b.time.hour, b.time.minute);

            if (dateA > dateB) {
                return 1; 
            } else if (dateA < dateB) {
                return -1; 
            } else {
                return 0;
            }
        });
        console.log('sorting list');
    },
    renderTasks(taskList) {        
        taskListElement.innerHTML =  ''
        this.sortTaskList(taskList)
        taskList.forEach((task, index) => {
            const taskElement = document.createElement('li')
            taskElement.className = `task ${task.isDone ? 'done' : ''} ${task.isOvertime ? 'overtime' : ''}`
            taskElement.setAttribute('data-index', index)
            taskElement.innerHTML = 
            `
            <div class="task-infor">
                <div class="task-specific">
                    <h3 class="task-time">
                        ${task.time.hour}:${task.time.minute} | ${task.time.day}/${task.time.month}/${task.time.year}
                    </h3>
                </div>
                <h3 class="task-name">${task.name}</h3>
            </div>
            <div class="task-actions_wrapper">
                <span class="task-actions_overlay"></span>
                <ul class="task-actions_list">
                    <li class="task-action check"><i class='bx bx-check'></i></li>
                    <li class="task-action delete"><i class='bx bxs-trash-alt'></i></li>
                </ul>
                <div class="task-actions_btn">
                    <i class='bx bx-menu'></i>                            
                </div>
                <div class="task-actions_btn task-check_icon">
                    <i class='bx bx-check'></i>                            
                </div>
            </div>
            `

            taskElement.style.animationDelay = `${index * 0.2}s`
            taskListElement.appendChild(taskElement)
        })
        console.log('render ', taskList);
    },
    resetNoti(){
        createName.value = ""
        createColor.value = "#000000"
        modePlay.value ="modePlay1"
        input_mp1.value = ""
        input_mp2.value = ""
        modeTime.value = "modeTime2"
        input_mt1.value = ""
        input_mt2.value = ""

        input_mp1.style.display = "block"
        input_mp2.style.display = "none"

        input_mt1.style.display = "none"
        input_mt2.style.display = "block"

        console.log('resetNoti');
    },

    addTask() {
        const newTask = {time: {}}

        newTask.name = createName.value
        newTask.color = createColor.value
        newTask.modePlay = modePlay.value
        newTask.modeTime = modeTime.value

        if(newTask.modeTime === "modeTime2"){
            newTask.time = new Date(input_mt2.value);
            newTask.time.year = newTask.time.getFullYear();
            newTask.time.month = newTask.time.getMonth() + 1; 
            newTask.time.day = newTask.time.getDate();
            newTask.time.hour = newTask.time.getHours();
            newTask.time.minute = newTask.time.getMinutes(); 
        }
        if(newTask.modePlay === "modePlay1"){
            newTask.desc = input_mp1.value
        }else{
            newTask.desc = input_mp2.value
        }
        

        newTask.isDone = false
        newTask.isOvertime = false

        taskList.push(newTask)

        console.log(newTask);
    },


    handleActions(action, taskElement) {
        switch (action) {
            case 'check': {
                taskList[taskElement.dataset.index].done = !taskList[taskElement.dataset.index].done
                taskElement.classList.toggle('done')
                console.log('check action ', taskElement);
                break;
            }
            case 'delete': {
                taskList.splice(taskElement.dataset.index, 1)
                this.renderTasks(taskList)
                console.log('delete action ', taskElement);
                break;
            }
        }

        console.log('after action: ', taskList);
    },
    handleEvents() {
        const _this = this

        // add Task
        const addBtn = $$$('finish')
        const resetBtn = $$$('reset')

        resetBtn.onclick = () => {
            _this.resetNoti()
        }
        addBtn.onclick = () => {
            _this.addTask()
            _this.renderTasks(taskList)
            _this.resetNoti()
        }

        // task actions
        taskListElement.onclick = (e) => {
            const taskElement = e.target.closest('.task')
            if (e.target.closest('.task-action.check')) {
                _this.handleActions('check', taskElement)
            }

            if (e.target.closest('.task-action.adjust')) {
                _this.handleActions('adjust', taskElement)
            }

            if (e.target.closest('.task-action.delete')) {
                _this.handleActions('delete', taskElement)
            }
        } 
    },

    start() {   

        // 
        this.handleTime()
        this.renderTasks(taskList)
        this.handleEvents()
        this.resetNoti()
    },

}

App.start()
// ***********************************************************************************************************


