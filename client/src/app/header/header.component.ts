import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe( { 
      next: (v) => this.router.navigate(['/products']),
      error: (e) => console.log(e)});
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

}
