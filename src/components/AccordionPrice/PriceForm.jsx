import {Form} from "react-bootstrap";

function PriceForm(props) {
    const {title, minPrice, maxPrice, handleMinPriceChange, handleMaxPriceChange} = props;

    const onHandleMinPriceChange = (event) => {
        handleMinPriceChange(event.target.value);
    };

    const onHandleMaxPriceChange = (event) => {
        handleMaxPriceChange(event.target.value);
    };

    return (
        <div className='mb-3'>
            <h5 className='text-start'>{title}</h5>

            <div className='d-flex justify-content-around align-items-center'>
                <Form.Label className='m-1'>от</Form.Label>
                <Form.Control
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={minPrice}
                    step="10"
                    id="priceFrom"
                    placeholder={minPrice}
                    onChange={onHandleMinPriceChange}
                />

                <Form.Label className='m-1'>до</Form.Label>
                <Form.Control
                    type="number"
                    min={minPrice}
                    max={maxPrice}
                    value={maxPrice}
                    step="10"
                    id="priceTo"
                    placeholder={maxPrice}
                    onChange={onHandleMaxPriceChange}
                />

            </div>
        </div>
    )
}

export default PriceForm;