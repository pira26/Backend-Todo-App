import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoFormComponent implements OnInit {

  todo: any = {};

  constructor(
    private todosService: TodosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  saveTodo() {
    this.todosService.postTodo(this.todo)
      .subscribe((res) => {
          // console.log('res', res);
          const id = res['_id'];
          this.router.navigate([this.route.snapshot.url[0].path, id]);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
