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

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-personal-auctions',
  templateUrl: './personal-auctions.component.html',
  styleUrls: ['./personal-auctions.component.scss']
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

  name: string;
  searchText: string = "";
  selected_count: number = 0;
  selected_categories: any;

  lat: number;
  lon: number;
  zoom: number = 15;

  geocoder: any;

  constructor(private tableService: TableServiceService) {
    this.name = `Angular! v${VERSION.full}`;
    this.tableService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.getSelected();
    });
  }

  ngOnInit() {

    this.lat = 0.0;
    this.lon = 0.0;

    // id xrhsth
    this.idUser=2;

    this.tableService.getMyAuctions(this.idUser).subscribe((data: Product[]) => {
      this.products = data;
      this.dtTrigger.next();
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
          this.ableToDeleteAuction = false;
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
    this.geocoder = new google.maps.Geocoder;
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
  }

  rerender(): void{
    this.tableInstance.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // this.tableService.getMyAuctions(this.idUser).subscribe((data: Product[]) => {
      //     this.products = data;
      //     this.dtTrigger.next();
      // });
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  format(data : string) {
    const p = data.split(',');
    this.lat = parseFloat(p[15]);
    this.lon = parseFloat(p[16]);
    this.idAuction = p[0];
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

  openFormForNewAuction() {
    this.modals[2].show();
    this.modals[0].hide();
    this.modals[1].hide();
    this.ableToSubmitAuction = true;
    this.resultFlag = true;
  }

  addAuction(event) {
    event.preventDefault();
    const form = event.target
    const product = form.querySelector('#fp').value
    const description = form.querySelector('#fd').value
    const buy_price = form.querySelector('#fbp').value
    // const category = form.querySelector('#fca').value
    var category = this.selected_categories;
    const country = form.querySelector('#fco').value
    const state = form.querySelector('#fs').value
    const town = form.querySelector('#ft').value
    const address = form.querySelector('#fa').value
    const postcode = form.querySelector('#fpc').value
    const start_date = form.querySelector('#fsd').value
    const end_date = form.querySelector('#fse').value

    var location = address + " " + postcode + " " + town + " " + state + " " + country;
    location = location.toString();

    var latitude = 0;
    var longitude = 0;

    if(product.trim() && description.trim() && buy_price.trim() && category !== 'undefined' && category.length > 0 && country.trim() && town.trim() && address.trim() && postcode.trim() && start_date.trim()) {
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
          }
        })
      );
      // const latitude = 0;
      // const longitude = 0;
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