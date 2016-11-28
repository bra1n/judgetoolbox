import { Component, OnInit } from '@angular/core';
import { SituationService } from './situation.service';
import { Player } from './player';
import { Scenario } from './scenario';
import { Tournament } from './tournament';
import { Router } from '@angular/router';

@Component({
  selector: 'situation-generator-config',
  templateUrl: './situation-generator-config.component.html',
  styleUrls: ['./situation-generator-config.component.scss']
})
export class SituationGeneratorConfigComponent implements OnInit {

  private players: Player[] = [];
  private scenarios: Scenario[] = [];
  private tournaments: Tournament[] = [];

  private playerA: Player = null;
  private playerB: Player = null;
  private scenario: Scenario = null;
  private tournament: Tournament = null;

  constructor(private situationService: SituationService, private router: Router) { }

  ngOnInit() {
    this.situationService.getPlayers()
      .subscribe(players => this.players = players);

    this.situationService.getScenarios()
      .subscribe(scenarios => this.scenarios = scenarios);

    this.situationService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  onSubmit() {
    let scenario: number = Math.round(Math.random() * this.scenarios.length) - 1;
    if (this.scenario) { // scenarios are selected by a common type name, so pick one at random
      const subScenarios: Scenario[] = this.scenarios.filter(elem => elem.title == this.scenario.title);
      scenario = this.scenarios.indexOf(subScenarios[Math.round(Math.random() * (subScenarios.length - 1))]);
    }
    const playerA: number = this.playerA ? this.players.indexOf(this.playerA) : Math.round(Math.random() * (this.players.length - 1));
    const playerB: number = this.playerB ? this.players.indexOf(this.playerB) : Math.round(Math.random() * (this.players.length - 1));
    const tournament: number = this.tournament ? this.tournaments.indexOf(this.tournament) : Math.round(Math.random() * (this.tournaments.length - 1));

    this.router.navigate(['/situation-generator', {scenario, playerA, playerB, tournament}]);
  }

}
