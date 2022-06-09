// Grabbing elements from DOM
const list = document.querySelector("#todo-list");
const userInput = document.querySelector("#todo-item");
const addButton = document.querySelector("#add-button");
const blankError = document.querySelector("#error");

// Test Data
const todolist = [
  {
    text: "wash the car",
    isDone: false,
  },
  {
    text: "walk the dog",
    isDone: true,
  },
];

// function: updateUI()
function updateUI() {
  // create temp var (garbage collector)
  let result = "";

  //   make modification to result based on the array
  todolist.forEach((item, i) => {
    // console.log("****************");
    // console.log(item);
    result += `
    <tr>
        <th class='${item.isDone === true ? "done" : ""}'>${item.text}</th>
        <th>${item.isDone === true ? "Done" : "Pending"} </th>
        <th>
            <button class="btn btn-outline-success btn-sm" onclick=taskDone(${i})>
                <i class="fa fa-check" aria-hidden="true"></i>
            </button>
        </th>
        <th>
            <button class="btn btn-outline-danger btn-sm" onclick=deleteTask(${i})>X</button>
        </th>
    </tr>
    `;
  });

  //   clear input
  userInput.value = "";

  //   show the result on the DOM
  list.innerHTML = result;

  // in case of empty array
  if (todolist.length === 0)
    return (list.innerHTML = "<h3>There is no item in the list!</h3>");
}

updateUI();

// function: addToDo() : checks input value & add it to array
function addToDo(e) {
  e.preventDefault();
  let userInputVal = userInput.value;

  //   input validation
  if (!userInputVal)
    return (
      (blankError.innerHTML = "Please Enter Your To Do Task!"),
      setTimeout(() => blankError.remove(), 3000)
    );

  // put user input value in new object
  const task = {
    text: userInputVal,
    isDone: false,
  };

  //   append object to array
  todolist.push(task);

  updateUI();
}

// function: taskDone()
function taskDone(i) {
  todolist[i].isDone = !todolist[i].isDone;
  updateUI();
}

// function: deleteTask()
function deleteTask(i) {
  todolist.splice(i, 1);
  updateUI();
}

// button event
addButton.onclick = addToDo;

// add on enter key event
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addToDo;
});
