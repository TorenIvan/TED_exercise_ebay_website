import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Product } from '../product';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  products: Product[];

  datatable: any;

  dtTrigger: Subject<any> = new Subject();

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.datatable = $('tableP').DataTable(this.dtOptions = {
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
        {
          title: 'Details',
          orderable: false
        }
      ],
      order: [[ 2, "asc" ]],
      columnDefs: [
        { "searchable": false, "visible": false, "targets": 0 },
        { "searchable": false, "visible": false, "targets": 5 },
        { "searchable": false, "visible": false, "targets": 6 },
        { "searchable": false, "visible": false, "targets": 8 }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log("row: " + row + "\ndata: " + data + "\nindex: "+  index);
        });
        return row;
      }
    });
      
    this.tableService.getAllAuctions().subscribe((data: Product[]) => {
      if(data != null) {
        this.products = data;
        this.dtTrigger.next();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.pipe();
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

//   format () {
//     // 'd' is the original data object for the row
//     return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
//     '<tr>'+
//         '<td>Extra info:</td>'+
//         '<td>And any further details here (images etc)...</td>'+
//     '</tr>'+
// '</table>';
//   }

//   changeDetail() {
//     const tr = $('#detail-btn');
//     const row = this.datatable.row( tr );
 
//     if ( row.child.isShown() ) {
//       // This row is already open - close it
//       row.child.hide();
//       tr.removeClass('shown');
//     } else {
//       // Open this row
//       row.child( this.format());
//       console.log(this.format());
//       console.log(tr.addClass('shown'));
//       tr.addClass('shown');
//       console.log("done");
//     }
//   }

}
