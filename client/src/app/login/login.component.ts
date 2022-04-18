import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() cancelLogin = new EventEmitter();
  model: any = {};
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.cancelLogin.emit(false);
  }

  login(){
    this.accountService.login(this.model).subscribe( () => this.accountService.sendClickEvent());
  }

}
