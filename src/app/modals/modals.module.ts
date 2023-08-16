import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from "./toast/toast.component";
import {AmountSelectionComponent} from './amount-selection/amount-selection.component';


@NgModule({
  declarations: [
    ToastComponent,
    AmountSelectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
    AmountSelectionComponent
  ]
})
export class ModalsModule { }
