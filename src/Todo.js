export default class TodoItem {
  static latestId = 0; // Initialize a static counter

  constructor(title, description, dueDate, priority) {
    this.id = ++TodoItem.latestId;
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