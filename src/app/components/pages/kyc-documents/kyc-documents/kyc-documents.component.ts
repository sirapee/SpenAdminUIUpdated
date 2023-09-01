import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { KycDocumentService } from 'src/app/components/services/kycdocumentService/kyc-document.service';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/components/services/store/store.service';

@Component({
  selector: 'app-kyc-documents',
  templateUrl: './kyc-documents.component.html',
  styleUrls: ['./kyc-documents.component.css'],
})
export class KycDocumentsComponent {
  selectedFile: File | null = null;
  userData: any;
  documentForm!: FormGroup;
  isLoading: boolean = false;

  filteredDocuments: any;
  selectedOrganization: '' | string = '';

  form!: FormGroup;

  constructor(
    private kycService: KycDocumentService,
    private notification: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      merchantId: [''],
      merchantDocuments: this.formBuilder.array([]),
      fileType: ['', Validators.required],
    });

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

  async onSelectOrganization(orgId: string): Promise<void> {
    this.spinner.show();
    this.selectedOrganization = orgId;

    try {
      const documentsResponse: any = await this.kycService
        .getDocumentsForOrganization(orgId)
        .toPromise();
      this.filteredDocuments = documentsResponse.documents || [];
    } catch (error) {
      console.error('Error fetching organization documents:', error);
      this.filteredDocuments = [];
    } finally {
      this.spinner.hide();
    }
  }

  downloadFile() {}

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
    this.spinner.show();
    this.kycService.delete(username).subscribe(
      (res: any) => {
        this.notification['success'](res.responseMessage, 'document deleted');
        this.spinner.hide();
        location.reload();
      },
      (error) => {
        console.error('Error deleting document:', error);
        this.notification['error'](
          'An error occurred while deleting the user.'
        );
        this.spinner.hide();
      }
    );
  }

  submit() {
    const userDetailsString = this.store.getUserDetails();
    const userId = JSON.parse(userDetailsString);
    const id = userId.id;
    console.log('grdr', id);

    const merchantId = this.filteredDocuments[0].merchantId;
    console.log('merchantid', merchantId);

    const formData = {
      merchantId: merchantId,
      approveOrReject: this.form.value.approveOrReject,
      comment: this.form.value.comment,
      userId: id,
    };

    if (this.form.valid) {
      this.spinner.show();
      this.kycService.authorize(formData).subscribe(
        (response: any) => {
          if (response.isSuccessful) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.responseMessage,
            }).then(() => {
              this.form.reset();
              location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.responseMessage,
            });
          }
          this.spinner.hide();
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    // Check if the file size exceeds 5MB
    if (file && file.size > 5 * 1024 * 1024) {
      console.error('File size exceeds 5MB. Please select a smaller file.');
    } else {
      this.isLoading = true;

      setTimeout(() => {
        this.selectedFile = file;
        this.isLoading = false;
      }, 2000);
    }
  }

  onSubmitFile(): void {
    if (!this.selectedOrganization) {
      this.notification['error']('Merchant is required!');
      return;
    }

    if (this.documentForm.valid) {
      if (this.selectedFile) {
        if (this.selectedFile.size > 5 * 1024 * 1024) {
          this.notification.info(
            'File size exceeds the limit (5MB). Please select a smaller file.'
          );
          return;
        }

        this.isLoading = true;

        this.getBase64StringFromFile(this.selectedFile, (base64String) => {
          const merchantDocument = {
            filename: this.selectedFile?.name,
            base64String: base64String,
          };

          const requestData = {
            merchantId: this.selectedOrganization,
            merchantDocuments: [merchantDocument],
          };
          this.spinner.show();
          this.kycService.upload(requestData).subscribe(
            (response) => {
              this.notification.success('Documents uploaded successfully:');
              this.spinner.hide();
              this.isLoading = false;
              this.selectedFile = null;
            },
            (error) => {
              this.notification.error('Error uploading documents:');
              this.spinner.hide();
              this.isLoading = false;
            }
          );
        });
      } else {
        this.notification.error('No file selected.');
      }
    } else {
      this.notification.info(
        'Form is not valid. Please fill in all required fields.'
      );
    }
  }

  getBase64StringFromFile(
    file: File,
    callback: (base64String: string) => void
  ): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        callback(base64String);
      }
    };
    reader.readAsDataURL(file);
  }
}
