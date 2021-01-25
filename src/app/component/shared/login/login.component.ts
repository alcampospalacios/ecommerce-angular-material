import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthenticationNodeService } from 'src/app/shared/service/authentication-node.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  itemForm: FormGroup;

  constructor(
    private toast: ToastService,
    private auth: AuthenticationNodeService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.itemForm = this.createFormGroup();
  }

  onSubmit() {
    this.auth.login(this.itemForm.get('username').value, this.itemForm.get('password').value).then(() => {
      this.showSuccess();
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/']);
    },
      () => {
        this.showError();
      });
  }

  showSuccess() {
    this.toast.success('Ha entrado en el sistema exitosamente.');
  }

  showError() {
    this.toast.error('Algo salio mal, por favor verifique su usuario y contraseña.');
  }

  get username() { return this.itemForm.get('username'); }
  get password() { return this.itemForm.get('password'); }

  ngOnInit(): void {
  }

}
