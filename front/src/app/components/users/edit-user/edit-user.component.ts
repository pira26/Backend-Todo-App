import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  private getUser(id) {
    this.authService.get_user(id)
      .subscribe((user) => {
        this.user = user;
      });
  }

  updateUser(id, user) {
    // console.log('user', user);
    this.authService.edit_user(id, user)
      .subscribe((res) => {
        // console.log('res', res);
          this.router.navigate([this.route.snapshot.url[0].path, id]);
        }, (err) => {
          console.error('err', err);
        }
      );
  }

}
