import { Accordion, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AccordionCheck(props) {
    const { title, choices, eventKey, selectedChoices, handleCheckboxChange } = props;

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
                                    onChange={(e) => handleCheckboxChange(e, value)}
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
};
