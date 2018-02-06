import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoEditFormComponent implements OnInit {

  todo = {};

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTodo(this.route.snapshot.params['id']);
  }

  getTodo(id) {
    this.http.get(`http://localhost:3000/todos/${id}`)
    .subscribe((myTodo) => {
      this.todo = myTodo;
    });
  }

  updateTodo(id, newTodo) {
    this.http.put(`http://localhost:3000/todos/${id}`, newTodo)
      .subscribe((res) => {
          const id = res['_id'];
          this.router.navigate(['http://localhost:4200/todos', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
