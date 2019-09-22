import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { User } from '../user';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
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
export class ApplicationsComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, null)
  datatableElement: DataTableDirective;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  modalBody: string;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  idUser: string;

  modals: any;

  constructor(private tableService: TableServiceService, private rooter: Router) { }

  ngOnInit() {

    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: [
        {
          text: 'Accept All',
          key: '1',
          action: function ( e, dt, button, config ) {
            alert("Accepted All()");
          }
        },
        {
          text: 'Reject All',
          key: '2',
          action: function (e, dt, node, config) {
            alert("Rejected All()");
          }
        }
      ],
      retrieve: true,
      pagingType: 'full_numbers',
      scrollX: true,
      scrollCollapse: true,
      deferRender: true,
      ajax: {
        url: 'http://localhost:8080/api/printuserlistwithconnect.php'
      },
      columns: [
        { title: 'id', data: 'id'},
        { title: 'Username', data: 'username' },
        { title: 'Email', data: 'email' },
        { title: 'Name', data: 'name' },
        { title: 'Surname', data: 'surname' },
        { title: 'Phone Number', data: 'phone_number' },
        { title: 'Country', data: 'country' },
        { title: 'State', data: 'state' },
        { title: 'Town', data: 'town' },
        { title: 'Address', data: 'address' },
        { title: 'Postcode', data: 'postcode' },
        { title: 'TIN / ΑΦΜ', data: 'afm' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": 0 },
        { "visible": false, "targets": 5 },
        { "visible": false, "targets": 6 },
        { "visible": false, "targets": 7 },
        { "visible": false, "targets": 8 },
        { "visible": false, "targets": 9 },
        { "visible": false, "targets": 10 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          // console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.modalBody = this.format(data);
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

  format(data: any[] | Object) {
    this.idUser = data['id'];
    return '<div class="container">'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Username: </strong></h4><p>' + data['username'] + '</p></div>'
            + '<div class="col"><h4 class="h4-responsive"><strong>Email: </strong></h4><p>' + data['email'] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Full name: </strong></h4><p>' + data['surname'] + " " + data['name'] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Phone number: </strong></h4><p>' + data['phone_number'] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Address: </strong></h4><p>' + data['country'] + ", " + data['town'] + ", " + data['address'] + " " + data['postcode'] + ", " + data['state'] + '</p></div>'
            + '<div class="col"><h4 class="h4-responsive"><strong>TIN / ΑΦΜ: </strong></h4><p>' + data['afm'] + '</p></div></div><br>'
            + '</div>';
  }

  acceptUser() {
    this.tableService.acceptUser(this.idUser, 1).subscribe(data => {
        console.log(data);
        this.rooter.navigateByUrl('/refresh/+' + 0 + '/+' + 10);
    });
    console.log("user accepted with id: " + this.idUser);
    this.modal.first.hide();
    this.modals[1].hide();
    this.modal.last.hide();
  }

  openAcceptModal() {
    this.modals[1].show();
    this.modal.first.hide();
  }

  cancelAccept() {
    this.modals[1].hide();
    this.modal.first.show();
  }

  rejectUser() {
    this.tableService.acceptUser(this.idUser, 0).subscribe(data => {
        console.log(data);
        this.rooter.navigateByUrl('/refresh/+' + 0 + '/+' + 10);
    });
    console.log("user accepted with id: " + this.idUser);
    this.modal.first.hide();
    this.modal.last.hide();
    this.modals[1].hide();
  }

  openRejectModal() {
    this.modal.last.show();
    this.modal.first.hide();
  }

  cancelReject() {
    this.modal.first.show();
    this.modal.last.hide();
  }

}
