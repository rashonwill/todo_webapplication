let pendingTodos = [];
let completedTodos = [];
let expiredTodos = [];

let allTodos = [
  {
    id: 1,
    title: "Lazy Mr. Simpson",
    dueDate: "2099-03-28",
    dueTime: "3:00:00 PM",
    Description: "Homers nap time, forever",
    isComplete: false
  },

  {
    id: 2,
    title: "Mr. Simpson",
    dueDate: "2021-05-25",
    dueTime: "2:30:00 PM",
    Description: "Walk Santas Little Helper.",
    isComplete: false
  },

  {
    id: 3,
    title: "Mr. Simpson",
    dueDate: "2021-05-23",
    dueTime: "15:00:00 PM",
    Description: "Donut Run.",
    isComplete: true
  },

  {
    id: 4,
    title: "Mr. Simpson",
    dueDate: "2021-05-23",
    dueTime: "15:00:00 PM",
    Description: "Beer Run. ",
    isComplete: true
  },

  {
    id: 5,
    title: "Mr. Simpson",
    dueDate: "2021-02-14",
    dueTime: "10:00:00 AM",
    Description: "Get Marge Flowers and make brunch :)",
    isComplete: false
  }
];

function _getTodos() {
  let existingTodos = JSON.parse(localStorage.getItem("allTodos"));
  if (existingTodos && existingTodos !== null) {
    allTodos = existingTodos;
    splitTodos().then(renderTodos);
  } else if (!existingTodos) {
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    splitTodos().then(renderTodos);
  }
}


function isCurrent(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const todoDueTime = new Date(todo.dueTime);
  const now = new Date();
  return now < todoDueDate;
}

async function splitTodos() {
  pendingTodos = allTodos.filter(function (todo) {
    return !todo.isComplete && isCurrent(todo);
  });


  completedTodos = allTodos.filter(function (todo) {
    return todo.isComplete;
  });


  expiredTodos = allTodos.filter(function (todo) {
    return !todo.isComplete && !isCurrent(todo);
  });

}

