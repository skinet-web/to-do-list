import './style.css'
import {insertProject, TodoList } from './component/projectCreate.js'
import insertTask from './component/task';


const taskList = document.querySelector('#taskList');
const createTask = document.querySelector('#createTask');
const formInput = document.querySelector('#formInput');
const titleInput = document.querySelector('#titleInput');
const descriptionInput = document.querySelector('#descriptionInput');
const dueDate = document.querySelector('#dueDate');
const buttonInput = document.querySelector('#buttonInput');

const modal = document.querySelector('#modal');
const modalTask = document.querySelector('#modalTask');
const createProject = document.querySelector('#createProject');
const buttonInputProject = document.querySelector('#buttonInputProject');
const titleInputProject = document.querySelector('#titleInputProject');
const projectList = document.getElementById('projectList');
const closeModalTask = document.getElementById('closeModalTask');
const closeModalProject = document.getElementById('closeModalProject');


const todoList = new TodoList(); //initiating the list

//Adding the default project 
const defaultProject = new insertProject('Default') 
todoList.addProject(defaultProject);
projectList.append(defaultProject.name);


//////Event listeners for the buttons


//Add Task Button

createTask.addEventListener('click', function(){
  toggleModalTask()  
})


buttonInput.addEventListener('click', function(e){
  e.preventDefault(); 
  clearTasks()
 
  const selectedIndex = projectList.selectedIndex; // getting the index from the projectList and storing it 
  const selectedProject = todoList.projects[selectedIndex]; // using the index to pinpoint the projects in the projects array
  selectedProject.addTodo(new insertTask(titleInput.value, descriptionInput.value, dueDate.value));
  selectedProject.todos.forEach(function(todo) {
    const todoElement = document.createElement('p');
    // todoElement.classList.add('.task');
    todoElement.textContent = `
                              Title: ${todo.title} - 
                              Description: ${todo.description} - 
                              Date: ${todo.dueDate}`;
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteButton')
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function() {
      todoElement.remove(); // remove the task element from the DOM
      selectedProject.removeTodo(); // remove the task from the selectedProject.todos array
    });
    todoElement.appendChild(deleteButton);
    taskList.appendChild(todoElement);
    
  });
  
  console.dir(todoList)
  toggleModalTask()
  resetTaskInput()
  
})

//Add Project button

createProject.addEventListener("click", function(e){
  e.preventDefault();
  toggleModalProject();
})
//The submit putton from the project module
buttonInputProject.addEventListener('click', function(e){
  e.preventDefault();  
  
  changeValueIfZero()
  
 
  console.dir(todoList)
})

projectList.addEventListener('change', function(){
  const selectedIndex = projectList.selectedIndex;
  const selectedProject = todoList.projects[selectedIndex];

  //remove the previous task when select change
  const taskList = document.getElementById('taskList');
  taskList.textContent = '';
  
  for(let task of selectedProject.todos) {
     // Create a element for the title and insert the title data
    const allElements = document.createElement('p')
    allElements.textContent = `Title: ${task.title} - Description: ${task.description} - Date: ${task.dueDate}`;
    //Add the delete button and the X 

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteButton')
    deleteButton.textContent = 'X';
    allElements.appendChild(deleteButton);
    deleteButton.addEventListener('click', function() {
    allElements.remove(); // remove the task element from the DOM
    selectedProject.removeTodo(); // remove the task from the selectedProject.todos array

    });
    //Append the title, description and dueDate elements to the task container
   
    taskList.appendChild(allElements);
}});

closeModalTask.addEventListener('click', function(e) {
  e.preventDefault;
  toggleModalTask()
})

closeModalProject.addEventListener('click', function(e) {
  e.preventDefault;
  toggleModalProject()
})

function clearTasks() {
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = '';
}

function updateTodo() {
  projectList.textContent = ''
  todoList.projects.forEach(function(project) {
    const projectElement = document.createElement('option');
    projectElement.textContent = project.name;
    projectList.appendChild(projectElement);
  });
  }
 
  
function toggleModalProject() {
  if (modal.style.display === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
  }

  function toggleModalTask() {
    if (modalTask.style.display === "none") {
      modalTask.style.display = "block";
    } else {
      modalTask.style.display = "none";
    }
  }  

  function resetTaskInput(){
    titleInput.value = '';
    descriptionInput.value = '';
    dueDate.value = '';
  }

  function changeValueIfZero(){
    const projectName = new insertProject(titleInputProject.value);
    if(titleInputProject.value.length > 0){ //check if the title input is 0
      todoList.addProject(projectName);
      toggleModalProject();
      updateTodo();
      titleInputProject.value = '';
    } else {
      titleInputProject.placeholder = "It cannot be empty"; //changes the placeholder if string = 0
    }
  }

 //localStorage


 