import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-refresh-dear',
  templateUrl: './refresh-dear.component.html',
  styleUrls: ['./refresh-dear.component.scss']
})
export class RefreshDearComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rr: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get("id"));
    const flag = parseInt(this.route.snapshot.paramMap.get("flag"));

    // console.log(id);
    // console.log(flag);

    switch(flag) { // for admin pages are the odd numbers
      case 10: this.rr.navigateByUrl('/applications'); break;
      case 30: this.rr.navigateByUrl('/userslist'); break;
        // for user pages are the even numbers
      case 20:this.rr.navigateByUrl('/indexuser/+' + id); break;
      case 40:this.rr.navigateByUrl('/personalauctions/+' + id); break;
      case 60:this.rr.navigateByUrl('/personalinfo/+' + id); break;
    }
  }

}
