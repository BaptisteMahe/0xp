import { Component, OnInit } from '@angular/core';
import { OfferCompanyComponent } from '../../profile/application/offer-company/offer-company.component';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss']
})
export class ProfileAdminComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  onTabChanged(event, ...tabs: OfferCompanyComponent[]) {
    tabs[event.index - 1]?.getOfferList();
  }
}
