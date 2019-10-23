import axios from'axios'

export const TYPES = {
    MODIFIE_COLUM: 'MODIFIE_COLUM',
    DELETE_COLUM: 'DELETE_COLUM',
    ADD_COLUMN: 'ADD_COLUMN',
    CART_ITEMS_UPDATED: 'CART_ITEMS_UPDATED',
    GET_STARTING_PAGE_DATA: 'GET_STARTING_PAGE_DATA',
};
const baseUrl ='http://localhost/workspace/generic_crud_php/'
const modifieColum = (newData,index) => {
    return {
        type: TYPES.MODIFIE_COLUM,
        newData,
        index
    }
}
const deleteColum  = (index) => {
    return {
        type: TYPES.DELETE_COLUM,
        index
    }
}
const addColumn=(newdata)=>{
    return{
        type:TYPES.ADD_COLUMN,
        newdata
    }
}
const getStartingPageData=()=>{
    return function (dispatch){
        axios.get(baseUrl+'index.php', {
            params: {
                requestType:"getStartingPageData",
                tableName:"questions"
            }
          })
          .then(function (response) {
            dispatch({
                type:TYPES.GET_STARTING_PAGE_DATA,
                payload: {
                    tableStructure: response.data.tableStructure,
                    data: response.data.page1Data,
                }
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
            console.log("finally");

          }); 
    }
    
   
}
export {modifieColum,deleteColum,addColumn,getStartingPageData}