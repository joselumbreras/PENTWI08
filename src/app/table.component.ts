import { Component } from '@angular/core';

import { PersistenceService } from './persistence.service';

@Component({
    selector: 'notes-table',
    templateUrl: './table.component.html'
})
export class TableComponent {

    public notes: object[];

    constructor(private persistenceService: PersistenceService) {
        let onNotesChanged = (note) => {
            this.notes = this.persistenceService.getNotes();
        };
        this.persistenceService.onNoteAdded$.subscribe(onNotesChanged);
        this.persistenceService.onNoteRemoved$.subscribe(onNotesChanged);
    }

    public removeNote(note) {
        this.persistenceService.removeNote(note);
    }

}