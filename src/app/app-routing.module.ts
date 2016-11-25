import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituationGeneratorComponent } from './situation-generator/situation-generator.component';
import { SituationGeneratorConfigComponent } from './situation-generator/situation-generator-config.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/situation-generator-config',
    pathMatch: 'full'
  },
  {
    path: 'situation-generator',
    component: SituationGeneratorComponent
  },
  {
    path: 'situation-generator-config',
    component: SituationGeneratorConfigComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
