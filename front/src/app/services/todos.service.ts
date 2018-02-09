import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(`http://localhost:3000`);
  }

  postTodo(todo) {
    return this.http.post('http://localhost:3000', todo);
  }

  getTodo(id) {
    return this.http.get(`http://localhost:3000/todos/${id}`);
  }

  putTodo(id, newTodo) {
    return this.http.put(`http://localhost:3000/todos/${id}`, newTodo);
  }

  deleteTodo(id) {
    return this.http.delete(`http://localhost:3000/todos/${id}`);
  }

}
