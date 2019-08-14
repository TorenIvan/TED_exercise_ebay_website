import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
// import {} from 'googlemaps';

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

  // @ViewChild('map') mapElement: any;
  // map: google.maps.Map;

  modalBody: string;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  lat: number;
  lon: number;
  zoom: number = 15;

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.lat = 0.0;
    this.lon = 0.0;
    
    this.tableService.getAllAuctions().subscribe((data: Product[]) => {
      this.products = data;
      this.dtTrigger.next();
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
        { "targets": [ 0 ], "visible": false, "searchable": false },
        { "targets": [ 5 ], "visible": false, "searchable": false },
        { "targets": [ 6 ], "visible": false, "searchable": false },
        { "targets": [ 8 ], "visible": false, "searchable": false },
        { "targets": [ 9 ], "visible": false, "searchable": false },
        { "targets": [ 10 ], "visible": false, "searchable": false },
        { "targets": [ 11 ], "visible": false, "searchable": false },
        { "targets": [ 12 ], "visible": false, "searchable": false },
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
          this.modalBody = this.format(data.toString());
          this.modal.show();
        });
        return row;
      }
    };

    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.datatableElement.dtInstance.then( (dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
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

  // rerender(): void{
  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }

  format(data : string) {
    const p = data.split(',');
    this.lat = parseFloat(p[15]);
    this.lon = parseFloat(p[16]);
    if(p[8] == "") {
      return '<div class="container">'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Product: </strong></h4><p>' + p[2] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Seller: </strong></h4><p>' + p[1] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Description: </strong></h4><p>' + p[9] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Address: </strong></h4><p>' + p[10] + ", " + p[12] + ", " + p[13] + ", " + p[14] + " " + p[11] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Buy Price: </strong></h4><p>' + p[3] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Currently: </strong></h4><p>' + p[4] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Start Date: </strong></h4><p>' + p[7] + '</p></div>'
              + '<div class="col"></div><br>'
            + '</div>';
    }
    return '<div class="container">'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Product: </strong></h4><p>' + p[2] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Seller: </strong></h4><p>' + p[1] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Description: </strong></h4><p>' + p[9] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Address: </strong></h4><p>' + p[10] + ", " + p[12] + ", " + p[13] + ", " + p[14] + " " + p[11] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Buy Price: </strong></h4><p>' + p[3] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>Currently: </strong></h4><p>' + p[4] + '</p></div></div><br>'
              + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Start Date: </strong></h4><p>' + p[7] + '</p></div>'
              + '<div class="col"><h4 class="h4-responsive"><strong>End Date: </strong></h4><p>' + p[8] + '</p></div></div><br>'
            + '</div>';
  }

}
