import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersistenceService } from './persistence.service';

@Component({
    selector: 'notes-form',
    templateUrl: './form.component.html',
    styles: [
        'small { color: red; font-weight: bold; font-style: italic; }'
    ]
})
export class FormComponent {

    public notesForm: FormGroup;

    constructor(private persistenceService: PersistenceService, private formBuilder: FormBuilder) {
        this.notesForm = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            tags: ['', Validators.required],
            text: ['', Validators.required]
        });
    }

    public saveNote() {
        try {
            var note = this.persistenceService.createNote(this.notesForm.value);
            this.persistenceService.saveNote(note);
            this.notesForm.reset();
        } catch (error) {
            alert(error);
        }
    }

}