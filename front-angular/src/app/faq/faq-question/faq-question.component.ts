import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.scss']
})
export class FaqQuestionComponent implements OnInit {

  @Input() question: string;
  @Input() answer: string;

  answerLines: string[];

  constructor() { }

  ngOnInit() {
    this.answerLines = this.answer.split('\n');
  }
}
