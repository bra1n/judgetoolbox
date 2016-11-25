import { Component, OnInit } from '@angular/core';
import { SituationService } from "./situation.service";
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';
import { Scenario } from './scenario';
import { Tournament } from './tournament';

@Component({
  selector: 'situation-generator',
  templateUrl: './situation-generator.component.html',
  styleUrls: ['./situation-generator.component.css']
})
export class SituationGeneratorComponent implements OnInit {

  private players: Player[] = [];
  private scenarios: Scenario[] = [];
  private tournaments: Tournament[] = [];

  private scenarioId: number;
  private playerAId: number;
  private playerBId: number;
  private tournamentId: number;

  constructor(
    private situationService: SituationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.scenarioId = +params['scenario'];
      this.playerAId = +params['playerA'];
      this.playerBId = +params['playerB'];
      this.tournamentId = +params['tournament'];
    });

    this.situationService.getPlayers()
      .subscribe(players => this.players = players);

    this.situationService.getScenarios()
      .subscribe(scenarios => this.scenarios = scenarios);

    this.situationService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

}
