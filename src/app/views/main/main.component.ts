import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {OngCreateComponent} from "../../components/main/ong-create/ong-create.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      id: 1,
      title: "teste"
    }

    this.dialog.open(OngCreateComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}
