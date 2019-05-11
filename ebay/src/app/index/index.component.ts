import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      columns: [
        { title: 'id' },
        { title: 'Seller' },
        { title: 'Product' },
        { title: 'Buy Price' },
        { title: 'Currently' },
        { title: 'First Bid' },
        { title: 'Number of Bids' },
        { title: 'Start Date' },
        { title: 'End Date' }
      ],
      order: [[ 2, "asc" ]],
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

  ngAfterViewInit(): void {
    this.dtTrigger.pipe();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
