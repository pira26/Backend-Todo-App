import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

export const routes: Routes = [
    {
        path: 'todos',
        component: TodoListComponent
    },
    {
        path: 'todos/:id',
        component: TodoDetailComponent
    },
    {
        path: 'todos/create',
        component: TodoFormComponent
      },
];