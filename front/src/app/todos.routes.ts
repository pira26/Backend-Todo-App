import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoEditFormComponent } from './todo-edit-form/todo-edit-form.component';

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
        path: 'todos/:id/edit',
        component: TodoEditFormComponent
    },
];

export default routes;