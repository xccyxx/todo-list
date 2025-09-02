export default class ProjectItem {
  static latestId = 0; // Initialize a static counter

  constructor(name, todosArr = []) {
    this.id = ++ProjectItem.latestId;
    this.name = name;
    this.todosArr = todosArr || [];
  }
}