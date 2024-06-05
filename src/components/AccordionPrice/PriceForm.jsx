import {Form} from "react-bootstrap";

function PriceForm(props) {
    const {title, minPrice, maxPrice} = props;

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
                />

            </div>
        </div>
    )
}

export default PriceForm;