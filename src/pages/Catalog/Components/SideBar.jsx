import {Accordion, Form} from 'react-bootstrap';
import './Sidebar.css'
import PropTypes from "prop-types";
import AccordionCheck from "./AccordionCheck.jsx";
import {useState, useEffect} from "react";

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
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className='sidebar'>

            <Accordion defaultActiveKey={['0']} alwaysOpen>

                <Accordion.Item eventKey="0">
                    <Accordion.Header>Цена</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>

                {/*<AccordionCheck title={FILTERS[0].title} choices={FILTERS[0].values} />*/}


            </Accordion>

            <div>
                <h1>Filters</h1>
                <ul>
                    {filters.map((filter, index) => (
                        <li key={index}>{filter.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SideBar;

SideBar.propTypes = {
    categoryIdSB: PropTypes.string.isRequired,
}


