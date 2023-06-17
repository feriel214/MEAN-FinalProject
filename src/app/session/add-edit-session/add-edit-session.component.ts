import { Component, Inject, OnInit ,Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { EmployeService } from 'src/app/services/employe.service';
import { FormationService } from 'src/app/services/formation.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-add-edit-session',
  templateUrl: './add-edit-session.component.html',
  styleUrls: ['./add-edit-session.component.css']
})
export class AddEditSessionComponent implements OnInit {
  empForm: FormGroup;
  liste_participants: any[] = [];
  liste_formations: any[] = [];
  statut: string[] = [
    'planifiée',
    'en cours',
    'terminée',
    'annulée'
  ];

  constructor(
    private _fb: FormBuilder,
    private _sessionService: SessionService,
    private _empService:EmployeService,
    private _formationServive:FormationService,
    private _dialogRef: MatDialogRef<AddEditSessionComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      id:'',
      formation:'',
      date_deb:'',
      date_fin:'',
      description:'',
      statut:'',   
      liste_participants:''
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.getFormationsList();
    this.getEmployéeList();
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._sessionService
          .updateSession(this.data._id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Session detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          }); 
      } else {
        this._sessionService.addSession(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Session added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


   //get all formations 
   getFormationsList(){
    this._formationServive.getFormationList().subscribe((res)=>{
       console.log("list formations ",res)
       res.forEach((el :{ _id: any; titre: string;})=>{
       this.liste_formations.push({'id':el._id,'titre':el.titre})
       })
    },err=>{
      console.log(err);
      
    })
  }

  //get all employees 
  getEmployéeList(){
    this._empService.getEmployeeList().subscribe((res)=>{
      console.log("list employees ",res)
      res.forEach((element: { _id: any; firstName: string;lastName: string; }) => {
        this. liste_participants.push({'id':element._id,'fullname':element.firstName+' '+element.lastName});
      });
    },err=>{
      console.log(err);
      
    })
  }
}
