import { EmailSubscriptionService } from './../../../shared/service/email-subscription.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  localStorageV1 = localStorage;

  constructor(private emailSubscription: EmailSubscriptionService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    this.emailSubscription.postEmailSubscription(this.email.value).then(() => {
      localStorage.setItem('subscribed', 'true');
      this.showSuccess();
    },
      () => {
        this.showError();
      });
  }

  showSuccess() {
    this.toast.success('Hemos recibido su correo, sera avisado de nuevos productos');
  }

  showError() {
    this.toast.error('Algo salio mal, por favor intente de nuevo.');
  }
  
}