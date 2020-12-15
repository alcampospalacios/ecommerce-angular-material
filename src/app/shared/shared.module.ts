import { NgModule } from '@angular/core';
import { PaginatePipe } from './pipes/paginate.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../component/lazy_loading/store/paginator-es';

@NgModule({
  imports: [
    MatPaginatorModule
  ],
  declarations: [ 
    PaginatePipe
  ],
  exports: [
    PaginatePipe,
    MatPaginatorModule
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class SharedModule {}