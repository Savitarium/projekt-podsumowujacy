import {getAllTables} from "../../redux/tablesRedux";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {useSelector} from "react-redux";
import AppButton from "../common/Button";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
const Home = () => {
    const tables = useSelector(getAllTables);
    return (
        <div>
            <Row>
                <Col>
                    <h1>All Tables</h1>
                </Col>
            </Row>
            <Container>
            {tables.map(table =>
                <Row key={table.id} className="mt-4 mb-4 rounded d-flex">
                    <Col md={8}>
                        <Row>
                            <Col md={2}>
                                <h2>Table {table.id}</h2>
                            </Col>
                            <Col md={6} className="d-flex">
                                <p className="my-auto"><strong>Status: {table.status}</strong></p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="d-flex justify-content-end align-items-center">
                        <Link to={`/table/${table.id}`}>
                            <AppButton>Show more</AppButton>
                        </Link>
                    </Col>
                    <hr style={{ margin: '20px 0 0 0' }}/>
                </Row>
            )}
            </Container>
        </div>
    )
}
export default Home;