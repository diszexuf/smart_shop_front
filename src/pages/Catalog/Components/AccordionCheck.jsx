import {Accordion, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import SideBar from "./SideBar.jsx";

function AccordionCheck(props) {
    const {title, choices} = props;
    return (
        <>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        {choices.map((value, index) => (
                            <div key={`default-checkbox-${index}`} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`default-checkbox-${index}`}
                                    label={value}
                                />
                            </div>
                        ))}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

export default AccordionCheck;

AccordionCheck.propTypes = {
    title: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
}