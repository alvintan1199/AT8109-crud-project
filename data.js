// at the top of `data.js`
const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "652e334254105e766fc35326";
const MASTER_KEY = "$2a$10$5qTjb288y2dU1ESj0eE5tuhs0b04btQXFg8TyZt/ogyBZHv0Dq1IO";

let todos = [];

function addTodo(todos, name, urgency) {
  let newTodo = {
    id: Math.floor(Math.random() * 100 + 1),
    name: name,
    urgency: urgency
  };
  todos.push(newTodo);
}

function modifyTask(todos, id,  newName, newUrgency) {
    // create the new task
    let modifiedTask = {
        "id": id,
        "name": newName,
        "urgency": newUrgency
    }

    // get the index of the task we want to replace
    const indexToReplace = todos.findIndex(function(t){
        return t.id == id;
    });

    // need to check if the index really exists
    // if the id doesn't exist, then findIndex will return -1
    if (indexToReplace > -1) {
        todos[indexToReplace] = modifiedTask;
    }
  
}

function deleteTask(todos, id) {
  let indexToDelete = null;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    todos.splice(indexToDelete, 1);
  } else {
    console.log("Task is not found");
  }
}

  async function saveTasks(todos) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, todos, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;

}
  async function loadTasks() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  return response.data.record;
}