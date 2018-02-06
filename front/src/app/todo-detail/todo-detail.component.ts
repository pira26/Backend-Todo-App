import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoDetailComponent implements OnInit {

  todo = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    this.getTodoDetail(this.route.snapshot.params['id']);
  }

  private getTodoDetail(id) {
    this.http.get(`http://localhost:3000/todos/${id}`)
      .subscribe((myTodo) => {
        // console.log('myTodo', myTodo);
        this.todo = myTodo;
      });
  }

  deleteTodo(id) {
    this.http.delete(`http://localhost:3000/todos/${id}`)
      .subscribe((res) => {
          this.router.navigate(['http://localhost:4200/todos']);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
