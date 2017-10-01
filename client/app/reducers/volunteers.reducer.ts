import { Volunteer } from '../models/volunteer';
import * as VolunteerActions from '../actions/volunteers.actions'

export interface State {
  volunteers: Volunteer[];
  filtered: Volunteer[];
  filteredByPetName: Volunteer[];
  filteredUniqueNames: string[];
  filteredHasManyWithSameName: boolean;
}

export const initialState: State = {
  volunteers: [],
  filtered: [],
  filteredByPetName: [],
  filteredUniqueNames: [],
  filteredHasManyWithSameName: false
};

export type Action = VolunteerActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case VolunteerActions.LOAD: {
      return Object.assign({}, state, {
        volunteers: action.payload
      });
    }

    case VolunteerActions.ADD: {
      return Object.assign({}, state, {
        volunteers: [action.payload, ...state.volunteers]
      });
    }

    case VolunteerActions.MODIFY: {
      return Object.assign({}, state, {
        volunteers: state.volunteers.map(volunteer => {
          return volunteer._id === action.payload._id ? action.payload : volunteer;
        })
      });
    }

    /**
     * Filters volunteers by comparing against first and last names.
     * action.payload is a string for name.
     */
    case VolunteerActions.FILTER_BY_NAME: {
      const name: string = action.payload;
      const filtered: Volunteer[] = state.volunteers.filter(volunteer =>
        this.formatName(volunteer).toLowerCase().includes(name.toLowerCase()));
      const uniqueNames: string[] = getUniqueNames(filtered);
      return Object.assign({}, state, {
        filtered: filtered,
        filteredUniqueNames: uniqueNames,
        filteredHasManyWithSameName: filtered.length > 1 && uniqueNames.length === 1
      });
    }

    /**
     * Filters volunteers by comparing against first and last names.
     * action.payload is a string for petName.
     */
    case VolunteerActions.FILTER_BY_PET_NAME: {
      const petName: string = action.payload;
      return Object.assign({}, state, {
        filteredByPetName: state.volunteers.find(volunteer => volunteer.petName === petName)
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * Gets unique names from an array of volunteers.
 * @param volunteers
 */
const getUniqueNames = (volunteers: Volunteer[]): string[] => {
  return Array.from(new Set(volunteers.map(volunteer => this.formatName(volunteer))))
};

/**
 * Formats the name of a volunteer as one string.
 * @param volunteer
 * @returns {string}
 */
const formatName = (volunteer: Volunteer): string => {
  return `${volunteer.firstName} ${volunteer.lastName}`;
};
