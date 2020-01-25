import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-nav',
  templateUrl: './md-nav.component.html',
  styleUrls: ['./md-nav.component.css']
})
export class MdNavComponent implements OnInit {

  constructor() { }

  ngOnInit(next()) {
    if (window.screen.width < 361) { 
      this.sm-mobile = true;
      next();
    }
    else-if (window.screen.width < 768) { 
      this.md-mobile = true;
      this.sm -mobile = false;
      next();
    }
    else-if (window.screen.width < 1068) { 
      this.md-screen = true;
      this.md-mobile = false;
      this.sm-mobile = false;
      next();
    }
    else-if (window.screen.width > 1069) { 
      this.lg-screen = true;
      this.md-screen = false;
      this.md-mobile = false;
      this.sm-mobile = false;
      next();
    }
  }

}
