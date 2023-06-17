import { Component, Inject, OnInit ,Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormationService } from 'src/app/services/formation.service';



@Component({
  selector: 'app-add-edit-formation',
  templateUrl: './add-edit-formation.component.html',
  styleUrls: ['./add-edit-formation.component.css']
})
export class AddEditFormationComponent implements OnInit {
  empForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _formaService: FormationService,
    private _dialogRef: MatDialogRef<AddEditFormationComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      titre: '',
      descreption: '',
      duree: '',
      lieu: '',
      capacite: '',
      cout: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._formaService
          .updateFormation(this.data._id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Formation detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          }); 
      } else {
        this._formaService.addFormation(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Formation added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
