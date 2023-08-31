import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/authentication/services/token.service';
import Swal from 'sweetalert2';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email: any;
  firstname: any;
  lastname: any;
  userDetails: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService,
    private notification: ToastrService,
    private store: StoreService,
  ) {}

  ngOnInit(): void {
 

    

    const userDetailsString = this.store.getUserDetails(); 
    this.userDetails = JSON.parse(userDetailsString); 
    this.email = this.userDetails.email;
    this.firstname = this.userDetails.firstName;
    this.lastname = this.userDetails.lastName;


    // console.log(this.userDetails.username);
  }

  logout(): void {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      // this.spinner.show();
      if (result.isConfirmed) {
        this.tokenService.logout();
        this.spinner.hide();
      
      }
    });

  }
  

}
