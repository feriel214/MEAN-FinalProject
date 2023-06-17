import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { AddEditSessionComponent } from './add-edit-session/add-edit-session.component';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent  implements OnInit {
  displayedColumns: string[] = [
    'id',
    'formation',
    'date_deb',
    'date_fin',
    'liste_participants',
    'statut',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _sessionService: SessionService,
    private _coreService: CoreService,

  ) {}

  ngOnInit(): void {
    this.getSessionList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditSessionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSessionList();
        }
      },
    });
  }

  getSessionList() {
    this._sessionService.getSessionList().subscribe({
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

  deleteSession(id: number) {
    this._sessionService.deleteSession(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Session deleted!', 'done');
        this.getSessionList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditSessionComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSessionList();
        }
      },
    });
  }


 
}
