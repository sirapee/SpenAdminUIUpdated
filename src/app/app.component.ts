import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IdleService } from './authentication/services/idle.service';
import { TokenService } from './authentication/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sidePro';
  constructor(
    private idleService: IdleService,
    private tokenService: TokenService,
  ){
    this.loadScripts()
  }

  ngOnInit(): void {
    // this.initialIdleSettings();
  }

  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      'assets/js/modernizr-2.8.3.min.js',
      'assets/js/jquery.min.js',
      'assets/js/popper.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/owl.carousel.min.js',
      'assets/js/metisMenu.min.js',
      'assets/js/jquery.slimscroll.min.js',
      'assets/js/jquery.slicknav.min.js',
      'assets/vendors/am-charts/js/ammap.js',
      'assets/vendors/am-charts/js/worldLow.js',
      'assets/vendors/am-charts/js/continentsLow.js',
      'assets/vendors/am-charts/js/light.js',
      'assets/js/am-maps.js',
      'assets/vendors/charts/float-bundle/jquery.flot.js',
      'assets/vendors/charts/float-bundle/jquery.flot.pie.js',
      'assets/vendors/charts/float-bundle/jquery.flot.resize.js',
      'assets/vendors/charts/sparkline/easy-pie-chart.js',
      'assets/vendors/charts/sparkline/sparklines.js',
      'assets/vendors/apex/js/apexcharts.min.js',
      'assets/js/home.js',
      'assets/js/main.js',
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
 }

  // private initialIdleSettings() {
  //   const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 60;
  //   this.idleService.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
  //     if (isTimeOut) {
  //         this.tokenService.logout()
  //     }
  //   });
  // }
}
