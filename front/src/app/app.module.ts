import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodoListComponent } from './components/todos/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todos/todo-detail/todo-detail.component';
import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { TodoEditFormComponent } from './components/todos/todo-edit-form/todo-edit-form.component';
import { TodosService } from './services/todos.service';
import { SignInComponent } from './components/users/auth/sign-in/sign-in.component';
import { LoginComponent } from './components/users/auth/login/login.component';
import { AuthService } from './services/auth.service';
import { ListOfUsersComponent } from './components/users/list-of-users/list-of-users.component';
import { UserComponent } from './components/users/user/user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

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
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: ListOfUsersComponent
  },
  {
    path: 'users/:id',
    component: UserComponent
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent
  },
];

@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes, { enableTracing: true })  // <-- debugging purposes only
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoFormComponent,
    TodoEditFormComponent,
    LoginComponent,
    SignInComponent,
    ListOfUsersComponent,
    UserComponent,
    EditUserComponent,
  ],
  providers: [TodosService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
