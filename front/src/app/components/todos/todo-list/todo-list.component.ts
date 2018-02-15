import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: any = [];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos()
      .subscribe((myTodoList) => {
        // console.log('myTodoList', myTodoList);
        this.todoList = myTodoList;
      }, (err) => {
        console.error('err', err);
      }
    );
  }

}
