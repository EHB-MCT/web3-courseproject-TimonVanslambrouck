import { ChoiceComponent } from './choice/choice.component';
import { WorldComponent } from './world/world.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WorldComponent },
  { path: 'choice', component: ChoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
