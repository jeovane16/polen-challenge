import {Component, Inject, OnInit} from '@angular/core';
import {OngService} from "../ong.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataOng} from "../ong.model";

@Component({
  selector: 'app-ong-delete',
  templateUrl: './ong-delete.component.html',
  styleUrls: ['./ong-delete.component.css']
})
export class OngDeleteComponent implements OnInit {

  currentOng: DataOng = {
    id: null,
    name: '',
    site: '',
    slogan: ''
  };

  listOng: DataOng[]=[];

  constructor(
    private ongService: OngService,
    private dialogRef: MatDialogRef<OngDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.currentOng = data;
  }

  deleteOng(): void {
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      if(ongs){
        this.listOng = ongs;
      }
      else {
        this.listOng=[];
      }
      let currentPosition = -1;
      this.listOng.forEach((ong, index) => {
        if(ong.id === this.currentOng.id){
          currentPosition = index;
        }
      });
      this.listOng.splice(currentPosition , 1);
      this.ongService.create(this.listOng).subscribe(()=> {
        this.ongService.showMessage('ONG deletada com sucesso');
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
