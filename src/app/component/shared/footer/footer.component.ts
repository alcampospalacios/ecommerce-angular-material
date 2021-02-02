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
    if (localStorage.getItem('currentUser')) {
      this.emailSubscription.postEmailSubscription(this.email.value).then(() => {        
        this.showSuccess();
      },
        () => {
          this.showError();
        });      
    } else this.showError();
    
  }

  cancelEmailSubscription() {
    if (localStorage.getItem('currentUser')) {
      if (localStorage.getItem('subscription')) {
        this.emailSubscription.deleteSubscription(JSON.parse(localStorage.getItem('subscription')).id).then(() => {        
          this.showSuccessCancelSub();
        },
          () => {
            this.showErrorCancelSub();
          });     
      }       
    } else this.showErrorCancelSub();
    
  }



  showSuccess() {
    this.toast.success('Hemos recibido su correo, sera avisado de nuevos productos');
  }

  showSuccessCancelSub() {
    this.toast.success('Su suscripción ha sido eliminada');
  }

  showErrorCancelSub() {
    this.toast.error('Algo salio mal, asegúrese de estar logueado e intente de nuevo.');
  }

  showError() {
    this.toast.error('Algo salio mal, debe estar logueado para subscribirse por favor intente de nuevo.');
  }
  
}