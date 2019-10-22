import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user: firebase.User;
 public loading: boolean;


  constructor(private service: AuthService, public afAuth: AngularFireAuth, private router: Router,
  private authService: AuthService) {
   this.loading = false;
   }
public email: string = '';
public password: string = '';

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
   }

loginG() {
  console.log('Login...');
  this.service.login();
}

logout() {
  this.service.logout();
}

emailSignUp() {
  console.log('Login...');
  this.service.verifyEmail();
}
onlogininGoogle(): void {
  this.authService.loginGoogleUser().then((res) => {
    console.log('resUser', res);
    this.router.navigate(['dashboard']);
  }).catch(err => console.log('err', err));
}
Onlogin(): void {
  console.log('email', this.email);
  console.log('password', this.password);
   this.loading = true;
this.authService.loginEmailUser(this.email, this.password).then((res) => {
 this.router.navigate(['dashboard']);
// tslint:disable-next-line: comment-format
//}).catch(err=> console.log('err',err.message));
}).catch (err => {
  this.loading = false;
  alert('Correo o contraseña invalida');
});
}
}
