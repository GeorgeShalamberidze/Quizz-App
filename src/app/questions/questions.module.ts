import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
  ],
})
export class QuestionsModule {}
