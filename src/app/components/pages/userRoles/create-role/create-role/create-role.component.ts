// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/components/services/roleService/role.service';
// import { ElNotificationService } from 'element-angular';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {

  rolesForm: FormGroup;

  constructor(private fb: FormBuilder, private roleService : RoleService, private notification: ToastrService, private spinner : NgxSpinnerService) {
    this.rolesForm = this.fb.group({
      roleName: ['', Validators.required],
      roleCategory: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // async submit() {
  //   if (this.rolesForm.valid) {
  //     this.spinner.show();
  //     try {
  //       const response: any = await this.roleService.createRole(this.rolesForm.value).toPromise();
  
  //       if (response.isSuccessful) {
  //         this.notification.success(response.responseMessage);
       
  //         setTimeout(() => {
  //           this.rolesForm.reset();
  //           this.spinner.hide();
  //           window.location.reload();
  //         }, 0);
  //       } else {
  //         this.notification.error(response.responseMessage);
  //         this.spinner.hide();
  //       }
  //     } catch (error:any) {
  //       this.notification.error(error.error.responseMessage || error.error.message);
  //       console.error('Role creation error:', error);
  //       this.spinner.hide();
  //     }
  //   } else {
  //     this.notification.error('Please fill in all fields.');
  //     this.spinner.hide();
  //   }
  // }





    submit() {
    
      if (this.rolesForm.valid) {
        this.spinner.show();
        this.roleService.createRole(this.rolesForm.value).subscribe(
          (response: any) => {
            // this.spinner.show();
            if (response.issucessFul) {
              this.notification.success(response.responseMessage);
              this.rolesForm.reset();
              this.spinner.hide();
              location.reload();
            } else {
              this.notification.error(response.responseMessage);
              this.spinner.hide();
            }
          },
          (error) => {
            this.notification.error(error.error.responseMessage || error.error.message);
            console.error('Organization creation error:', error);
            this.spinner.hide();
          }
        );
      } else {
        this.notification.error('Please fill in all fields.');
        this.spinner.hide();
      }
    }
  }
  
  


