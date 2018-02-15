import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoEditFormComponent implements OnInit {

  todo: any = {};

  constructor(
    private todosService: TodosService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTodo(this.route.snapshot.params['id']);
  }

  getTodo(id) {
    this.todosService.getTodo(id)
      .subscribe((myTodo) => {
        this.todo = myTodo;
      });
  }

  updateTodo(id, newTodo) {
    // console.log('newTodo', newTodo);
    this.todosService.putTodo(id, newTodo)
      .subscribe((res) => {
        // console.log('res', res);
          this.router.navigate([this.route.snapshot.url[0].path, id]);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
