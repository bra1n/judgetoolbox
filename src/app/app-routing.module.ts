import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituationGeneratorComponent } from './situation-generator/situation-generator.component';
import { SituationGeneratorConfigComponent } from './situation-generator/situation-generator-config.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/random-situation-generator',
    pathMatch: 'full'
  },
  {
    path: 'random-situation',
    component: SituationGeneratorComponent,
    data: {title: 'Random Situation'}
  },
  {
    path: 'random-situation-generator',
    component: SituationGeneratorConfigComponent,
    data: {title: 'Random Situation Generator'}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
