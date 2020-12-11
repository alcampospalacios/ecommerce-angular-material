import { AuthenticationNodeService } from './../../../shared/service/authentication-node.service';
import { User } from './../../../shared/model/user';
import { AfterViewInit, Component, HostListener, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

import { ToastService } from 'ng-uikit-pro-standard';

import { Store, Select } from '@ngxs/store';
import { ProductsState } from './../../../shared/statate-management/product.state';
import { Products } from '../../../shared/model/products';
import { Observable, Subscription } from 'rxjs';
import { RemoveProduct } from './../../../shared/statate-management/product.actions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit, OnDestroy {

  @Select(ProductsState.getProducts) products$: Observable<Products[]>
  totalprice: number;
  subscription: Subscription;

  user: User;
  opacity = 1;
  localStorageV1 = localStorage;



  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone,
    private auth: AuthenticationNodeService,
    private store: Store
  ) {

    this.subscription = this.products$.subscribe(result => {
      this.totalprice = 0;
      result.forEach(t => {
        this.totalprice += (t.price * ((t.orders || 0) + 1));
      });
    });

    iconRegistry.addSvgIcon(
      'custom_shopping_cart',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/bottomToolbar/shopping_cart-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_user',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/bottomToolbar/perm_identity-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_search',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/bottomToolbar/search-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_settings',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/bottomToolbar/settings-white-18dp.svg'));

    iconRegistry.addSvgIcon(
      'custom_favorite',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/bottomToolbar/favorite_border-white-18dp.svg'));



  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // this.scrollDispatcher.scrolled().subscribe((event: CdkScrollable) => {
    //   const scroll = event.measureScrollOffset("top");
    //   let newOpacity = this.opacity;
    //   if (scroll > 0) {
    //     newOpacity = 0.75;
    //   } else {
    //     newOpacity = 1;
    //   }

    //   if (newOpacity !== this.opacity) {
    //     this.zone.run(() => {
    //       this.opacity = newOpacity;
    //     });
    //   }
    // });
  }


  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLogin, {
      width: '60vh',
      data: { name: '', lastname: '', email: '', phone: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
    });
  }



  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(DialogSignup, {
      width: '60vh',
      data: { name: '', lastname: '', email: '', phone: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
    });
  }

  signOut() {
    this.auth.logout();
  }

  removeProduct(idProducts: number) {
    this.store.dispatch(new RemoveProduct(idProducts))
  }

}


@Component({
  selector: 'dialog-login',
  templateUrl: './dialog-login.html'
})
export class DialogLogin {
  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  itemForm: FormGroup;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<DialogLogin>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private toast: ToastService,
    private auth: AuthenticationNodeService) {
    this.itemForm = this.createFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();
    this.user = {
      id: 0,
      email: this.itemForm.get('email').value,
      password: this.itemForm.get('password').value
    }

    this.auth.signin(this.user).then(() => {
      this.showSuccess();
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

  get email() { return this.itemForm.get('email'); }
  get password() { return this.itemForm.get('password'); }

}


@Component({
  selector: 'dialog-signup',
  templateUrl: './dialog-signup.html'
})
export class DialogSignup {

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  itemForm: FormGroup;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<DialogSignup>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private auth: AuthenticationNodeService,
    private toast: ToastService) {
    this.itemForm = this.createFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onResetForm() {
    this.itemForm.reset();
  }

  onSubmit() {
    this.dialogRef.close();
    this.user = {
      id: 0,
      name: this.itemForm.get('name').value,
      lastname: this.itemForm.get('lastname').value,
      email: this.itemForm.get('email').value,
      movilPhone: this.itemForm.get('phone').value,
      password: this.itemForm.get('password').value
    }

    this.auth.signup(this.user).then(() => {
      this.showSuccess();
    },
      () => {
        this.showError();
      });
  }




  showSuccess() {
    this.toast.success('Su usuario ha sido creado exitosamente.');
  }

  showError() {
    this.toast.error('Algo salio mal, por favor intente de nuevo.');
  }

  get name() { return this.itemForm.get('name'); }
  get lastname() { return this.itemForm.get('lastname'); }
  get email() { return this.itemForm.get('email'); }
  get phone() { return this.itemForm.get('phone'); }
  get password() { return this.itemForm.get('password'); }

}
