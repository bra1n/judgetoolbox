import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SituationService } from './situation-generator/situation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'judge-toolbox',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  private language: string;
  private languages: object[];

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private titleService:Title,
    private situationService: SituationService,
    private translate: TranslateService
  ) {
    let language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    this.situationService.setLanguage(language.substr(0, 2).toLocaleLowerCase());

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.situationService.getLanguage());
  }

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

    this.languages = this.situationService.getLanguages();
  }

  onLanguageChange() {
    if (this.language) {
      this.situationService.setLanguage(this.language);
      this.translate.use(this.language);
    }
  }
}
