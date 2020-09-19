import { Component, OnInit } from '@angular/core';
import { OngService } from '../ong.service';
import { DataOng } from '../ong.model';

@Component({
  selector: 'app-ong-read',
  templateUrl: './ong-read.component.html',
  styleUrls: ['./ong-read.component.css']
})
export class OngReadComponent implements OnInit {

  ongList: DataOng[];

  constructor(private ongService: OngService) { }

  ngOnInit(): void {
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      this.ongList = ongs;
    });
  }

}
