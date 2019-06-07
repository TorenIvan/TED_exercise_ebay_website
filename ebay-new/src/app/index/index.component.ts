import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChild(ModalDirective)
  modal: ModalDirective;

  modalBody: string;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {
    
    this.tableService.getAllAuctions().subscribe((data: Product[]) => {
      if(data != null) {
        this.products = data;
        this.dtTrigger.next();
      }
    });

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
        { title: 'End Date' },
        { title: 'Description' },
        { title: 'Country' },
        { title: 'State' },
        { title: 'Town' },
        { title: 'Address' },
        { title: 'Postcode' },
        { title: 'Latitude' },
        { title: 'Longitude' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": 0 },
        { "searchable": false, "visible": false, "targets": 5 },
        { "searchable": false, "visible": false, "targets": 6 },
        { "searchable": false, "visible": false, "targets": 8 },
        { "searchable": false, "visible": false, "targets": 9 },
        { "searchable": false, "visible": false, "targets": 10 },
        { "searchable": false, "visible": false, "targets": 11 },
        { "searchable": false, "visible": false, "targets": 12 },
        { "searchable": false, "visible": false, "targets": 13 },
        { "searchable": false, "visible": false, "targets": 14 },
        { "searchable": false, "visible": false, "targets": 15 },
        { "searchable": false, "visible": false, "targets": 16 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.modalBody = this.format(data.toString());
          this.modal.show();
        });
        return row;
      }
    };

    this.rerender();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  

  ngAfterViewInit() {
    this.dtTrigger.next();
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

  rerender(): void{
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  format(data : string) {
    const p = data.split(',');
    return '<div class="container">'
              + '<div class="row">'
                + '<div class="col"><h1>Product: </h1><p>' + p[2] + '</p></div>'
                + '<div class="col"><h1>Seller: </h1><p>' + p[1] + '</p></div>'
                + '<div class="col"><h1>Description: </h1><p>' + p[9] + '</p></div>'
                + '<div class="col"><h1>Address: </h1><p>' + p[10] + ", " + p[12] + ", " + p[13] + ", " + p[14] + " " + p[11] + '</p></div>'
                + '<div class="col"><h1>Buy Price: </h1><p>' + p[3] + '</p></div>'
                + '<div class="col"><h1>Currently: </h1><p>' + p[4] + '</p></div>'
                + '<div class="col"><h1>Start Date: </h1><p>' + p[7] + '</p></div>'
                + '<div class="col"><h1>End Date: </h1><p>' + p[8] + '</p></div>'
              + '</div>'
            + '</div>';
  }

}
