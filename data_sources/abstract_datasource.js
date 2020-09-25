export default class AbstractDataSource {
  get({id, filter}) {
    throw new Error('needs to implement it');
  }
  getAll(filter) {
    throw new Error('needs to implement it');
  }
  update(data) {
    throw new Error('needs to implement it');
  }
  create(data) {
    throw new Error('needs to implement it');
  }
  delete({id, filter}){
    throw new Error('needs to implement it');
  }
  join(collection_to_join) {
    throw new Error('needs to implement it');
  }
}