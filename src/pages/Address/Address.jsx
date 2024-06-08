import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Container, Image} from "react-bootstrap";
import {Box} from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import MessageIcon from '@mui/icons-material/Message';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './Address.css'
import OrderImage from '/src/assets/adresses_pic.svg'

const position = [55.159, 61.365];

function Addresses() {
    return (
        <Container className="mt-3 min-vh-100 d-flex align-items-center justify-content-center">
            <Box className='adress-block'>
                <h1>Как добраться?</h1>
                <Box className="how-to-arrive ">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box className="description-address m-2 text-start" style={{fontSize: 20}}>
                            <p>
                                <b>Наш адрес:</b>
                                <br/>
                                пр. Ленина, д. 132
                                <br/>
                                Челябинск, Россия, 469012
                            </p>
                            <p>
                                <b>Часы работы:</b>
                                <br/>
                                Понедельник - Пятница: 10:00 - 20:00
                                <br/>
                                Суббота: 10:00 - 18:00
                                <br/>
                                Воскресенье: выходной
                            </p>
                            <p>
                                <b>Контактный телефон:</b> +7 (495) 123-45-67
                                <br/>
                                <b>Электронная почта:</b> info@smartshop.com
                            </p>
                        </Box>
                        <MapContainer className='map-container m-2' center={position} zoom={13}
                                      style={{height: '400px', width: '70%'}}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>
                                    Наш офис находится здесь.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                </Box>
                <Box className='get-order-frame d-flex justify-content-between'>
                    <Box className="how_to_get_order mt-5 mb-5">
                        <h1>Как забрать заказ?</h1>

                        <Box className="make-order-image d-flex justify-content-center align-content-center">
                            <Image src={OrderImage} alt="order image" style={{width: 400, height: "auto"}}/>
                        </Box>

                        <Box className="make-order-steps">
                            <ul className='mt-5'>
                                <li className='d-flex align-items-center m-3'>
                                    <PlaceIcon style={{fontSize: 60}} className="me-5"/>
                                    <div style={{fontSize: 24, fontWeight: "semibold"}}>Приехать в магазин</div>
                                </li>
                                <li className='d-flex align-items-center m-3'>
                                    <MessageIcon style={{fontSize: 60}} className="me-5"/>
                                    <div style={{fontSize: 24, fontWeight: "semibold"}}>Назвать номер заказа продавцу
                                    </div>
                                </li>
                                <li className='d-flex align-items-center m-3'>
                                    <PaymentIcon style={{fontSize: 60}} className="me-5"/>
                                    <div style={{fontSize: 24, fontWeight: "semibold"}}>Оплатить</div>
                                </li>
                                <li className='d-flex align-items-center m-3'>
                                    <CheckCircleOutlineIcon style={{fontSize: 60}} className="me-5"/>
                                    <div style={{fontSize: 24, fontWeight: "semibold"}}>Забрать товар</div>
                                </li>
                            </ul>
                        </Box>


                    </Box>
                </Box>

            </Box>
        </Container>
    );
}

export default Addresses;
