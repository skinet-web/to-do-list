class insertProject {
    constructor(name){
      this.name = name;
      this.todos = [];
    }
  
    addTodo(todo) {
      this.todos.push(todo)
    }
  
    removeTodo(todo){
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
  }

  
class TodoList  {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    this.projects.splice(this.projects.indexOf(project), 1);
  }
}


export  {insertProject, TodoList};