import { Component, Input, OnInit } from '@angular/core';
import { MembersService } from 'src/app/shared/members.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-view-order-user',
  templateUrl: './view-order-user.component.html',
  styleUrls: ['./view-order-user.component.css']
})
export class ViewOrderUserComponent implements OnInit {

  @Input() selectedOrder: Order;
  user: any;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.memberService.getMember(this.selectedOrder.userId).subscribe(user => this.user = user);
  }

}
