import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FaqService } from '../../services';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faq: any;

  constructor(private faqService: FaqService) { }

  ngOnInit() { 
    this.faqService.getFaq().subscribe(
      faq => {
        this.faq = faq;
      } 
    );
  }

}
