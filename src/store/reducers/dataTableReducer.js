import { testTableData, testTableDataColumn } from '../../testdata.js'
import * as actions from '../actions/dataTable';

const initState = {
    data: null,
    tableStructure: null,
    column: [...testTableDataColumn],

}
const DataTableReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MODIFIE_COLUM':{
                let newData = action.newData
                let tab = state.data
                tab[action.index] = newData
                return {
                    ...state,
                    data: [...tab]
                }
            }

        case 'DELETE_COLUM':{
                let index = action.index
                let table = state.data
                table.splice(index, 1)
                return {
                    ...state,
                    data: [...table]
                }
            }

        case 'ADD_COLUMN':{
                let tabl = state.data
                tabl.push(action.newdata)
                return {
                    ...state,
                    data: [...tabl]
                }
            }

        case actions.TYPES.GET_STARTING_PAGE_DATA:{
                return {
                    ...state,
                    tableStructure: action.payload.tableStructure,
                    data: action.payload.data
                }
            }
            
        default:{
            return{...state}
            }
           
    }
}
export default DataTableReducer