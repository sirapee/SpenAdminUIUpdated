import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  reloadPage(): void {
   
    this.router.navigate(['/main']).then(() => {
      window.location.reload();
    });
  }

}
