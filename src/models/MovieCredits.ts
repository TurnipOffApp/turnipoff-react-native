import {Cast} from './Cast';
import {Crew} from './Crew';

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
