import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataOng } from '../ong.model';
import { OngService } from "../ong.service";

@Component({
  selector: 'app-ong-create',
  templateUrl: './ong-create.component.html',
  styleUrls: ['./ong-create.component.css']
})
export class OngCreateComponent implements OnInit {

  currentOng: DataOng = {
    id: null,
    name: '',
    site: '',
    slogan: ''
  };

  listOng: DataOng[]=[];

  constructor(
    private ongService: OngService,
    private dialogRef: MatDialogRef<OngCreateComponent>,
  ) { }

  createOng(): void{
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      if(ongs){
        this.listOng = ongs;
      }
      else {
        this.listOng=[];
      }
      const ongTemp = this.listOng.reduce( (ong1, ong2) => {
        if(ong1.id >= ong2.id){
          return ong1;
        }
        return ong2
      });
      this.currentOng.id = ongTemp.id+1;

      this.listOng.push(this.currentOng);
      this.ongService.create(this.listOng).subscribe(()=> {
        this.ongService.showMessage('ONG criada com sucesso');
        this.ongService.get('updateTable').emit(this.listOng);
        this.dialogRef.close();
      });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
