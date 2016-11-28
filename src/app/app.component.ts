import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'judge-toolbox',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor(private router:Router, private route:ActivatedRoute) {}

  ngOnInit() {
    // get title from current route
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.route.firstChild.data.subscribe(({title}) =>
          this.title = title ? ' - '+title:''
        );
      });
  }
}
