import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectMessagingComponent } from './direct-messaging/direct-messaging.component';
import { GamesComponent } from './games/games.component';
import { SplashComponent } from './splash/splash.component';
import { SmNavComponent } from './sm-nav/sm-nav.component';
import { MdNavComponent } from './md-nav/md-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectMessagingComponent,
    GamesComponent,
    SplashComponent,
    SmNavComponent,
    MdNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
