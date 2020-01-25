import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DirectMessagingComponent } from "./direct-messaging/direct-messaging.component";
import { MdNavComponent } from "./md-nav/md-nav.component";
import { SplashComponent } from "./splash/splash.component";

const routes: Routes = [
  { path: "messages", component: DirectMessagingComponent },
  { path: "nav", component: MdNavComponent },
  { path: "splash", component: SplashComponent },
  // use a colon and parameter name to include a parameter in the url
  // redirect to /alpha if there is nothing in the url
  { path: "", pathMatch: "full", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
//did u see splash what the fuck
