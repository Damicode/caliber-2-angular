import { Component, OnInit, ViewChild } from '@angular/core';
import { LastQualityAuditTableComponent } from '../last-quality-audit-table/last-quality-audit-table.component';

@Component({
  selector: 'app-last-quality-audit',
  templateUrl: './last-quality-audit.component.html',
  styleUrls: ['./last-quality-audit.component.css']
})
export class LastQualityAuditComponent implements OnInit {
  stateCity: String[];
  @ViewChild(LastQualityAuditTableComponent) lastQATable: LastQualityAuditTableComponent;
  constructor() { }

  ngOnInit() {
  }

}
