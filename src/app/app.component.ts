import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'judge-toolbox',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title
  ) {}

  ngOnInit() {
    // get title from current route
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.route.firstChild.data.subscribe(({title}) => {
            this.title = title || 'Judge Toolbox';
            this.titleService.setTitle(this.title);
        });
      });
  }
}
