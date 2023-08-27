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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService,
    private notification: ToastrService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.email = this.store.getUserDetails().username;
    this.firstname = this.store.getUserDetails().firstName;
    this.lastname = this.store.getUserDetails().lastName;
    console.log(this.email);
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
      if (result.isConfirmed) {
        this.tokenService.logout();
        // You can also navigate to the login page or perform any other action after logging out.
      }
    });

  }
  

}
