import { Store } from '../store/store'
import { Event } from './Event'

export class EventStore extends Store<Event> {
  public constructor() {
    super(Event, { name: 'events' })
  }
}
