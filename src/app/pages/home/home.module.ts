import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { NgxColorsModule } from 'ngx-colors';
import { ColorsComponent } from 'src/app/components/colors/colors.component';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxColorsModule,
  ],
  declarations: [HomePage, ColorsComponent],
})
export class HomePageModule {}
