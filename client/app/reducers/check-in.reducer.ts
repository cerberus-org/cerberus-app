import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';
import * as CheckInActions from '../actions/check-in.actions'

export interface State {
  selectedTabIndex: number,
  visits: Visit[];
  volunteers: Volunteer[];
  filteredVolunteers: Volunteer[];
  filteredUniqueNames: string[];
  filteredAllMatchSameName: boolean;
  selectedVisit: Visit;
  selectedVolunteer: Volunteer;
}

export const initialState: State = {
  selectedTabIndex: 0,
  visits: [],
  volunteers: [],
  filteredVolunteers: [],
  filteredUniqueNames: [],
  filteredAllMatchSameName: false,
  selectedVisit: null,
  selectedVolunteer: null
};

export type Action = CheckInActions.All;

export function reducer(state = initialState, action: Action): State {

  if (!action.payload) {
    return state;
  }

  switch (action.type) {

    case CheckInActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        visits: action.payload.visits,
        volunteers: action.payload.volunteers
      });
    }

    case CheckInActions.SUBMIT_NEW_VOLUNTEER_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: [action.payload, ...state.volunteers],
        selectedTabIndex: 0
      });
    }

    /**
     * Filters volunteers by comparing against first and last names and selects if one remains.
     * action.payload is a string for name.
     */
    case CheckInActions.FILTER_AND_SELECT_VOLUNTEERS_BY_NAME: {
      const name: string = action.payload.toLowerCase();
      // Create the list of filtered volunteers by name
      const filtered: Volunteer[] = state.volunteers.filter(volunteer =>
        formatName(volunteer).toLowerCase().includes(name));
      // Create the set of names from the filtered volunteers
      const uniqueNames: string[] = Array.from(new Set(filtered.map(volunteer => formatName(volunteer))));
      // If the filtered volunteers all exactly match the name, set to true
      const allMatchSameName: boolean = filtered.length > 1
        && uniqueNames.length === 1
        && uniqueNames[0].toLowerCase() === name;
      // If one volunteer remains, select the volunteer that exactly matches the name
      const selected: Volunteer = !allMatchSameName
        ? filtered.find(volunteer => formatName(volunteer).toLowerCase() === name)
        : null;
      return Object.assign({}, state, {
        filteredVolunteers: filtered,
        filteredUniqueNames: uniqueNames,
        filteredAllMatchSameName: allMatchSameName,
        selectedVolunteer: selected
      });
    }

    /**
     * Selects a volunteer by petName.
     * action.payload is a string for petName.
     */
    case CheckInActions.SELECT_VOLUNTEER_BY_PET_NAME: {
      const petName: string = action.payload.toLowerCase();
      return Object.assign({}, state, {
        selectedVolunteer: state.volunteers.find(volunteer => volunteer.petName.toLowerCase() === petName)
      });
    }

    case CheckInActions.SELECT_ACTIVE_VISIT_FOR_VOLUNTEER: {
      const volunteer: Volunteer = action.payload;
      return Object.assign({}, state, {
        selectedVisit: volunteer
          ? state.visits.find(visit => visit.endedAt === null && volunteer._id === visit.volunteerId)
          : null
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * Formats the name of a volunteer as one string.
 * @param volunteer
 * @returns {string}
 */
const formatName = (volunteer: Volunteer): string => {
  return `${volunteer.firstName} ${volunteer.lastName}`;
};
