// import {Accordion, Button} from 'react-bootstrap';
// import './Sidebar.css';
// import PropTypes from 'prop-types';
// import AccordionCheck from '../AccordionCheck/AccordionCheck.jsx';
// import {useState, useEffect} from 'react';
// import {Box} from '@mui/material';
//
// function SideBar(props) {
//     const {categoryIdSB} = props;
//     const [filters, setFilters] = useState([]);
//     const [selectedChoices, setSelectedChoices] = useState({});
//
//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await fetch(`http://localhost:8081/api/v1/products/filters?categoryId=${categoryIdSB}`);
//                 const data = await response.json();
//                 setFilters(data);
//                 console.log(data);
//             } catch (error) {
//                 console.log(error);
//             }
//         })();
//     }, [categoryIdSB]);
//
//     const handleCheckboxChange = (event, filterTitle, value) => {
//         setSelectedChoices(prev => {
//             const newChoices = {...prev};
//             if (event.target.checked) {
//                 if (!newChoices[filterTitle]) {
//                     newChoices[filterTitle] = [];
//                 }
//                 newChoices[filterTitle].push(value);
//             } else {
//                 newChoices[filterTitle] = newChoices[filterTitle].filter(choice => choice !== value);
//             }
//             console.log(selectedChoices)
//             return newChoices;
//         });
//     };
//
//     const resetCheckboxes = () => {
//         setSelectedChoices({});
//     };
//
//     // TODO запрос на выдачу товаров, удовлетворяющих фильтрам
//     async function findProducts() {
//         const queryParams = {
//             categoryId : categoryIdSB,
//
//         }
//
//         const specificationId = 1;
//         queryParams[`specifications[][${specificationId}]`] = "256";
//
//         console.log('queryParams', queryParams);
//
//         const queryString = new URLSearchParams(queryParams).toString();
//         const url = `http://localhost:8081/api/v1/products/all_products?${queryString}`;
//
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log('data', data);
//         } catch (error) {
//             console.log(error);
//         }
//
//         // todo исправить добавление
//         console.log('Finding products with filters:', selectedChoices);
//     }
//
//     return (
//         <div className='sidebar'>
//             <Accordion defaultActiveKey={['0']} alwaysOpen>
//                 {filters.map((filter, index) => (
//                     < AccordionCheck
//                         key={index}
//                         specificationId={filter.specificationsId}
//                         eventKey={index}
//                         title={filter.title}
//                         choices={filter.values}
//                         selectedChoices={selectedChoices[filter.title] || []}
//                         handleCheckboxChange={(event, value) => handleCheckboxChange(event, filter.title, value)}
//                     />
//                 ))}
//             </Accordion>
//             <Box className="content m-3 d-flex justify-content-center">
//                 <Button className="m-3" variant="success" onClick={findProducts}>Подобрать</Button>{' '}
//                 <Button className="m-3" variant="secondary" onClick={resetCheckboxes}>Очистить</Button>{' '}
//             </Box>
//         </div>
//     );
// }
//
// export default SideBar;
//
// SideBar.propTypes = {
//     categoryIdSB: PropTypes.string.isRequired,
// };

import {Accordion, Button} from 'react-bootstrap';
import './Sidebar.css';
import PropTypes from 'prop-types';
import AccordionCheck from '../AccordionCheck/AccordionCheck.jsx';
import {useState, useEffect} from 'react';
import {Box} from '@mui/material';

const apiUrl = `http://localhost:8081/api/v1/products`;
const filtersUrl = `${apiUrl}/filters`;
const productListUrl = `${apiUrl}/all_products`;

function SideBar(props) {
    const {categoryIdSB} = props;
    const [filters, setFilters] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${filtersUrl}?categoryId=${categoryIdSB}`);
                const data = await response.json();
                setFilters(data);
                console.log(data);
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
                newChoices.push({ specificationId, values: [value] });
            }

            return newChoices;
        });
    };

    const resetCheckboxes = () => {
        setSelectedChoices([]);
    };

    // TODO запрос на выдачу товаров, удовлетворяющих фильтрам
    async function findProducts() {
        const params = new URLSearchParams();
        params.append('categoryId', categoryIdSB);

        for(const choice of selectedChoices) {
            for(const value of choice.values) {
                params.append(`specifications[${choice.specificationId}]`, value);
            }
        }

        const url = `${productListUrl}?${params.toString()}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('data', data);
        } catch (error) {
            console.log(error);
        }

        console.log('Finding products with filters:', selectedChoices);
    }

    return (
        <div className='sidebar'>
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

