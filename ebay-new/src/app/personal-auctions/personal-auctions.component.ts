import { AfterViewInit, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { Cat } from '../category';

import {} from 'googlemaps';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { formatDate } from '@angular/common';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-personal-auctions',
  templateUrl: './personal-auctions.component.html',
  styleUrls: ['./personal-auctions.component.scss'],
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
export class PersonalAuctionsComponent implements OnInit, AfterViewInit {

  @ViewChildren(DataTableDirective, null)
  datatableElement: QueryList<DataTableDirective>;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  categories: any[] = [];

  dtOptions: DataTables.Settings = {};

  ableToDeleteAuction: boolean; // an uparxei estw kai ena bid den mporei na diagrafei

  ableToSubmitAuction: boolean;

  resultFlag: boolean;

  resFlag: boolean;

  idUser: number;

  idAuction: number;

  auctionAddress: string;

  modals: any;
  
  hhh: string;

  res: string;

  saveButton: boolean;

  infoForm = new FormGroup({
    prForm : new FormControl(),
    seForm: new FormControl({disabled: true}),
    deForm: new FormControl(),
    adForm: new FormControl(),
    cdForm: new FormControl(),
    bpForm: new FormControl(),
    cuForm: new FormControl({disabled: true}),
    sdForm: new FormControl(),
    edForm: new FormControl()
  });

  selected_categories: any[] = [];

  lat: number;
  lon: number;
  zoom: number = 15;

  geocoder: any;
  
  uploadIm: string[] = [];
  
  images = ['../../assets/DivaExpressLogo2.png', '../../assets/b.png', '../../assets/correct.png'];

  dtOptions2: DataTables.Settings = {};

  config = {
    paddingAtStart: true,
    classname: 'categories-arcodion',
    listBackgroundColor: 'white',
    fontColor: 'rgb(8, 54, 71)',
    backgroundColor: 'white',
    selectedListFontColor: 'rgb(0, 135, 209)',
    highlightOnSelect: true,
    collapseOnSelect: true,
  };
  
  isCollapsed: boolean = true;
  
  hasBids: boolean;

  constructor(private tableService: TableServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private r: Router) {
    this.infoForm = this.formBuilder.group({
      prForm : '',
      seForm: '',
      deForm: '',
      adForm: '',
      cdForm: '',
      bpForm: '',
      cuForm: '',
      sdForm: '',
      edForm: ''
    });
  }

  ngOnInit() {

    this.tableService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
    
    // id xrhsth
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    // console.log(this.idUser);

    this.saveButton = false;

    this.idAuction = -1;

    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      ajax: {
        url: 'http://localhost:8080/api/usersonlyauctions.php',
        type: 'POST',
        data: {
          id: this.idUser
        }
      },
      columns: [
        { title: 'id', data: 'id'},
        { title: 'Seller', data: 'username' },
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
        { "searchable": false, "visible": false, "targets": 18 }
      ],
      rowCallback: (row: Node, data: any[] | Object) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.selected_categories = [];
          // console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          if(data['images'] == '') {
            this.images = [];
          } else {
            this.images = data['images'];
          }
          const s = data['start_date'].split(" ");
          const e = data['end_date'].split(" ");
          this.infoForm.patchValue({
            prForm: data['product_name'],
            seForm: data['username'],
            deForm: data['description'],
            adForm: data['country'] + ", " + data['town'] + ", " + data['address'] + " " + data['postcode'] + ", " + data['state'],
            cdForm: data['categories'],
            bpForm: data['buy_price'],
            cuForm: data['currently'],
            sdForm: formatDate(s[0], 'yyyy-MM-dd', 'en'),
            edForm: formatDate(e[0], 'yyyy-MM-dd', 'en')
          });
          this.lat = parseFloat(data['latitude']);
          this.lon = parseFloat(data['longitude']);
          this.saveButton = false;
          this.auctionAddress = data['country'] + ", " + data['town'] + ", " + data['address'] + " " + data['postcode'] + ", " + data['state'];
          this.idAuction = data['id'];
          var sd = new Date(s[0]);
          var now = new Date();
          if(sd > now) {
            if(data['number_of_bids'] == 0) {
              this.ableToDeleteAuction = false;
            } else {
              this.ableToDeleteAuction = true;
            }
          } else {
            this.ableToDeleteAuction = true;;
          }
          if(data['number_of_bids'] == 0) {
            this.hasBids = true;
          } else {
            this.hasBids = false;
          }
          this.resFlag = true;
          this.modal.first.show();
        });
        return row;
      }
    };

    const that = this;

    this.dtOptions2 = {
      retrieve: true,
      pagingType: 'full_numbers',
      ajax: {
        url: 'http://localhost:8080/api/getBidsForAuction.php',
        type: 'POST',
        data: function ( d ) {
          return $.extend( {}, d, {
            id: that.idAuction
          } );
       }
      },
      columns: [
        { title: 'User', data: 'username'},
        { title: 'Amount of Money', data: 'money' },
        { title: 'Time of Bid', data: 'time' }
      ],
      order: [[ 1, "asc" ]]
    };

    this.onChanges();
  }

  ngAfterViewInit() {
    this.modals = this.modal.toArray();
    this.datatableElement.first.dtInstance.then((dtInstance: DataTables.Api) => {
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
    this.datatableElement.last.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        that.draw();
      });
    });
    this.geocoder = new google.maps.Geocoder;
  }

  openFormForNewAuction() {
    this.selected_categories = [];
    this.modals[2].show();
    this.modals[0].hide();
    this.modals[1].hide();
    this.ableToSubmitAuction = true;
    this.resultFlag = true;
  }

  onFileSelect(event) {
    this.uploadIm = [];
    if (event.target.files.length > 0) {
      for(let i=0; i<event.target.files.length; i++) {
        this.uploadIm.push(event.target.files[i]);
      }
    }
  }

  addAuction(event) {
    event.preventDefault();
    const form = event.target;
    const product = form.querySelector('#fp').value;
    const description = form.querySelector('#fd').value;
    const buy_price = form.querySelector('#fbp').value;
    var category = this.selected_categories;
    const country = form.querySelector('#fco').value;
    const state = form.querySelector('#fs').value;
    const town = form.querySelector('#ft').value;
    const address = form.querySelector('#fa').value;
    const postcode = form.querySelector('#fpc').value;
    const start_date = form.querySelector('#fsd').value;
    const end_date = form.querySelector('#fse').value;

    let imageToUpload = new FormData();
    imageToUpload.append("name", product);
    imageToUpload.append("id", this.idUser.toString());
    for(let i=0; i < form.querySelector('#fimg').files.length; i++) {
      imageToUpload.append("imageToUpload[]", form.querySelector('#fimg').files[i], form.querySelector('#fimg').files[i]['name']);
    }

    // console.log(form.querySelector('#fimg').files);

    var location = address + " " + postcode + " " + town + " " + state + " " + country;
    location = location.toString();

    var latitude = 0;
    var longitude = 0;

    // console.log(this.selected_categories);

    if(product.trim() && description.trim() && buy_price.trim() && category.length > 0 && country.trim() && town.trim() && address.trim() && postcode.trim() && start_date && end_date) {
      this.geocoder.geocode({address: location}, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if(status === google.maps.GeocoderStatus.OK) {
            // console.log(results);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            // console.log(latitude);
            // console.log(longitude);
          } else {
            // console.log('Geocoding service: geocoder failed due to: ' + status);
            latitude = 0;
            longitude = 0;
          }
        })
      );

      var ajaxHandler = new XMLHttpRequest();
      ajaxHandler.open("POST", "/api/dirs.php", false);
      let flag = 0;
      ajaxHandler.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            flag = 1;
            // console.log("File created!");
        }
      }
      ajaxHandler.send(imageToUpload);

      if(flag == 1) {
        this.tableService.addAuction(this.idUser, product, description, buy_price, category, country, state, town, address, postcode, latitude, longitude, end_date, start_date).subscribe(data => {
          // console.log(data)
          this.hhh = data.toString();
          // console.log("New Auction YAY!");
          this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 40);
        });
        this.ableToSubmitAuction = false;
        this.resultFlag = false;
        this.modals[2].hide();
      } else {
        // console.log("Problem with creating pictures file");
        this.ableToSubmitAuction = false;
        this.hhh = "There was a problem adding the new auction. Please try again later.";
      }
    } else {
      // alert not all necessary fields are filled
      this.hhh = "Some necessary fields are empty!";
      this.resultFlag = false;
    }
  }

  deleteAuction() {
    this.ableToDeleteAuction = true;
    this.tableService.deleteAuction(this.idAuction).subscribe(data => {
      // console.log(data);
      // console.log("auction deleted with id: " + this.idAuction);
      this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 40);
    });
    this.modals[1].hide();
    this.modals[0].hide();
    this.modals[2].hide();
  }

  openDeleteModal() {
    this.modals[0].hide();
    this.modals[1].show();
    this.modals[2].hide();
  }

  cancelDelete() {
    this.ableToDeleteAuction = false;
    this.modals[0].show();
    this.modals[1].hide();
    this.modals[2].hide();
  }

  onChanges() {
    this.infoForm.valueChanges.subscribe(() => {
      this.saveButton = true;
    });
  }

  saveAuctionChanges(event) {
    event.preventDefault();
    var product = this.infoForm.get('prForm').value;
    product =  product.trim();
    var category;
    if(this.selected_categories.length == 0) {
      category = [];
    } else {
      category = this.selected_categories;
    }
    var description = this.infoForm.get('deForm').value;
    description = description.trim();
    var buy_price = this.infoForm.get('bpForm').value;
    var start_date = this.infoForm.get('sdForm').value;
    var end_date = this.infoForm.get('edForm').value;
    var country;
    var state;
    var town;
    var address;
    var postcode;
    var latitude = 0;
    var longitude = 0;
    if(this.auctionAddress === this.infoForm.get('adForm').value.trim()) {
      country = '';
      state = '';
      town = '';
      address = '';
      postcode = '';
    } else {
      const h = this.infoForm.get('adForm').value.split(',');
      country = h[0].trim();
      state = h[4].trim();
      town = h[1].trim();
      address = h[2].trim();
      postcode = h[3].trim();
      var location = address + " " + postcode + " " + town + " " + state + " " + country;
      location = location.toString();

      this.geocoder.geocode({address: location}, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if(status === google.maps.GeocoderStatus.OK) {
            // console.log(results);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            // console.log(latitude);
            // console.log(longitude);
          } else {
            // console.log('Geocoding service: geocoder failed due to: ' + status);
            latitude = 0;
            longitude = 0;
          }
        })
      );

    }

    // console.log(this.selected_categories);

    if(product != '' && this.infoForm.get('cdForm').value.trim() != '' && description != '' && buy_price > 0 && start_date != null && end_date != null && this.infoForm.get('adForm').value.trim() != '') {
      this.tableService.saveAuctionChanges(this.idAuction, product, category, description, buy_price, start_date, end_date, country, state, town, address, postcode, latitude, longitude).subscribe(data => {
        // console.log(data);
        if(data == '1') {
          // console.log("edited and saved changes");
          this.modals[0].hide();
          this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 40);
        } else {
          this.res = "There was a problem saving the changes, please try again later.";
          this.resFlag = false;
        }
      })
    } else {
      this.res = "All fields must be filled.";
      this.resFlag = false;
    }
  }

  selectedItem(event) {
    const level = event.context.split(' ');
    this.selected_categories[level[1]] = new Cat();
    this.selected_categories[level[1]]['id'] = level[0];
    this.selected_categories[level[1]]['description'] = event.label;
  }

  selectedLabel(event) {
    const level = event.context.split(' ');
    this.selected_categories[level[1]] = new Cat();
    this.selected_categories[level[1]]['id'] = level[0];
    this.selected_categories[level[1]]['description'] = event.label;
    this.selected_categories.splice(level[1]+1);
  }

  newItem(event) {
    const level = event.context.split(' ');
    this.selected_categories[level[1]] = new Cat();
    this.selected_categories[level[1]]['id'] = level[0];
    this.selected_categories[level[1]]['description'] = event.label;
    var desc = this.selected_categories[0]['description'];
    for(let i = 1; i < this.selected_categories.length; i++) {
      desc += ', ' + this.selected_categories[i]['description'];
    }
    this.infoForm.patchValue({cdForm: desc});
  }

  newLabel(event) {
    const level = event.context.split(' ');
    this.selected_categories[level[1]] = new Cat();
    this.selected_categories[level[1]]['id'] = level[0];
    this.selected_categories[level[1]]['description'] = event.label;
    this.selected_categories.splice(level[1]+1);
    var desc = this.selected_categories[0]['description'];
    for(let i = 1; i < this.selected_categories.length; i++) {
      desc += ', ' + this.selected_categories[i]['description'];
    }
    this.infoForm.patchValue({cdForm: desc});
  }

  closeInfoModal() {
    this.modals[0].hide();
    this.isCollapsed = true;
    this.resFlag = true;
    this.res = '';
  }

  openBidsModal() {
    this.datatableElement.last.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
    this.modals[0].hide();
    this.modals[3].show();
  }

  closeBidsModal() {
    this.modals[3].hide();
    this.modals[0].show();
  }

}