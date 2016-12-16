import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Player } from './player';
import { Scenario } from './scenario';
import { Tournament } from './tournament';

@Injectable()
export class SituationService {

  private urls = {
    player: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/1/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
    tournament: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/2/public/values?alt=json-in-script&callback=JSONP_CALLBACK',
    scenario: 'https://spreadsheets.google.com/feeds/cells/1PWfCiMOd1_cdB6q2gEscadySCVCGyEvSVPpDasjhwSg/3/public/values?alt=json-in-script&callback=JSONP_CALLBACK'
  };

  private requests = {
    player: new ReplaySubject(1),
    tournaments: new ReplaySubject(1),
    scenarios: new ReplaySubject(1)
  };

  constructor (private jsonp: Jsonp) {}

  getPlayer (): Observable<Player> {
    if(!this.requests.player.observers.length) {
      this.jsonp.get(this.urls.player)
        .map(this.parsePlayer.bind(this))
        .catch(this.handleError)
        .subscribe(
          player => this.requests.player.next(player),
          error => this.requests.player.error(error)
        );
    }
    return <Observable<Player>> this.requests.player.asObservable();
  }

  private parsePlayer (res: Response): Player {
    const body = res.json();
    const player: Player = new Player();
    this.parseSpreadsheet(body).forEach((row) => player.import(row));
    return player;
  }

  getScenarios (): Observable<Scenario[]> {
    if(!this.requests.scenarios.observers.length) {
      this.jsonp.get(this.urls.scenario)
        .map(this.parseScenarios.bind(this))
        .catch(this.handleError)
        .subscribe(
          scenarios => this.requests.scenarios.next(scenarios),
          error => this.requests.scenarios.error(error)
        );
    }
    return <Observable<Scenario[]>> this.requests.scenarios.asObservable();
  }

  private parseScenarios (res: Response): Scenario[] {
    const body = res.json();
    const scenarios: Scenario[] = [];
    this.parseSpreadsheet(body).forEach((row) => scenarios.push(new Scenario(row)));
    return scenarios;
  }

  getTournaments (): Observable<Tournament[]> {
    if(!this.requests.tournaments.observers.length) {
      this.jsonp.get(this.urls.tournament)
        .map(this.parseTournaments.bind(this))
        .catch(this.handleError)
        .subscribe(
          tournaments => this.requests.tournaments.next(tournaments),
          error => this.requests.tournaments.error(error)
        );
    }
    return <Observable<Tournament[]>> this.requests.tournaments.asObservable();
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
