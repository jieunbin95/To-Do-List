//유저가 할 일을 input창에 입력한다
//저장하기 버튼을 누르면 목록창에 뜨게한다
//유저가 체크버튼을 클릭하면 밑줄이 그어지게된다
//유저가 삭제 버튼을 누르면 목록창에서 없어진다
//목록 버튼을 누를때마다 언더바가 움직인다
//not-done 버튼에는 안 끝난 아이템만, done은 끝난 아이템만
//1.not-done check버튼이 안 눌러져있는것들
//2.done check버튼이 눌려 있는것들

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let mode = "all";

//버튼 클릭시 addTask함수실행
addButton.addEventListener("click", addTask);

//엔터입력시 버튼 누르는 것과 동일하게 적용하는법
taskInput.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    addTask(event);
  }
});

//메뉴바 지정하기(클릭이벤트)
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask() {
  // 버튼의 활성화를 위해 객체를 활용해준다
  let task = {
    //컴퓨터가 항목을 구분할 수 있도록 각각의 리스트마다 id를 지정해준다
    id: randomIDGenerator(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task done-box id="${list[i].id}">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')" class="btn">back</button>
        <button onclick="deleteTask('${list[i].id}')" class="btn">Delete</button>
      </div>
      </div>`;
    } else {
      resultHTML += `<div class="task id="${list[i].id}">
      <div>${list[i].taskContent}</div>
      <div>
       <button onclick="toggleComplete('${list[i].id}')" class="btn">check</button>
       <button onclick="deleteTask('${list[i].id}')" class="btn">Delete</button>
      </div>
    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

// 클릭이벤트대신 태그안에서 onclick를 입력해 사용할 수 있다
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      console.log(taskList)
    }
  }
  filter();
}

function filter(event) {
  if(event){
    mode = event.target.id;
    //언더바 넣어주기
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top =
      event.currentTarget.offsetTop + event.currentTarget.offsetHight + "px";
  }
    
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

//랜덤 id 만들기
function randomIDGenerator() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
