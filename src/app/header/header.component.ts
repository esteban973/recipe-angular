import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashService } from '../flash.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  flashMessage: string;

  constructor(private flashService: FlashService) { }

  ngOnInit() {
      this.subscription= this.flashService.flashBag.subscribe(
        (text: string)=>{
           console.log(text); 
           this.flashMessage=text;
           setTimeout(()=>{
            this.flashMessage=undefined;
           }, 2000);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
