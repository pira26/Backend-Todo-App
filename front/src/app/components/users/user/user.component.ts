import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.authService.get_user(id)
      .subscribe((user) => {
        return this.user = user;
      });
  }

  deleteUser(id) {
    this.authService.delete_user(id)
      .subscribe((res) => {
          this.router.navigate(['users']);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
