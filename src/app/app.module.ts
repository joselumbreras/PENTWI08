import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesComponent } from './notes.component';
import { FormComponent } from './form.component';
import { TableComponent } from './table.component';

import { PersistenceService } from './persistence.service';

@NgModule({
  declarations: [
    NotesComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [PersistenceService],
  bootstrap: [NotesComponent]
})
export class AppModule { }
