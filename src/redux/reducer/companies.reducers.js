const initialState = {
  gettingCompanies: false,
  companiesData: [],
}

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COMPANIES_REQUEST':
      return {
        ...state,
        gettingCompanies: true,
      }
    case 'GET_COMPANIES_SUCCSESS':
      return {
        ...state,
        gettingCompanies: false,
        companiesData: action.payload,
      }
    case 'GET_COMPANIES_FAILURE':
      return {
        ...state,
        gettingCompanies: false,
      }

    case 'CREATE_COMPANY_SUCCSESS':
      return {
        ...state,
        companiesData: [...state.companiesData, action.payload],
      }
    case 'CREATE_COMPANY_FAILURE':
      return {
        ...state,
      }

    case 'EDIT_COMPANY_SUCCSESS':
      const lastData = state.companiesData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        editData: [...lastData, action.payload],
      }
    case 'EDIT_COMPANY_FAILURE':
      return {
        ...state,
      }

    case 'REMOVE_COMPANY_SUCCSESS':
      const filtered = state.companiesData.filter(
        elem => elem.id !== action.payload
      )
      return {
        ...state,
        companiesData: [...filtered],
      }
    case 'REMOVE_COMPANY_FAILURE':
      return {
        ...state,
      }
    default:
      return state
  }
}
