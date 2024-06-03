import { Accordion, Button } from 'react-bootstrap';
import './Sidebar.css';
import PropTypes from 'prop-types';
import AccordionCheck from './AccordionCheck.jsx';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

function SideBar(props) {
    const { categoryIdSB } = props;
    const [filters, setFilters] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/products/filters?categoryId=${categoryIdSB}`);
                const data = await response.json();
                setFilters(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [categoryIdSB]);

    const handleCheckboxChange = (event, filterTitle, value) => {
        setSelectedChoices(prev => {
            const newChoices = { ...prev };
            if (event.target.checked) {
                if (!newChoices[filterTitle]) {
                    newChoices[filterTitle] = [];
                }
                newChoices[filterTitle].push(value);
            } else {
                newChoices[filterTitle] = newChoices[filterTitle].filter(choice => choice !== value);
            }
            console.log(selectedChoices)
            return newChoices;
        });
    };

    const resetCheckboxes = () => {
        setSelectedChoices({});
    };

    // TODO запрос на выдачу товаров, удовлетворяющих фильтрам
    function findProducts() {
        return 0;
    }

    return (
        <div className='sidebar'>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {filters.map((filter, index) => {
                    const uniqueChoices = [...new Set(filter.values)];
                    return (
                        <AccordionCheck
                            key={index}
                            eventKey={index}
                            title={filter.title}
                            choices={uniqueChoices}
                            selectedChoices={selectedChoices[filter.title] || []}
                            handleCheckboxChange={(event, value) => handleCheckboxChange(event, filter.title, value)}
                        />
                    );
                })}
            </Accordion>
            <Box className="content m-3 d-flex justify-content-center">
                <Button className="m-3" variant="success" onClick={findProducts}>Подобрать</Button>{' '}
                <Button className="m-3" variant="secondary" onClick={resetCheckboxes}>Очистить</Button>{' '}
            </Box>
        </div>
    );
}

export default SideBar;

SideBar.propTypes = {
    categoryIdSB: PropTypes.string.isRequired,
};
