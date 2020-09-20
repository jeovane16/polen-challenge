import {Component, OnInit} from '@angular/core';
import { OngService } from '../ong.service';
import { DataOng } from '../ong.model';

@Component({
  selector: 'app-ong-read',
  templateUrl: './ong-read.component.html',
  styleUrls: ['./ong-read.component.css']
})
export class OngReadComponent implements OnInit {

  ongList: DataOng[]=[];
  displayedColumns = ['name', 'site', 'slogan', 'action'];

  constructor(private ongService: OngService) {
    ongService.get('updateTable').subscribe(ongs => this.ongList = ongs);
  }

  ngOnInit(): void {
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      if(ongs) {
        this.ongList = ongs;
      }
      else {
        this.ongList = [];
      }
    });
  }
}