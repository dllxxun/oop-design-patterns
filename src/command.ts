import { LockerFacade } from './facade'

export interface Command {
    execute(): string
}

export class LockCommand implements Command {
    private facade: LockerFacade
    private lockerId: string

    constructor(facade: LockerFacade, lockerId: string) {
        this.facade = facade
        this.lockerId = lockerId
    }

    execute(): string {
        return this.facade.lock(this.lockerId)
    }
}

export class UnlockCommand implements Command {
    private facade: LockerFacade
    private lockerId: string

    constructor(facade: LockerFacade, lockerId: string) {
        this.facade = facade
        this.lockerId = lockerId
    }

    execute(): string {
        return this.facade.unlock(this.lockerId)
    }
}

export class UpdateNoteCommand implements Command {
    private facade: LockerFacade
    private lockerId: string
    private note: string

    constructor(facade: LockerFacade, lockerId: string, note: string) {
        this.facade = facade
        this.lockerId = lockerId
        this.note = note
    }

    execute(): string {
        return this.facade.updateNote(this.lockerId, this.note)
    }
}

export class Invoker {
    private history: string[] = []

    run(command: Command): string {
        const result = command.execute()
        this.history.push(result)
        return result
    }

    getHistory(): string[] {
        return this.history
    }
}
