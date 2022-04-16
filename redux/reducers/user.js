import {USER_STATE_CHANGE, VENUE_STATE_CHANGE, USER_LINE_STATE_CHANGE, USER_LINE_INFO_STATE_CHANGE, USER_FAVORITES_STATE_CHANGE, USER_VENUES_STATE_CHANGE, CLEAR_DATA} from '../constants'

const initialState = {
    currentUser: null,
    lineInfo: {},
    lines: [],
    favorites: [],
    venues: [],
    currentVenue: null,
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case VENUE_STATE_CHANGE:
            return {
                ...state,
                currentVenue: action.currentVenue
            }
        case USER_LINE_STATE_CHANGE:
            return {
                ...state,
                lines: action.lines
            }
        case USER_LINE_INFO_STATE_CHANGE:
                return {
                    ...state,
                    lineInfo: action.lineInfo
                }
                
        case USER_FAVORITES_STATE_CHANGE:
            return {
                ...state,
                favorites: action.favorites
            }
        case USER_VENUES_STATE_CHANGE:
            return {
                ...state,
                venues: action.venues
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}