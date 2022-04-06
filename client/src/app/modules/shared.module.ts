import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BsDropdownModule.forRoot()
  ],
  exports: [
    NgxBootstrapIconsModule,
    BsDropdownModule,
  ]
})
export class SharedModule { }
