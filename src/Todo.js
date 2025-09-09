export default class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
  
  // getItem() {
  //   return {
  //       title: this.title, 
  //       description: this.description, 
  //       dueDate:this.dueDate, 
  //       priority: this.priority 
  //   }
  // }

}