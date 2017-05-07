import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Player } from './player';
import { Scenario } from './scenario';
import { Tournament } from './tournament';

@Injectable()
export class SituationService {

  private language:string = 'en';

  private languages:{label: string, name: string}[] = [
    {name: 'en', label: 'English'},
    {name: 'es', label: 'Español'},
    {name: 'fr', label: 'Français'},
    {name: 'it', label: 'Italiano'},
    {name: 'jp', label: '日本語'},
    {name: 'zh', label: '简体中文'}
  ];

  private urls = {
    en: {
      player: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    },
    it: {
      player: 'https://spreadsheets.google.com/feeds/cells/1dQD61k4J9DEH87Lee1ljZ6rWH0wEaXSdNWDk4s0wIeU/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1dQD61k4J9DEH87Lee1ljZ6rWH0wEaXSdNWDk4s0wIeU/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1dQD61k4J9DEH87Lee1ljZ6rWH0wEaXSdNWDk4s0wIeU/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    },
    es: {
      player: 'https://spreadsheets.google.com/feeds/cells/1tz29Dz8GhA57djBoh6XVVR0AVpD1qQgPpr-yiAa2lj8/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1tz29Dz8GhA57djBoh6XVVR0AVpD1qQgPpr-yiAa2lj8/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1tz29Dz8GhA57djBoh6XVVR0AVpD1qQgPpr-yiAa2lj8/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    },
    fr: {
      player: 'https://spreadsheets.google.com/feeds/cells/1z0l4JlOTWkFOyZ8FzSXldk8cwLeqKA55yeuEI8muJnU/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1z0l4JlOTWkFOyZ8FzSXldk8cwLeqKA55yeuEI8muJnU/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1z0l4JlOTWkFOyZ8FzSXldk8cwLeqKA55yeuEI8muJnU/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    },
    zh: {
      player: 'https://spreadsheets.google.com/feeds/cells/1rORT95kUpOf_CHxVmrTvnPaAU-9XF4auFrEki_ypSZs/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1rORT95kUpOf_CHxVmrTvnPaAU-9XF4auFrEki_ypSZs/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1rORT95kUpOf_CHxVmrTvnPaAU-9XF4auFrEki_ypSZs/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    },
    jp: {
      player: 'https://spreadsheets.google.com/feeds/cells/1y1ZTb8UZAr7MZoSc5CODgDoCNy_21-Jh1Z8q95QbAi0/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      tournament: 'https://spreadsheets.google.com/feeds/cells/1y1ZTb8UZAr7MZoSc5CODgDoCNy_21-Jh1Z8q95QbAi0/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
      scenario: 'https://spreadsheets.google.com/feeds/cells/1y1ZTb8UZAr7MZoSc5CODgDoCNy_21-Jh1Z8q95QbAi0/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
    }
  };

  private requests = {
    player: {},
    tournaments: {},
    scenarios: {}
  };

  constructor (private jsonp: Jsonp) {}

  setLanguage (language: string)  {
    if (this.urls[language] && this.language != language) {
      this.language = language;
    }
  }

  getLanguage (): string {
    return this.language;
  }

  getLanguages (): object[] {
    return this.languages;
  }

  getPlayer (): Observable<Player> {
    if(!this.requests.player[this.language]) {
      this.requests.player[this.language] = new ReplaySubject(1);
    }
    if(!this.requests.player[this.language].observers.length) {
      this.jsonp.get(this.urls[this.language].player)
        .map(this.parsePlayer.bind(this))
        .catch(this.handleError)
        .subscribe(
          player => this.requests.player[this.language].next(player),
          error => this.requests.player[this.language].error(error)
        );
    }
    return <Observable<Player>> this.requests.player[this.language].asObservable();
  }

  private parsePlayer (res: Response): Player {
    const body = res.json();
    const player: Player = new Player();
    this.parseSpreadsheet(body).forEach((row) => player.import(row));
    return player;
  }

  getScenarios (): Observable<Scenario[]> {
    if(!this.requests.scenarios[this.language]) {
      this.requests.scenarios[this.language] = new ReplaySubject(1);
    }
    if(!this.requests.scenarios[this.language].observers.length) {
      this.jsonp.get(this.urls[this.language].scenario)
        .map(this.parseScenarios.bind(this))
        .catch(this.handleError)
        .subscribe(
          scenarios => this.requests.scenarios[this.language].next(scenarios),
          error => this.requests.scenarios[this.language].error(error)
        );
    }
    return <Observable<Scenario[]>> this.requests.scenarios[this.language].asObservable();
  }

  private parseScenarios (res: Response): Scenario[] {
    const body = res.json();
    const scenarios: Scenario[] = [];
    this.parseSpreadsheet(body).forEach((row) => scenarios.push(new Scenario(row)));
    return scenarios;
  }

  getTournaments (): Observable<Tournament[]> {
    if(!this.requests.tournaments[this.language]) {
      this.requests.tournaments[this.language] = new ReplaySubject(1);
    }
    if(!this.requests.tournaments[this.language].observers.length) {
      this.jsonp.get(this.urls[this.language].tournament)
        .map(this.parseTournaments.bind(this))
        .catch(this.handleError)
        .subscribe(
          tournaments => this.requests.tournaments[this.language].next(tournaments),
          error => this.requests.tournaments[this.language].error(error)
        );
    }
    return <Observable<Tournament[]>> this.requests.tournaments[this.language].asObservable();
  }

  private parseTournaments (res: Response): Tournament[] {
    const body = res.json();
    const tournaments: Tournament[] = [];
    this.parseSpreadsheet(body).forEach((row) => tournaments.push(new Tournament(row)));
    return tournaments;
  }

  private parseSpreadsheet (body: any): Array<Object> {
    let response = [];
    if(body.feed && body.feed.entry.length) {
      const columns = {};
      body.feed.entry.forEach((entry) => {
        if(entry['gs$cell']) {
          const cell = entry['gs$cell'];
          if(cell.row == 1) {
            columns[cell.col] = cell['$t'];
          } else {
            cell.row -= 2;
            if(!response[cell.row]) response[cell.row] = {};
            response[cell.row][columns[cell.col]] = cell['$t'];
          }
        }
      });
    }
    return response;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
