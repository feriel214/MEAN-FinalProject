import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { EmployeService } from 'src/app/services/employe.service';
import { AddEditFormationComponent } from './add-edit-formation/add-edit-formation.component';
import { FormationService } from '../services/formation.service';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'titre',
    'descreption',
    'duree',
    'lieu',
    'capacite',
    'cout',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _formaService: FormationService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getFormationList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditFormationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFormationList();
        }
      },
    });
  }

  getFormationList() {
    this._formaService.getFormationList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFormation(id: number) {
    this._formaService.deleteFormation(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Formation deleted!', 'done');
        this.getFormationList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditFormationComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFormationList();
        }
      },
    });
  }
}
