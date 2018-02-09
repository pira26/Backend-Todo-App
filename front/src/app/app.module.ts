import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import routes from './todos.routes';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoEditFormComponent } from './todos/todo-edit-form/todo-edit-form.component';
import { TodosService } from './services/todos.service';

const routes: Routes = [
  {
      path: 'todos',
      component: TodoListComponent
  },
  {
    path: 'todos/:id',
    component: TodoDetailComponent
  },
  {
    path: 'add',
    component: TodoFormComponent
  },
  {
    path: 'todos/edit/:id',
    component: TodoEditFormComponent
  },
];

@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes, { enableTracing: true })  // <-- debugging purposes only
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoFormComponent,
    TodoEditFormComponent,
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
