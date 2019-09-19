import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { ActivatedRoute, Router } from '@angular/router';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss'],
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
export class IndexUserComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, null)
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

  idAuctionToBid: number;
  buyPriceOfAuction: number;

  modals:any;

  tableInstance: any;

  loading: boolean;

  lat: number;
  lon: number;
  zoom: number = 15;

  items = [];

  data: any = [];

  dataAddress: string = "";

  images = ['../../assets/b.png'];

  constructor(private tableService: TableServiceService, private route: ActivatedRoute, private r: Router) { }

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

    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.idUser);

    this.apiCall().then( (data: Product[]) => {
      this.loading = false;
      this.products.forEach((product, idx) => {
        setTimeout(() => {
          this.items.push(product);
        }, 500 * (idx + 1));
      });
    });

    this.bidAmount = 0;

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
        { title: 'UserId' },
        { title: 'Category' },
        { title: 'Path' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": 0 },
        { "searchable": false, "visible": false, "targets": 5 },
        { "searchable": false, "visible": false, "targets": 6 },
        { "searchable": false, "visible": false, "targets": 8 },
        { "searchable": true, "visible": false, "targets": 9 },
        { "searchable": true, "visible": false, "targets": 10 },
        { "searchable": true, "visible": false, "targets": 11 },
        { "searchable": true, "visible": false, "targets": 12 },
        { "searchable": false, "visible": false, "targets": 13 },
        { "searchable": false, "visible": false, "targets": 14 },
        { "searchable": false, "visible": false, "targets": 15 },
        { "searchable": false, "visible": false, "targets": 16 },
        { "searchable": false, "visible": false, "targets": 17 },
        { "searchable": false, "visible": false, "targets": 19 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          if(data[19] == '') {
            this.images = [];
          } else {
            this.images = data[19].split(",");
          }
          this.bidAmount = 0;
          this.usersAuction = false;
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.data = data;
          this.dataAddress = data[10] + ", " + data[12] + ", " + data[13] + ", " + data[14] + " " + data[11];
          this.lat = parseFloat(data[15]);
          this.lon = parseFloat(data[16]);
          if(data[17] == this.idUser.toString()) {
            this.usersAuction = true;
          } else {
            this.idAuctionToBid = data[0];
            if(data[3].trim() == '') {
              this.buyPriceOfAuction = 0;
            } else {
              this.buyPriceOfAuction = data[3];
            }
          }
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
    this.tableInstance = this.datatableElement;
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

  rerender(): void{
      this.tableInstance.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
  }

  openBiddingForm() {
    if(this.openform == true) {
      this.openform = false;
      setTimeout(() => {
        document.getElementById("frameModalTop").scrollTo({top:0, behavior: 'smooth'});
      }, 1);
    } else {
      this.openform = true;
      setTimeout(() => {
        document.getElementById("biddingForm").scrollIntoView({behavior: 'smooth'});
      }, 50);
    }
  }

  openBidModal(event) {
    event.preventDefault();
    const form = event.target;
    this.bidAmount = form.querySelector('#bidAmount').value;
    this.modals[1].show();
  }

  addBid() {
    this.bidded = true;
    const aid = this.idAuctionToBid;
    const bp = this.buyPriceOfAuction;
    this.tableService.addBid(this.idUser, aid, this.bidAmount, bp).subscribe(data => {
      console.log(data);
      this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 20);
    });
    this.modals[1].hide();
  }

}
