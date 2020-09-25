export default class TaskController {
  constructor(task_datasource){
    this.task_datasource = task_datasource
  }
  get(data) {
    return this.task_datasource.get(data)
  }

  getAll(filter) {
    return this.task_datasource.getAll(filter)
  }

  update(data) {
    return this.task_datasource.update(data)
  }

  create(data) {
    return this.task_datasource.create(data)
  }

  delete(filter){
    return this.task_datasource.delete(filter)
  }

  join(_) {
    throw new Error('needs to implement it');
  }
}