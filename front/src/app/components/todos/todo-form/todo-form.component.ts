import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoFormComponent implements OnInit {

  todo: any = {};

  constructor(private todosService: TodosService, private router: Router) { }

  ngOnInit() {
  }

  saveTodo() {
    this.todosService.postTodo(this.todo)
      .subscribe((res) => {
          // console.log('res', res)
          this.router.navigate(['todos']);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
