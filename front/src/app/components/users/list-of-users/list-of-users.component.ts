import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit {

  userList: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.get_users()
      .subscribe((users) => {
        console.log(users);
        
        return this.userList = users;
      });
  }

}
