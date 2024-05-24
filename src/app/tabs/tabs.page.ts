import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  userData: any;

  constructor( private _authService: AuthService) {}
  
  ngOnInit() {
    
    this._authService.userData$.subscribe(data => {
      this.userData = data;
    });

    this._authService.init();
  }

}
