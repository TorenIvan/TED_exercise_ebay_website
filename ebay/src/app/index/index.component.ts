import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[ 1, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": 0 },
        { "searchable": false, "visible": false, "targets": 1 },
        { "searchable": false, "visible": false, "targets": 5 },
        { "searchable": false, "visible": false, "targets": 6 },
        { "searchable": false, "visible": false, "targets": 8 }
      ]
    };
      
    this.tableService.getAllAuctions().subscribe((data: Product[]) => {
      if(data != null) {
        this.products = data;
        this.dtTrigger.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
