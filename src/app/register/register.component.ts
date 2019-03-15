import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';


@Component({
  selector: 'fmyp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sharedData: SharedDataService, private router: Router, private userService:UserService) {

  }

  user = { first_name: null, last_name: null, email: this.sharedData.email, year: 'Choose Year', phone: null};

  ngOnInit() {
    if(!this.sharedData.email){
      this.router.navigate(['/login']);
    }
  }


  public register() {
    this.userService.register(this.user).toPromise()
    .then(result => {
      console.log(result);
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      console.log(error);
    });
  }

}
