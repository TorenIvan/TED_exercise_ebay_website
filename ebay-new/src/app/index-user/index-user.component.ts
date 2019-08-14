import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss']
})
export class IndexUserComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  modalBody: string;

  bidAmount: number;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  openform = false;

  bidded = false;

  usersAuction = false;

  idUser:number;

  modals:any;

  lat: number;
  lon: number;
  zoom: number = 15;

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.lat = 0.0;
    this.lon = 0.0;

    this.idUser = 2;

    this.tableService.getAllAuctions().subscribe((data: Product[]) => {
      this.products = data;
      this.dtTrigger.next();
    });

    this.bidAmount = 0;

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
        { title: 'Longitude' },
        { title: 'UserId' }
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
        { "searchable": false, "visible": false, "targets": 16 },
        { "searchable": false, "visible": false, "targets": 17 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.bidAmount = 0;
          this.usersAuction = false;
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.modalBody = this.format(data.toString());
          this.modal.first.show();
        });
        return row;
      }
    };

    this.datatableElement.dtInstance.then( (dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  

  ngAfterViewInit() {
    this.modals = this.modal.toArray();
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
    this.lat = parseFloat(p[15]);
    this.lon = parseFloat(p[16]);
    if(p[17] == this.idUser.toString()) {
      this.usersAuction = true;
    }
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

  openBiddingForm() {
    if(this.openform == true)
      this.openform = false;
    else
      this.openform = true;
  }

  openBidModal(event) {
    event.preventDefault();
    const form = event.target;
    this.bidAmount = form.querySelector('#bidAmount').value;
    this.modals[1].show();
  }

  addBid() {
    this.bidded = true;
    this.modals[1].hide();
  }

  openEndModal() {
    this.modal.last.show();
  }

  endAuction() {
    this.modal.last.hide();
    this.modal.first.hide();
  }

}
