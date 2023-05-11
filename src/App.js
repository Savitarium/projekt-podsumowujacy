import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/views/Footer";
import Header from "./components/views/Header";
import {useDispatch} from "react-redux";
import {updateTables} from "./redux/tablesRedux";
import {useEffect, useState} from "react";
import Loader from "./components/common/Loader";
import {API_URL} from "./config";

function App() {
    const dispatch = useDispatch();
    const [connecting, setConnecting] = useState(false)
    const fetchTables = () => {
        setConnecting(true);
        fetch(API_URL)
            .then(res => {
                if (res.status === 200) {
                    return res.json().then(tables => {
                        dispatch(updateTables(tables));
                        setConnecting(false);
                    });
                } else {
                    throw new Error('Nie udało się pobrać danych.');
                }
            })
            .catch(error => {
                console.error(error);
                setConnecting(false);
            });
    }
    useEffect(fetchTables, [dispatch]);
  return (
    <Container>
      <Header />
        {connecting ? <Loader /> : null}
        { !connecting &&
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/table/:id' element={<Table />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        }
      <Footer />
    </Container>
  );
}

export default App;
