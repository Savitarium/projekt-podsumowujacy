import {getAllTables, updateTables} from "../../redux/tablesRedux";
import {useDispatch, useSelector} from "react-redux";
import Form from 'react-bootstrap/Form';
import {allStatuses} from "../../redux/tablesRedux";
import {getTableById} from "../../redux/tablesRedux";
import {useNavigate, useParams} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import AppButton from "../common/Button";
import {editTable} from "../../redux/tablesRedux";
import {API_URL} from "../../config";
const Table = () => {
    const {id} = useParams();
    const tables = useSelector(getAllTables);
    const tableData = useSelector(state => getTableById(state, id));
    const statuses = ['Busy', 'Cleaning', 'Free', 'Reserved'];
    const [status, setStatus] = useState(tableData?.status);
    const [peopleAmount, setPeopleAmount] = useState(tableData?.peopleAmount);
    const [maxPeople, setMaxPeople] = useState(tableData?.maxPeople);
    const [bill, setBill] = useState(tableData?.bill);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = API_URL;
    const apiFetch = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            status: status,
            peopleAmount: peopleAmount,
            maxPeople: maxPeople,
            bill: bill
        })
    }
    if(tableData === undefined) return <Navigate to="/" />
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        if(status === 'Cleaning' || status === 'Free') {
            setBill('0');
        }
    }
    const handleActivePeopleChange = (event) => {
        const newPeopleAmount = event.target.value;
        if (newPeopleAmount > maxPeople) {
            setPeopleAmount(maxPeople);
        } else if (newPeopleAmount < 0) {
            setPeopleAmount(0);
        } else {
            setPeopleAmount(newPeopleAmount);
        }
    }
    const handleMaxPeopleChange = (event) => {
        const newMaxPeople = event.target.value;
        if (newMaxPeople < peopleAmount) {
            setPeopleAmount(newMaxPeople);
            setMaxPeople(newMaxPeople);
        } else if (newMaxPeople > 10) {
            setMaxPeople(10);
        } else {
            setMaxPeople(newMaxPeople);
        }
    }
    const handleActiveBillChange = (event) => {
        setBill(event.target.value);
    }

    const handleSubmit = () => {
        dispatch(editTable({...tableData, status, peopleAmount, bill}));
        fetch(url + id, apiFetch);
        navigate('/')
    }

    return (
        <div>
            <h1>Table {tableData.id}</h1>
            <div className="d-flex align-items-center mt-5 my-2">
                <p className="my-auto" style={{ width: '50px' }}><strong>Status:</strong></p>
                <div className="ms-3" style={{ width: '25%' }}>
                    <Form.Select value={status} onChange={handleStatusChange}>
                        {statuses.map(status  =>
                            <option key={status} value={status}>{status}</option>
                        )}
                    </Form.Select>
                </div>
            </div>
            <div className="d-flex align-items-center my-2">
                <p className="my-auto" style={{ width: '50px' }}><strong>People</strong></p>
                <div className="ms-3" style={{ width: '45px' }}>
                    <Form.Control value={peopleAmount} onChange={handleActivePeopleChange} type="text" style={{ textAlign: 'center' }} />
                </div>
                <p className="my-auto ms-3">/</p>
                <div className="ms-3" style={{ width: '45px' }}>
                    <Form.Control value={maxPeople} type="text" onChange={handleMaxPeopleChange} style={{ textAlign: 'center' }} />
                </div>
            </div>
            { (status == 'Busy') &&
                <div className="d-flex align-items-center my-2">
                    <p className="my-auto" style={{ width: '50px' }}><strong>Bill:</strong></p>
                    <p className="my-auto ms-3">$</p>
                    <div className="ms-3" style={{ width: '52px' }}>
                        <Form.Control value={bill} onChange={handleActiveBillChange} type="text" style={{ textAlign: 'center' }} />
                    </div>
                </div>
            }
            <AppButton onClick={handleSubmit}>Update</AppButton>
        </div>
    )
}
export default Table;
