import { Locker } from './prototype'

export class LockerFacade {
    private lockers: Map<string, Locker>

    constructor(lockers: Map<string, Locker>) {
        this.lockers = lockers
    }

    lock(id: string): string {
        const locker = this.lockers.get(id)
        if (!locker) return `Locker ${id} not found.`
        if (locker.locked) return `${locker.name} is already locked.`
        locker.locked = true
        return `${locker.name} locked.`
    }

    unlock(id: string): string {
        const locker = this.lockers.get(id)
        if (!locker) return `Locker ${id} not found.`
        if (!locker.locked) return `${locker.name} is already unlocked.`
        locker.locked = false
        return `${locker.name} unlocked.`
    }

    updateNote(id: string, note: string): string {
        const locker = this.lockers.get(id)
        if (!locker) return `Locker ${id} not found.`
        locker.note = note
        return `Note saved for ${locker.name}.`
    }
}