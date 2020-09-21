import {Component, Inject, OnInit} from '@angular/core';
import {OngService} from "../ong.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataOng} from "../ong.model";

@Component({
  selector: 'app-ong-update',
  templateUrl: './ong-update.component.html',
  styleUrls: ['./ong-update.component.css']
})
export class OngUpdateComponent implements OnInit {

  currentOng: DataOng = {
    id: null,
    name: '',
    site: '',
    slogan: ''
  };

  listOng: DataOng[]=[];

  constructor(
    private ongService: OngService,
    private dialogRef: MatDialogRef<OngUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.currentOng = data;
  }

  updateOng(): void {
    this.ongService.read().subscribe((ongs: DataOng[])=> {
      if(ongs){
        this.listOng = ongs;
      }
      else {
        this.listOng=[];
      }
      this.listOng[this.currentOng.id-1] = this.currentOng
      this.ongService.create(this.listOng).subscribe(()=> {
        this.ongService.showMessage('ONG atualizada com sucesso');
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
