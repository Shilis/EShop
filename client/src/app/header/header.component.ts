import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, take } from 'rxjs';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {}
  user: any;
  subscription: Subscription;

  public isMenuCollapsed = true;

  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });

    this.subscription = this.accountService.getClickEvent().subscribe(() => this.refresh());
  }

  // login() {
  //   this.accountService.login(this.model).subscribe( () => this.ngOnInit());
  // }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
    this.ngOnInit();
  }

  refresh(){
    this.ngOnInit();
    this.subscription.unsubscribe();
  }

}
