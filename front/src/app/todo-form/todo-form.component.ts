import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoFormComponent implements OnInit {

  todo: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveTodo() {
    this.http.post('http://localhost:3000', this.todo)
      .subscribe((res) => {
          // console.log('res', res);
          const id = res['_id'];
          this.router.navigate(['http://localhost:4200/todos', id]);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
