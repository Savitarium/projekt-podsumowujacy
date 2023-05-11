import {API_URL} from "../config";
//selectors
export const getAllTables = (state) => state.tables;
export const allStatuses = ({ tables }) => {
  const statuses = tables.map(table => table.status);
  return statuses.filter((status, index) => statuses.indexOf(status) === index);
}
export const getTableById = ({tables}, tableId) => tables.find(table => table.id === tableId);
// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE')

// action creators
export const updateTables = payload => ({type: UPDATE_TABLES, payload});
export const editTable = payload => ({type: EDIT_TABLE, payload});
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    case EDIT_TABLE:
      return statePart.map(tables => (tables.id === action.payload.id ? { ...tables, ...action.payload } : tables));
    default:
      return statePart;
  };
};
export default tablesReducer;