import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { saveAs } from 'file-saver';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import { readFileSync } from 'fs';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.scss'],
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
export class IndexAdminComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, null)
  datatableElement: DataTableDirective;

  @ViewChild(ModalDirective, null)
  modal: ModalDirective;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  loading: boolean;

  lat: number;
  lon: number;
  zoom: number = 15;

  items = [];

  data: any = [];

  dataAddress: string = "";

  images = ['../../assets/DivaExpressLogo2.png', '../../assets/b.png', '../../assets/correct.png'];

  constructor(private tableService: TableServiceService) { }

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
      dom: 'Blfrtip',
      buttons: [
        {
          text: 'JSON',
          key: '1',
          action: function ( e, dt, button, config ) {
            var data = dt.buttons.exportData();

            var p = {};

            for(let i = 0; i<data['body'].length; i++) {
              p[i] = {};
              for(let j = 0, k = 0; j<data['header'].length, k<data['body'][i].length; j++, k++) {
                p[i][data['header'][j]] = data['body'][i][k];
              }
            }

            saveAs(
                new Blob( [ JSON.stringify( p ) ] ),
                'Export.json'
            );
        }
        },
        {
          text: 'XML',
          key: '2',
          action: function (e, dt, node, config) {
            var data = dt.buttons.exportData();

            var p = {};

            for(let i = 0; i<data['body'].length; i++) {
              p[i] = {};
              for(let j = 0, k = 0; j<data['header'].length, k<data['body'][i].length; j++, k++) {
                p[i][data['header'][j]] = data['body'][i][k];
              }
            }

            var convert = require('xml-js');
            var options = {compact: true, ignoreComment: true, spaces: 4};
            var result = convert.json2xml(p, options);

            console.log(result);
            saveAs(
                new Blob( [ JSON.stringify(result) ] ),
                'Export.xml'
            );
          }
        }
      ],
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
        { title: 'Category' },
        { title: 'Path' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": [0] },
        { "searchable": false, "visible": false, "targets": [5] },
        { "searchable": false, "visible": false, "targets": [6] },
        { "searchable": false, "visible": false, "targets": [8] },
        { "searchable": true, "visible": false, "targets": [9] },
        { "searchable": true, "visible": false, "targets": [10] },
        { "searchable": true, "visible": false, "targets": [11] },
        { "searchable": true, "visible": false, "targets": [12] },
        { "searchable": false, "visible": false, "targets": [13] },
        { "searchable": false, "visible": false, "targets": [14] },
        { "searchable": false, "visible": false, "targets": [15] },
        { "searchable": false, "visible": false, "targets": [16] },
        { "searchable": false, "visible": false, "targets": [18] }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.data = data;
          if(data[18] == '') {
            this.images = [];
          } else {
            this.images = data[18].split(",");
          }
          this.dataAddress = data[10] + ", " + data[12] + ", " + data[13] + ", " + data[14] + " " + data[11];
          this.lat = parseFloat(data[15]);
          this.lon = parseFloat(data[16]);
          this.modal.show();
        });
        return row;
      }
    };

    this.datatableElement.dtInstance.then( (dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
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
    this.rerender();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void{
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
}

}
