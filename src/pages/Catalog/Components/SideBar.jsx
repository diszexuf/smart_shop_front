import {Accordion, Button, Form} from 'react-bootstrap';
import './Sidebar.css'
import PropTypes from "prop-types";
import AccordionCheck from "./AccordionCheck.jsx";
import {useState, useEffect} from "react";
import {Box} from "@mui/material";

function SideBar(props) {

    const {categoryIdSB} = props;

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/products/filters?categoryId=${categoryIdSB}`);
                const data = await response.json();
                console.log('data', data)
                setFilters(data);
                console.log(`1 element`, data[0].values);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    return (
        <div className='sidebar'>

            <Accordion defaultActiveKey={['0']} alwaysOpen>

                {filters.map((filter, index) => (
                    <AccordionCheck key={index} eventKey={index} title={filter.title} choices={filter.values}/>

                ))}

            </Accordion>
            <Box className="content m-3 d-flex justify-content-center">
                <Button className="m-3" variant="success">Подобрать</Button>{' '}
                <Button className="m-3" variant="secondary">Очистить</Button>{' '}
            </Box>

        </div>

    )
}

export default SideBar;

SideBar.propTypes = {
    categoryIdSB: PropTypes.string.isRequired,
}


