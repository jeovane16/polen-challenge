import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataOng } from '../ong.model';
import {OngService} from "../ong.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ong-create',
  templateUrl: './ong-create.component.html',
  styleUrls: ['./ong-create.component.css']
})
export class OngCreateComponent implements OnInit {

  form: FormGroup;
  description:string;

  currentOng: DataOng = {
    name: '',
    site: '',
    slogan: ''
  };

  constructor(
    private ongService: OngService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OngCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description
  }

  createOng(): void{
    this.ongService.create(this.currentOng).subscribe(()=> {
      this.ongService.showMessage('ONG criada com sucesso');
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
