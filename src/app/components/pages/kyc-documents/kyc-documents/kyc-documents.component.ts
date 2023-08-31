import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { KycDocumentService } from 'src/app/components/services/kycdocumentService/kyc-document.service';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kyc-documents',
  templateUrl: './kyc-documents.component.html',
  styleUrls: ['./kyc-documents.component.css']
})
export class KycDocumentsComponent {
  userData: any;

  filteredDocuments: any;
  selectedOrganization: "" | string = "";



  form!: FormGroup;


  constructor(
    private kycService: KycDocumentService, private notification: ToastrService, private spinner: NgxSpinnerService,private formBuilder: FormBuilder
 
  ) {}

  ngOnInit(): void {
    // this.usersService.userData$.subscribe((data) => {
    //   this.userData = data;
    // });'
    this.form = this.formBuilder.group({
      approveOrReject: ['', Validators.required],
      comment: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
    });
    this.loadData();

    
  }


  loadData() {
    this.spinner.show();
     
  
   
     this.kycService.getMerchants().subscribe(
         (response) => {
      
           this.userData = response;
       
           this.spinner.hide();
     
         },
         (error: any) => {
           console.error('Error fetching reports:', error);
       
           this.spinner.hide();
         }
       );
     }

    //  getDocumentsForOrganization(): void {
    //   console.log('wprodgvf')
    //   if (this.selectedOrganization) {
       
    //     const userArray = this.userData.organizations || [];
        
    //     const selectedOrg = userArray.find((org: any) => org.id === this.selectedOrganization);
    //     this.filteredDocuments = selectedOrg.documents || [];
    //     console.log('tysteztj')
    //   } else {
    //     this.filteredDocuments = [];
    //     console.log('it worked')
    //   }
    // }


    async onSelectOrganization(orgId: string): Promise<void> {
      this.spinner.show();
      this.selectedOrganization = orgId;
    
      try {
        const documentsResponse: any = await this.kycService.getDocumentsForOrganization(orgId).toPromise();
        this.filteredDocuments = documentsResponse.documents || [];
      } catch (error) {
        console.error('Error fetching organization documents:', error);
        this.filteredDocuments = [];
      } finally {
        this.spinner.hide();
      }
    }
    
    areAllDocumentsApproved(): boolean {
      return this.filteredDocuments && this.filteredDocuments.length > 0 && this.filteredDocuments.every((document: any) => document.isApproved);
    }
    

    downloadFile(){

    }
  
    
    confirmDeleteUser(username: string) {
      Swal.fire({
        title: 'Delete User',
        text: `You are about to delete this user, do you want to continue?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(username);
        }
      });
    }
    
    deleteUser(username: string) {
      this.spinner.show()
      this.kycService.delete(username).subscribe(
        (res: any) => {
          this.notification['success'](res.responseMessage, 'document deleted');
          this.spinner.hide();
          location.reload();
         
        },
        (error) => {
          console.error('Error deleting document:', error);
          this.notification['error']('An error occurred while deleting the user.');
          this.spinner.hide();
        }
      );
    }




    
    submit() {
      const userId = this.userData?.organizations?.users?.id;
      const merchantId = this.filteredDocuments?.id;
    
      const formData = {
        merchantId: merchantId,
        approveOrReject: this.form.value.approveOrReject,
        comment: this.form.value.comment,
        userId: userId,
      };
    
      if (this.form.valid) {
        this.spinner.show();
        this.kycService.authorize(formData).subscribe(
          (response: any) => {
            if (response.issucessFul) {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.responseMessage,
              }).then(() => {
                this.form.reset();
                this.spinner.hide();
                location.reload();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.responseMessage,
              });
              this.spinner.hide();
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error.responseMessage || error.error.message,
            });
            this.spinner.hide();
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in all fields.',
        });
        this.spinner.hide();
      }
    }
    

  
    
    }



