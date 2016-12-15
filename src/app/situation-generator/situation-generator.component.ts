import { Component, OnInit } from '@angular/core';
import { SituationService } from "./situation.service";
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';
import { Scenario } from './scenario';
import { Tournament } from './tournament';

@Component({
  selector: 'situation-generator',
  templateUrl: './situation-generator.component.html',
  styleUrls: ['./situation-generator.component.scss']
})
export class SituationGeneratorComponent implements OnInit {

  private player: Player = new Player();
  private scenarios: Scenario[] = [];
  private tournaments: Tournament[] = [];

  private scenarioId: number;
  private players:{
    name: String,
    type: Number,
    personality: Number,
    guilty: Number,
    opinion: Number
  }[];
  private tournamentId: number;
  private step: number = 1;

  constructor(
    private situationService: SituationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.scenarioId = +params['scenario'];
      this.tournamentId = +params['tournament'];
      this.players = [];
      params['players'].split('--').forEach((playerIds, index) => {
        const player = playerIds.split('-');
        if(player.length == 4) {
          this.players.push({
            name: String.fromCharCode(65 + index),
            type: player[0],
            personality: player[1],
            guilty: player[2],
            opinion: player[3]
          });
        }
      });
    });

    this.situationService.getPlayer()
      .subscribe(player => this.player = player);

    this.situationService.getScenarios()
      .subscribe(scenarios => this.scenarios = scenarios);

    this.situationService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  next() {
    this.step++;
  }

  previous() {
    if(confirm("Are you sure you want to go back?")) {
      this.step--;
    }
  }
}
