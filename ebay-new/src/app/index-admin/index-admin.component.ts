import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { saveAs } from 'file-saver';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';

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
export class IndexAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, null)
  datatableElement: DataTableDirective;

  @ViewChild(ModalDirective, null)
  modal: ModalDirective;

  dtOptions: DataTables.Settings = {};

  lat: number;
  lon: number;
  zoom: number = 15;

  data: any = [];

  dataAddress: string = "";

  images = ['../../assets/DivaExpressLogo2.png', '../../assets/b.png', '../../assets/correct.png'];

  constructor() { }

  ngOnInit() {

    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: [
        {
          text: 'JSON',
          key: '1',
          action: function ( e, dt ) {
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
          action: function (e, dt) {
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

            // console.log(result);
            saveAs(
                new Blob( [ JSON.stringify(result) ] ),
                'Export.xml'
            );
          }
        }
      ],
      pagingType: 'full_numbers',
      ajax: {
        url: 'http://localhost:8080/api/read.php'
      },
      columns: [
        { title: 'id', data: 'id'},
        { title: 'Seller', data: 'user_surname' },
        { title: 'Product', data: 'product_name' },
        { title: 'Buy Price', data: 'buy_price' },
        { title: 'Currently', data: 'currently' },
        { title: 'First Bid', data: 'first_bid' },
        { title: 'Number of Bids', data: 'number_of_bids' },
        { title: 'Start Date', data: 'start_date' },
        { title: 'End Date', data: 'end_date' },
        { title: 'Description', data: 'description' },
        { title: 'Country', data: 'country' },
        { title: 'State', data: 'state' },
        { title: 'Town', data: 'town' },
        { title: 'Address', data: 'address' },
        { title: 'Postcode', data: 'postcode' },
        { title: 'Latitude', data: 'latitude' },
        { title: 'Longitude', data: 'longitude' },
        { title: 'Category', data: 'categories' },
        { title: 'Path', data: 'images' }
      ],
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
        { "targets": [ 16 ], "visible": false, "searchable": false },
        { "targets": [ 18 ], "visible": false, "searchable": false }
      ],
      order: [[ 2, "asc" ]],
      deferRender: true,
      rowCallback: (row: Node, data: any[] | Object) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          // console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.data = data;
          if(data['images'] == '') {
            this.images = [];
          } else {
            this.images = data['images'];
          }
          this.dataAddress = data['country'] + ", " + data['town'] + ", " + data['address'] + ", " + data['postcode'] + " " + data['state'];
          this.lat = parseFloat(data['latitude']);
          this.lon = parseFloat(data['longitude']);
          this.modal.show();
        });
        return row;
      }
    };
  }

  ngAfterViewInit() {
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

}