async function renderTodos() {
  $(".content").empty();

  pendingTodos.forEach(function (todo) {
    let todoTask = $(`
    <div class="todo">
    
    <div class="todo-options">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="options">
    <li id="complete"><i class="fa-solid fa-circle-check"></i>Complete</li>
    <li id="trash"><i class="fa-solid fa-circle-xmark"></i>Trash</li>
    </ul>
    </div>


    <div class="top">
    <p>${todo.title} <br> ${todo.dueDate} ${todo.dueTime} </p>
    </div>
    
    <div class="note">
    <p> ${todo.Description}</p>
    </div>
    
    
    </div>  
    
     `).data("todo", todo);
    $(".Pending .content").append(todoTask);

    $(todoTask).on("click", "#complete", function(){
      let task = $(this).closest(".todo").data("todo");
      let taskID = task.id;
      let getTodos = JSON.parse(localStorage.getItem("allTodos"));

      let newData = [];
      let doneTodo = getTodos.filter(function (todos) {
        return todos.id === taskID;
      });
      doneTodo[0].isComplete = true;
      newData = getTodos;
      localStorage.setItem("allTodos", JSON.stringify(newData));
      _getTodos();
    });

    $(todoTask).on("click", "#trash", function(){
      let task = $(this).closest(".todo").data("todo");
      let taskID = task.id;
      let getTodos = JSON.parse(localStorage.getItem("allTodos"));
      let newData = [];
      let removingTodo = getTodos.findIndex((todos) => todos.id === taskID);
      getTodos.splice(removingTodo, 1);
      newData = getTodos;
      localStorage.setItem("allTodos", JSON.stringify(newData));
      _getTodos();
    });
    
     $(todoTask).on("click", ".fa-ellipsis", function(){
       $(this).parent().find(".options").toggleClass("active");
    });
  });

  completedTodos.forEach(function (todo) {
    let todoTask = $(`
    <div class="todo">

    <div class="todo-options">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="options">
    <li id="trash"><i class="fa-solid fa-circle-xmark"></i>Trash</li>
    </ul>
    </div>
    
    <div class="top">
    <p>${todo.title} <br> ${todo.dueDate} ${todo.dueTime} </p>
    </div>
    
    <div class="note">
    <p> ${todo.Description}</p>
    </div>
    
    
    </div>  
    
     `).data("todo", todo);
    $(".Completed .content").append(todoTask);
    $(".Completed .todo .top").css("background", "#00FA9A");
    $(".Completed .todo .note").css("background", "#00FA9A");
    $(".Completed .todo .todo-options").css("background", "#00FA9A");
    $(".Completed .action.complete").remove();
    

    $(todoTask).on("click", "#trash", function() {
      let task = $(this).closest(".todo").data("todo");
      let taskID = task.id;
      let getTodos = JSON.parse(localStorage.getItem("allTodos"));
      let newData = [];
      let removingTodo = getTodos.findIndex((todos) => todos.id === taskID);
      getTodos.splice(removingTodo, 1);
      newData = getTodos;
      localStorage.setItem("allTodos", JSON.stringify(newData));
      _getTodos();
    });
    
      $(todoTask).on("click", ".fa-ellipsis", function(){
       $(this).parent().find(".options").toggleClass("active");
    });
  });

  expiredTodos.forEach(function (todo, index) {
    let todoTask = $(`
    <div class="todo">

    <div class="todo-options">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="options">
    <li id="complete"><i class="fa-solid fa-circle-check"></i>Complete</li>
    <li id="trash"><i class="fa-solid fa-circle-xmark"></i>Trash</li>
    </ul>
     </div>

    <div class="top">
    <p>${todo.title} <br> ${todo.dueDate} ${todo.dueTime} </p>
    </div>
    
    <div class="note">
    <p> ${todo.Description}</p>
    </div>
    
    
    </div>  
    
     `).data("todo", todo);
    $(".Expired .content").append(todoTask);
    $(".Expired .todo .top").css("background", "#ff86a4");
    $(".Expired .todo .note").css("background", "#ff86a4");
    $(".Expired .todo .todo-options").css("background", "#ff86a4");
    
        $(todoTask).on("click", "#complete", function(){
      let task = $(this).closest(".todo").data("todo");
      let taskID = task.id;
      let getTodos = JSON.parse(localStorage.getItem("allTodos"));
      let newData = [];
      let doneTodo = getTodos.filter(function (todos) {
        return todos.id === taskID;
      });
      doneTodo[0].isComplete = true;
      newData = getTodos;
      localStorage.setItem("allTodos", JSON.stringify(newData));
      _getTodos();
    });

    $(todoTask).on("click", "#trash", function() {
      let task = $(this).closest(".todo").data("todo");
      let taskID = task.id;
      let getTodos = JSON.parse(localStorage.getItem("allTodos"));
      let newData = [];
      let removingTodo = getTodos.findIndex((todos) => todos.id === taskID);
      getTodos.splice(removingTodo, 1);
      newData = getTodos;
      localStorage.setItem("allTodos", JSON.stringify(newData));
      _getTodos();
    });
    
        $(todoTask).on("click", ".fa-ellipsis", function(){
       $(this).parent().find(".options").toggleClass("active");
    });
  });
}

function openForm() {
  $(".todo-form").addClass("active");
}

function closeForm() {
  $(".todo-form").removeClass("active");
}

$(".create-todo").click(function () {
  event.preventDefault();
    let newTask = {
    id: Math.floor(Math.random() * 500) + 1,
    title: $("#todo-title").val(),
    dueDate: $("#todo-due-date").val(),
    dueTime: $("#todo-due-time").val(),
    Description: $("#todo-description").val(),
    isComplete: false
  };

  allTodos.unshift(newTask);
  localStorage.setItem('allTodos', JSON.stringify(allTodos))
  $(".todo-form").trigger("reset");

  $(".todo-form").removeClass("active");

  _getTodos();
});

function removeAllCompleted() {
  $(".Completed .content").empty();
}

function removeExpired() {
  $(".Expired .content").empty();
}

_getTodos();
