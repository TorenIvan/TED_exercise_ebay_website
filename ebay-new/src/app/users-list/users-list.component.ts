import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { User } from '../user';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

import { trigger, style, query, stagger, animate, transition } from '@angular/animations';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
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
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChildren(ModalDirective)
  modal: QueryList<ModalDirective>;

  modalBody: string;

  dtOptions: DataTables.Settings = {};

  users: User[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  ableToDeleteUser: boolean; // an uparxei estw kai ena bid den mporei na diagrafei

  tableInstance: any;

  idUser: string;
  usernameUser: string;

  loading: boolean;

  items = [];

  constructor(private tableService: TableServiceService, private rooter: Router) { }

  apiCall(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.tableService.getAllUsers().toPromise().then(
        (res: User[]) => {
          this.users = res;
          resolve();
        }
      );
    });
  }

  ngOnInit() {

    this.loading = true;

    this.apiCall().then( (data: User[]) => {
      this.loading = false;
      this.users.forEach((user, idx) => {
        setTimeout(() => {
          this.items.push(user);
        }, 500 * (idx + 1));
      });
    });

    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      scrollX: true,
      scrollCollapse: true,
      columns: [
        { title: 'id' },
        { title: 'Username' },
        { title: 'Email' },
        { title: 'Name' },
        { title: 'Surname' },
        { title: 'Phone Number' },
        { title: 'Country' },
        { title: 'State' },
        { title: 'Town' },
        { title: 'Address' },
        { title: 'Postcode' },
        { title: 'TIN / ΑΦΜ' },
        { title: 'Latitude' },
        { title: 'Longitude' }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "visible": false, "targets": 0 },
        { "visible": false, "targets": 5 },
        { "visible": false, "targets": 7 },
        { "visible": false, "targets": 8 },
        { "visible": false, "targets": 9 },
        { "visible": false, "targets": 10 },
        { "searchable": false, "visible": false, "targets": 12 },
        { "searchable": false, "visible": false, "targets": 13 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
          this.modalBody = this.format(data.toString());
          this.ableToDeleteUser = false;
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

  format(data : string) {
    const p = data.split(',');
    this.idUser = p[0];
    this.usernameUser = p[1];
    return '<div class="container">'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Username: </strong></h4><p>' + p[1] + '</p></div>'
            + '<div class="col"><h4 class="h4-responsive"><strong>Email: </strong></h4><p>' + p[2] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Full name: </strong></h4><p>' + p[4] + " " + p[3] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Phone number: </strong></h4><p>' + p[5] + '</p></div></div><br>'
            + '<div class="row"><div class="col"><h4 class="h4-responsive"><strong>Address: </strong></h4><p>' + p[6] + ", " + p[7] + ", " + p[8] + " " + p[9] + ", " + p[10] + '</p></div>'
            + '<div class="col"><h4 class="h4-responsive"><strong>TIN / ΑΦΜ: </strong></h4><p>' + p[11] + '</p></div></div><br>'
            + '</div>';
  }

  deleteUser() {
    this.ableToDeleteUser = true;
    console.log("user deleted with id: " + this.idUser);
    this.tableService.deleteUser(this.idUser).subscribe(data => {
      console.log(data);
      const userId = JSON.stringify(this.usernameUser);
      axios.post('http://localhost:5200/delete', {userId})
        .then(() => {
          console.log("Successful!");
        })
        .catch(error => console.error(error));
      this.modal.first.hide();
      this.modal.last.hide();
      this.rooter.navigateByUrl('/refresh/+' + this.idUser + '/+' + 30);
    });
  }

  openDeleteModal() {
    this.modal.last.show();
    this.modal.first.hide();
  }

  cancelDelete() {
    this.ableToDeleteUser = false;
    this.modal.first.show();
    this.modal.last.hide();
  }

}
