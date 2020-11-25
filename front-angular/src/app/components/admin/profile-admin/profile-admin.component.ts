import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCompanyComponent } from '../../entreprises/add-company/add-company.component';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() { }

  onOpenModalClick() {
    this.matDialog.open(AddCompanyComponent);
  }
}
