import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { Cat } from '../category';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0}),
          stagger(100, [
            animate('0.5s', style({opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChild(ModalDirective)
  modal: ModalDirective;

  modalBody: string;

  categoryList: Cat[];

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  lat: number;
  lon: number;
  zoom: number = 15;

  loading: boolean;

  items = [];

  constructor(private tableService: TableServiceService) {}

  apiCall(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.tableService.getAllAuctions().toPromise().then(
        (res: Product[]) => {
          this.products = res;
          resolve();
        }
      );
    });
  }

  ngOnInit() {
    this.loading = true;
    
    this.apiCall().then( (data: Product[]) => {
      this.loading = false;
      this.products.forEach((product, idx) => {
        setTimeout(() => {
          this.items.push(product);
        }, 500 * (idx + 1));
      });
    });

    this.dtOptions = {
      retrieve: true,
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
        { title: 'Longitude' },
        { title: 'Category' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "targets": [ 0 ], "visible": false, "searchable": false },
        { "targets": [ 5 ], "visible": false, "searchable": false },
        { "targets": [ 6 ], "visible": false, "searchable": false },
        { "targets": [ 8 ], "visible": false, "searchable": false },
        { "targets": [ 9 ], "visible": false, "searchable": true },
        { "targets": [ 10 ], "visible": false, "searchable": true },
        { "targets": [ 11 ], "visible": false, "searchable": true },
        { "targets": [ 12 ], "visible": false, "searchable": true },
        { "targets": [ 13 ], "visible": false, "searchable": false },
        { "targets": [ 14 ], "visible": false, "searchable": false },
        { "targets": [ 15 ], "visible": false, "searchable": false },
        { "targets": [ 16 ], "visible": false, "searchable": false }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.modalBody = this.format(data);
          this.modal.show();
        });
        return row;
      }
    };

    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  
  ngAfterContentInit() {
    this.dtTrigger.next();
    this.rerender();
    // console.log("boo");
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      console.log(dtInstance.columns());
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
    this.rerender();
  }

  rerender(): void{
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  format(data : any) {
    const p = data;
    this.lat = parseFloat(p[15]);
    this.lon = parseFloat(p[16]);
    return '<div class="container">'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Product: </strong></h4><p>' + p[2] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Seller: </strong></h4><p>' + p[1] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Description: </strong></h4><p>' + p[9] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Address: </strong></h4><p>' + p[10] + ", " + p[12] + ", " + p[13] + ", " + p[14] + " " + p[11] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Category: </strong></h4><p>' + p[17] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Buy Price: </strong></h4><p>' + p[3] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Currently: </strong></h4><p>' + p[4] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Start Date: </strong></h4><p>' + p[7] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>End Date: </strong></h4><p>' + p[8] + '</p></div></div><br>'
            + '</div>';
  }

}
