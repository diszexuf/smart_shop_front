import { Accordion, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AccordionCheck(props) {
    const { title, choices, eventKey, selectedChoices, specificationId, handleCheckboxChange } = props;

    return (
        <>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>
                    {title} {selectedChoices.length > 0 ? `(${selectedChoices.length})` : ''}
                </Accordion.Header>
                <Accordion.Body>
                    <Form>
                        {choices.map((value, index) => (
                            <div key={`default-checkbox-${index}`} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`default-checkbox-${index}`}
                                    label={value}
                                    data-specification_id={specificationId}
                                    onChange={(e) => handleCheckboxChange(e, specificationId, value)}
                                    checked={selectedChoices.includes(value)}
                                />
                            </div>
                        ))}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}

export default AccordionCheck;

AccordionCheck.propTypes = {
    title: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
    eventKey: PropTypes.number.isRequired,
    selectedChoices: PropTypes.array.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    specificationId: PropTypes.number.isRequired, // Добавляем сюда
};
