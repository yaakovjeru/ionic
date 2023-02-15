import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: Form1Component,
    pathMatch: 'full',
  },{
    path: 'form1',
    component: Form1Component,
    pathMatch: 'full',
  },{
    path: 'form2',
    component: Form2Component,
    pathMatch: 'full',
    data: { animationState: 'One' },
  }, {
    path: 'chat',
    component: ChatComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
