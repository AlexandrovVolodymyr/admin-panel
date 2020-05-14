import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public messageError: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.isLogin) {
        this.messageError = 'Надо ввести Email и Password';
      } else if (params.authFailed) {
        this.messageError = 'Сессия истекла. Введите данные заново';
      }

      setTimeout(() => this.messageError = '', 5000);
    });
  }

  submit(form) {
    this.authService.login(form.value)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

}
