import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoDetailComponent implements OnInit {

  todo: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todosService: TodosService) { }

  ngOnInit() {
    this.getTodoDetail(this.route.snapshot.params['id']);
  }

  private getTodoDetail(id) {
    this.todosService.getTodo(id)
      .subscribe((myTodo) => {
        // console.log('myTodo', myTodo);
        this.todo = myTodo;
      });
  }

  deleteTodo(id) {
    this.todosService.deleteTodo(id)
      .subscribe((res) => {
          this.router.navigate([this.route.snapshot.url[0].path]);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
