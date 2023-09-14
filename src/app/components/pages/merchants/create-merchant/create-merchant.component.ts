import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/components/services/userManagement/users.service';
import { passwordMatchValidator } from 'src/app/authentication/validator/confirm.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/components/services/roleService/role.service';
import { MerchantService } from 'src/app/components/services/merchantService/merchant.service';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.css'],
})
export class CreateMerchantComponent {
  addOrganizationform!: FormGroup;

  adminData: any;

  role: any;

  phoneNumberPattern = /^\+\d{13}$/;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private roleService: RoleService,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.addOrganizationform = this.fb.group(
      {
        merchantName: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],

        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            ),
          ],
        ],
      
        state: ['', Validators.required],
        rcnumber: ['', [Validators.required]],
        businessType:['',[Validators.required]],
        businessCategory:['',[Validators.required]]
      },
      {
        // validators: passwordMatchValidator()
      }
    );

    this.getRole();
  }

  getRole() {
    this.roleService.getRoles().subscribe(
      (res) => {
        this.role = res;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  submit() {
    if (this.addOrganizationform.valid) {
      this.spinner.show();

      // const payload = {
      //   phoneNumber: this.addOrganizationform.value.phoneNumber,
      //   rcNumber: this.addOrganizationform.value.rcnumber,
      //   merchantName: this.addOrganizationform.value.merchantName,
      //   email: this.addOrganizationform.value.email,

      //   firstname: this.addOrganizationform.value.firstname,
      //   businessCategory: this.addOrganizationform.value.businessCategory,
      //   businessType: this.addOrganizationform.value.businessType,
      //   lastname: this.addOrganizationform.value.lastname,
      //   role: this.addOrganizationform.value.role,
      // };

      this.merchantService.createMerchant(this.addOrganizationform.value).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            this.notification.success(response.responseMessage);
            this.addOrganizationform.reset();
            this.spinner.hide();
            location.reload();
          } else {
            this.notification.error(response.responseMessage);
            this.spinner.hide();
          }
        },
        (error) => {
          this.notification.error(
            error.error.responseMessage || error.error.message
          );
          // console.error('Organization creation error:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.notification.error('Please fill in all required fields.');
      this.spinner.hide();
    }
  }
}
