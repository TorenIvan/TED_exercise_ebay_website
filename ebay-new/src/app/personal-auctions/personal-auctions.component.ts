import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList, VERSION, NgModule } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { Category } from '../category';

import { BrowserModule } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import {} from 'googlemaps';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

import { ActivatedRoute } from '@angular/router';
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
export class PersonalAuctionsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  modalBody: string;

  categories: Category[];

  selectedCategory: Category;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  ableToDeleteAuction: boolean; // an uparxei estw kai ena bid den mporei na diagrafei

  ableToSubmitAuction: boolean;

  resultFlag: boolean;

  idUser: number;

  idAuction: string;

  tableInstance: any;

  modals: any;
  
  hhh: string;

  saveButton: boolean;

  loading: boolean;

  infoForm = new FormGroup({
    prForm : new FormControl(),
    seForm: new FormControl(),
    deForm: new FormControl(),
    adForm: new FormControl(),
    cdForm: new FormControl(),
    bpForm: new FormControl(),
    cuForm: new FormControl(),
    sdForm: new FormControl(),
    edForm: new FormControl()
  });

  name: string;
  searchText: string = "";
  selected_count: number = 0;
  selected_categories: any;

  lat: number;
  lon: number;
  zoom: number = 15;

  geocoder: any;

  items = [];

  constructor(private tableService: TableServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.name = `Angular! v${VERSION.full}`;
    this.tableService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.getSelected();
    });
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

  apiCall(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.tableService.getMyAuctions(this.idUser).toPromise().then(
        (res: Product[]) => {
          this.products = res;
          resolve();
        }
      );
    });
  }

  ngOnInit() {

    // id xrhsth
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.idUser);

    this.loading = true;

    this.saveButton = false;

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
        { "searchable": false, "visible": false, "targets": 16 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          // this.modalBody = this.format(data.toString());
          this.infoForm.patchValue({
            prForm: data[2],
            seForm: data[1],
            deForm: data[9],
            adForm: data[10] + ", " + data[12] + ", " + data[13] + " " + data[14] + ", " + data[11],
            cdForm: "------------------------------------------",
            bpForm: data[3],
            cuForm: data[4],
            sdForm: formatDate(data[7], 'yyyy-MM-dd', 'en'),
            edForm: formatDate(data[8], 'yyyy-MM-dd', 'en')
          });
          this.lat = parseFloat(data[15]);
          this.lon = parseFloat(data[16]);
          this.saveButton = false;
          this.idAuction = data[0];
          this.ableToDeleteAuction = false;
          this.modal.first.show();
        });
        return row;
      }
    };

    this.onChanges();

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
    this.geocoder = new google.maps.Geocoder;
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

  openFormForNewAuction() {
    this.modals[2].show();
    this.modals[0].hide();
    this.modals[1].hide();
    this.ableToSubmitAuction = true;
    this.resultFlag = true;
  }

  addAuction(event) {
    event.preventDefault();
    const form = event.target;
    const product = form.querySelector('#fp').value;
    const description = form.querySelector('#fd').value;
    const buy_price = form.querySelector('#fbp').value;
    // const category = form.querySelector('#fca').value;
    var category = this.selected_categories;
    const country = form.querySelector('#fco').value;
    const state = form.querySelector('#fs').value;
    const town = form.querySelector('#ft').value;
    const address = form.querySelector('#fa').value;
    const postcode = form.querySelector('#fpc').value;
    const start_date = form.querySelector('#fsd').value;
    const end_date = form.querySelector('#fse').value;

    console.log(start_date);
    console.log(end_date);

    var location = address + " " + postcode + " " + town + " " + state + " " + country;
    location = location.toString();

    var latitude = 0;
    var longitude = 0;

    if(product.trim() && description.trim() && buy_price.trim() && category !== 'undefined' && category.length > 0 && country.trim() && town.trim() && address.trim() && postcode.trim() && start_date && end_date) {
      this.geocoder.geocode({address: location}, (
        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if(status === google.maps.GeocoderStatus.OK) {
            console.log(results);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longitude);
          } else {
            console.log('Geocoding service: geocoder failed due to: ' + status);
            latitude = 0;
            longitude = 0;
          }
        })
      );

      this.tableService.addAuction(this.idUser, product, description, buy_price, category, country, state, town, address, postcode, latitude, longitude, end_date, start_date).subscribe(data => {
        console.log(data)
        this.hhh = data.toString();
      });
      console.log("New Auction YAY!");
      this.ableToSubmitAuction = false;
      this.resultFlag = false;
      this.modals[2].hide();
    } else {
      // alert not all necessary fields are filled
      this.hhh = "Some necessary fields are empty!";
      this.resultFlag = false;
    }
  }

  deleteAuction() {
    this.ableToDeleteAuction = true;
    this.tableService.deleteAuction(this.idAuction).subscribe(data => {
      console.log(data)
    });
    console.log("auction deleted with id: " + this.idAuction);
    this.modals[1].hide();
    this.modals[0].hide();
    this.modals[2].hide();
    this.rerender();
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
    this.infoForm.valueChanges.subscribe(val => {
      this.saveButton = true;
    });
  }

  saveAuctionChanges(event) {
    event.preventDefault();
    console.log("edited and saved changes");
  }

  // Getting Selected Games and Count
  getSelected() {
    this.selected_categories = this.categories.filter(s => {
      return s.selected;
    });
    this.selected_count = this.selected_categories.length;
    //alert(this.selected_games);    
  }
 
  // Clearing All Selections
  clearSelection() {
    this.searchText = "";
    this.categories = this.categories.filter(g => {
      g.selected = false;
      return true;
    });
    this.getSelected();
  }
 
  //Delete Single Listed Game Tag
  deleteCategory(id: number) {
    this.searchText = "";
    this.categories = this.categories.filter(g => {
      if (g.id == id)
        g.selected = false;
 
      return true;
    });
    this.getSelected();
  }
 
  //Clear term types by user
  clearFilter() {
    this.searchText = "";
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [PersonalAuctionsComponent, FilterPipe],
  bootstrap: [PersonalAuctionsComponent]
})
export class AppModule { }