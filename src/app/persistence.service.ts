import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PersistenceService {

    private notes: Note[] = [];
    private counter: number = 0;

    private onNoteAddedSource = new Subject<Note>();
    private onNoteRemovedSource = new Subject<Note>();

    public onNoteAdded$ = this.onNoteAddedSource.asObservable();
    public onNoteRemoved$ = this.onNoteRemovedSource.asObservable();

    constructor() {
        
    }

    public createNote(properties) {
        var note = new Note(properties);
        note.id = ++this.counter;
        return note;
    }

    public saveNote(note: Note) {
        this.notes.push(note);
        this.onNoteAddedSource.next(note);
    }

    public removeNote(note: Note) {
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === note.id) {
                this.notes.splice(i, 1);
                this.onNoteRemovedSource.next(note);
                break;
            }
        }
    }

    public getNotes() {
        return this.notes;
    }

}

const TAGS_REGEX = /".*?"|[^,]*/g;

class Note {

    public id: number;
    public title: string;
    public author: string;
    public tags: string;
    public text: string;

    constructor(properties) {
        if (!properties.title || (properties.title = properties.title.trim()).length == 0) {
            throw 'Debe ingresar un título para la nota';
        }

        if (!properties.author || (properties.author = properties.author.trim()).length == 0) {
            throw 'Debe ingresar un autor para la nota';
        }

        if (!properties.tags || !TAGS_REGEX.test(properties.tags)) {
            throw 'Debe ingresar al menos una etiqueta (separadas por coma)';
        }

        if (!properties.text || (properties.text = properties.text.trim()).length == 0) {
            throw 'Debe ingresar contenido a la nota';
        }

        this.title = properties.title;
        this.author = properties.author;
        this.tags = properties.tags;
        this.text = properties.text;
    }

    public getTagList() {
        return this.tags.match(TAGS_REGEX).map(item => item.trim()).filter(item => item.length > 0).join(', ');
    }

}