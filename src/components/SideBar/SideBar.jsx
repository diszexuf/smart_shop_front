import {Accordion, Button} from 'react-bootstrap';
import './Sidebar.css';
import PropTypes from 'prop-types';
import AccordionCheck from '../AccordionCheck/AccordionCheck.jsx';
import {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import PriceForm from "../AccordionPrice/PriceForm.jsx";

const apiUrl = `https://localhost:8081/api/v1/products`;
const filtersUrl = `${apiUrl}/filters`;
const productListUrl = `${apiUrl}/all_products`;

function SideBar(props) {
    const {categoryIdSB} = props;

    const [filters, setFilters] = useState([]);
    const [prices, setPrices] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${filtersUrl}?categoryId=${categoryIdSB}`);
                const data = await response.json();
                data.forEach(filter => filter.values.sort((a,b) => parseInt(a) - parseInt(b)));

                const allPrices = data.find(val => val.title === "Цена").values.map(elem => parseInt(elem));
                setPrices([allPrices[0], allPrices[allPrices.length - 1] ]);

                setFilters(data.filter(item => item.title !== 'Цена'));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [categoryIdSB]);

    const handleCheckboxChange = (event, specificationId, value) => {
        setSelectedChoices(prev => {
            const newChoices = [...prev];
            const filterIndex = newChoices.findIndex(filter => filter.specificationId === specificationId);

            if (filterIndex >= 0) {
                if (event.target.checked) {
                    newChoices[filterIndex].values.push(value);
                } else {
                    newChoices[filterIndex].values = newChoices[filterIndex].values.filter(choice => choice !== value);
                    if (newChoices[filterIndex].values.length === 0) {
                        newChoices.splice(filterIndex, 1);
                    }
                }
            } else if (event.target.checked) {
                newChoices.push({specificationId, values: [value]});
            }

            return newChoices;
        });
    };

    const resetCheckboxes = () => {
        setSelectedChoices([]);
    };

    async function findProducts() {
        const params = new URLSearchParams();
        params.append('categoryId', categoryIdSB);

        for (const choice of selectedChoices) {
            let i = 0;
            for (const value of choice.values) {
                params.append(`specifications[${choice.specificationId}][${i++}]`, value);
            }
        }

        const url = `${productListUrl}?${params.toString()}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log('products with filters', data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='sidebar'>
            <PriceForm
                title="Цена"
                minPrice={prices[0]}
                maxPrice={prices[1]}
            />

            <Accordion defaultActiveKey={['0']} alwaysOpen>


                {filters.map((filter, index) => (
                    <AccordionCheck
                        key={index}
                        specificationId={filter.specificationsId}
                        eventKey={index}
                        title={filter.title}
                        choices={filter.values}
                        selectedChoices={selectedChoices.find(choice => choice.specificationId === filter.specificationsId)?.values || []}
                        handleCheckboxChange={(event, specificationId, value) => handleCheckboxChange(event, specificationId, value)}
                    />
                ))}
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

