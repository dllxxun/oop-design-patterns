export class Locker {
    id: string
    name: string
    locked: boolean
    note: string

    constructor(id: string, name = 'Locker', locked = false, note = '') {
        this.id = id
        this.name = name
        this.locked = locked
        this.note = note
    }

    clone(newId: string): Locker {
        return new Locker(newId, this.name + ' (clone)', this.locked, this.note)
    }
}
