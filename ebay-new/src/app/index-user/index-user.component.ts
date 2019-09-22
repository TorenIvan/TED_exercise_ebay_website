import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
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
export class IndexUserComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, null)
  datatableElement: DataTableDirective;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  bidAmount: number;

  dtOptions: DataTables.Settings = {};

  openform = false;

  bidded = false;

  usersAuction = false;

  idUser:number;

  idAuctionToBid: number;
  buyPriceOfAuction: number;

  modals:any;

  data: any = [];

  lat: number;
  lon: number;
  zoom: number = 15;

  dataAddress: string = "";

  images = ['../../assets/b.png'];

  constructor(private tableService: TableServiceService, private route: ActivatedRoute, private r: Router) { }

  ngOnInit() {

    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.idUser);

    this.bidAmount = 0;

    this.dtOptions = {
      retrieve: true,
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
        { title: 'Creator', data: 'id_creator' },
        { title: 'Category', data: 'categories' },
        { title: 'Path', data: 'images' }
      ],
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
      order: [[ 2, "asc" ]],
      deferRender: true,
      rowCallback: (row: Node, data: any[] | Object) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          // console.log("row: " + row + "\ndata: " + data['id'] + "\nindex: "+  index);
          if(data['images'] == '') {
            this.images = [];
          } else {
            this.images = data['images'].split(",");
          }
          this.bidAmount = 0;
          this.usersAuction = false;
          this.dataAddress = data['country'] + ", " + data['town'] + ", " + data['address'] + ", " + data['postcode'] + " " + data['state'];
          this.lat = parseFloat(data['latitude']);
          this.lon = parseFloat(data['longitude']);
          if(data['id_creator'] == this.idUser.toString()) {
            this.usersAuction = true;
          } else {
            this.idAuctionToBid = data['id'];
            if(data['buy_price'] == null || data['buy_price'].trim() == '') {
              this.buyPriceOfAuction = 0;
            } else {
              this.buyPriceOfAuction = data['buy_price'];
            }
          }
          this.data = data;
          this.modal.first.show();
        });
        return row;
      }
    };
  }
    
  ngAfterViewInit() {
    this.modals = this.modal.toArray();
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
