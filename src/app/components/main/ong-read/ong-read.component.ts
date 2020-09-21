import {Component, OnInit} from '@angular/core';
import { OngService } from '../ong.service';
import { DataOng } from '../ong.model';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OngUpdateComponent} from "../ong-update/ong-update.component";
import {OngDeleteComponent} from "../ong-delete/ong-delete.component";

@Component({
  selector: 'app-ong-read',
  templateUrl: './ong-read.component.html',
  styleUrls: ['./ong-read.component.css']
})
export class OngReadComponent implements OnInit {

  ongList: DataOng[]=[];
  displayedColumns = ['id', 'name', 'site', 'slogan', 'action'];

  constructor(private ongService: OngService, public dialog: MatDialog) {
    ongService.get('updateTable').subscribe(ongs => {
      this.ongList = ongs;
    });
  }

  openDialogUpdate(id: number, name: string, site: string, slogan: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      id,
      name,
      site,
      slogan
    }

    this.dialog.open(OngUpdateComponent, dialogConfig);
  }

  openDialogDelete(id: number, name: string, site: string, slogan: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      id,
      name,
      site,
      slogan
    }

    this.dialog.open(OngDeleteComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      if(ongs && ongs.length>0) {
        this.ongList = ongs;
      }
      else {
        this.ongList = [];
      }
    });
  }
}