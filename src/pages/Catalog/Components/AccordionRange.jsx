import Slider, {Box, Typography} from '@mui/material'

function AccordionRange(props) {
    const { min, max, step, defaultValue, onChange } = props;
    const [value, setValue] = useState(defaultValue);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    return(
        <>
            <Box sx={{ width: 300 }}>
                <Typography id="range-slider" gutterBottom>
                    Price Range: ${50} - ${10}
                </Typography>
                <Slider
                    value={value}
                    min={10}
                    max={50}
                    step={step}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </Box>

            {/*<Slider*/}
            {/*    getAriaLabel={() => 'Minimum distance'}*/}
            {/*    value={value1}*/}
            {/*    onChange={handleChange1}*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*    getAriaValueText={valuetext}*/}
            {/*    disableSwap*/}
            {/*/>*/}
        </>
    )
}

export default AccordionRange;




