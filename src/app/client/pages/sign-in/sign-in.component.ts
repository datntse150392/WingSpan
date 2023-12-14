import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { mergeMap, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigLocal, User } from 'src/app/core/models';
import { AuthService, ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userGG!: SocialUser;
  loggedIn!: boolean;
  signInForm = new FormGroup({
    username: new FormControl(''), // <== default value
    password: new FormControl(''), // <== default value
  });
  user: User = {};
  configLocal: ConfigLocal = {
    userInfo: {},
  };
  helper = new JwtHelperService();

  constructor(
    private router: Router,
    private toastService: ToastService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState
      .pipe(
        mergeMap((user) => {
          this.userGG = user;
          this.loggedIn = user != null;
          if (this.userGG) {
            return this.authService.isCheckAccount(this.userGG.email);
          }
          return of(null);
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.status === 200 && res.message === 'Not Found') {
          this.authService

            .signUp(this.userGG.email, this.userGG.name, this.userGG.photoUrl)
            .subscribe((res: any) => {
              try {
                const token = res && res.access_token.split(' ')[1];
                localStorage.setItem('token', token);
                // Decode the token
                const decoded = this.helper.decodeToken(token);
                this.configLocal.userInfo = decoded;
                localStorage.setItem(
                  'configLocal',
                  JSON.stringify(this.configLocal)
                );
                this.toastService.setToastIsLogin(true);
                this.router.navigate(['/']);
              } catch (error) {
                this.toastService.setToastIsRegister(false);
                localStorage.clear();
              }
            });
        } else {
          this.userGG &&
            this.authService.signIn(this.userGG.email).subscribe((res: any) => {
              try {
                const token = res && res.access_token.split(' ')[1];
                localStorage.setItem('token', token);
                // Decode the token
                const decoded = this.helper.decodeToken(token);
                this.configLocal.userInfo = decoded;
                localStorage.setItem(
                  'configLocal',
                  JSON.stringify(this.configLocal)
                );
                this.toastService.setToastIsLogin(true);
                this.router.navigate(['/']);
              } catch (error) {
                this.toastService.setToastIsLogin(false);
                localStorage.clear();
              }
            });
        }
      });
  }
}
