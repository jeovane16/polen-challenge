import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOng } from './ong.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  constructor(private snackBar: MatSnackBar, private localStorage: LocalStorage) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  create(ong: DataOng): Observable<boolean> {
    return this.localStorage.setItem(ong.name, ong.name);
  }
}
