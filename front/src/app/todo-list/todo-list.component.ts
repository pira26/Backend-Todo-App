import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000')
      .subscribe((myTodoList) => {
        // console.log('myTodoList', myTodoList);
        this.todoList = myTodoList;
      });
  }

}
