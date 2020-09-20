import {EventEmitter, Injectable, Output} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOng } from './ong.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  @Output() emmiters: {
    [eventName: string]: EventEmitter<any>
  } = {}

  constructor(private snackBar: MatSnackBar, private localStorage: LocalStorage) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  get(eventName: string): EventEmitter<any>{
    if(!this.emmiters[eventName]){
      this.emmiters[eventName] = new EventEmitter<any>();
    }
    return this.emmiters[eventName];
  }

  create(ongs: DataOng[]): Observable<boolean> {
    return this.localStorage.setItem('listOng', ongs);
  }

  read(): Observable<any> {
    return this.localStorage.getItem('listOng');
  }
}
