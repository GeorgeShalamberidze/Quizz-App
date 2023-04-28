import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  { path: 'results', component: ResultsComponent },
  {
    path: 'questions',
    loadChildren: () =>
      import('./questions/questions.module').then((m) => m.QuestionsModule),
  },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
