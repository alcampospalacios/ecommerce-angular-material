import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
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



  ngOnInit(): void {
  }

}
