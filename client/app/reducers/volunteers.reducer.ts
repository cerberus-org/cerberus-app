import { Volunteer } from '../models/volunteer';
import * as VolunteerActions from '../actions/volunteers.actions'

export interface State {
  volunteers: Volunteer[];
  filtered: Volunteer[];
  filteredUniqueNames: string[];
  filteredHasManyWithSameName: boolean;
  selected: Volunteer,
}

export const initialState: State = {
  volunteers: [],
  filtered: [],
  filteredUniqueNames: [],
  filteredHasManyWithSameName: false,
  selected: null
};

export type Action = VolunteerActions.All;

export function reducer(state = initialState, action: Action): State {

  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case VolunteerActions.LOAD: {
      return Object.assign({}, initialState, {
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
     * Filters volunteers by comparing against first and last names and selects if one remains.
     * action.payload is a string for name.
     */
    case VolunteerActions.FILTER_AND_SELECT_BY_NAME: {
      const name: string = action.payload.toLowerCase();
      const filtered: Volunteer[] = state.volunteers.filter(volunteer =>
        formatName(volunteer).toLowerCase().includes(name));
      const uniqueNames: string[] = getUniqueNames(filtered);
      const hasManyWithSameName: boolean = filtered.length > 1
        && uniqueNames.length === 1
        && uniqueNames[0].toLowerCase() === name;
      const selected: Volunteer = !hasManyWithSameName
        ? filtered.find(volunteer => formatName(volunteer).toLowerCase() === name)
        : null;
      return Object.assign({}, state, {
        filtered: filtered,
        filteredUniqueNames: uniqueNames,
        filteredHasManyWithSameName: hasManyWithSameName,
        selected: selected
      });
    }

    /**
     * Selects a volunteer by petName.
     * action.payload is a string for petName.
     */
    case VolunteerActions.SELECT_BY_PET_NAME: {
      const petName: string = action.payload.toLowerCase();
      return Object.assign({}, state, {
        selected: state.volunteers.find(volunteer => volunteer.petName.toLowerCase() === petName)
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
  return Array.from(new Set(volunteers.map(volunteer => formatName(volunteer))))
};

/**
 * Formats the name of a volunteer as one string.
 * @param volunteer
 * @returns {string}
 */
const formatName = (volunteer: Volunteer): string => {
  return `${volunteer.firstName} ${volunteer.lastName}`;
};
