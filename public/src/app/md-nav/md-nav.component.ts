import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-md-nav",
  templateUrl: "./md-nav.component.html",
  styleUrls: ["./md-nav.component.css"]
})
export class MdNavComponent implements OnInit {
  sm_mobile: Boolean;
  md_mobile: Boolean;
  md_screen: Boolean;
  lg_screen: Boolean;

  constructor() {}

  ngOnInit() {
    if (window.screen.width < 361) {
      this.sm_mobile = true;
    } else if (window.screen.width < 768) {
      this.md_mobile = true;
      this.sm_mobile = false;
    } else if (window.screen.width < 1068) {
      this.md_screen = true;
      this.md_mobile = false;
      this.sm_mobile = false;
    } else if (window.screen.width > 1069) {
      this.lg_screen = true;
      this.md_screen = false;
      this.md_mobile = false;
      this.sm_mobile = false;
    }
  }
}
