import {Component} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toast', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('150ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class ToastComponent {
  public showingToast = false
  public message?: string

  public async showMessage(message: string) {
    this.showingToast = true
    this.message = message ?? "Um erro não especificado ocorreu"
    await new Promise(resolve => setTimeout(resolve, 4350));
    this.showingToast = false
    this.message = undefined
  }
}
