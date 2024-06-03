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
        <Container className="mt-3 min-vh-100">
            <h1>Как добраться?</h1>
            <Box className="how-to-arrive ">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box className="description-address m-2 text-start">
                        <p>
                            Наш адрес:
                            <br/>
                            пр. Ленина, д. 132
                            <br/>
                            Челябинск, Россия, 469012
                        </p>
                        <p>
                            Часы работы:
                            <br/>
                            Понедельник - Пятница: 10:00 - 20:00
                            <br/>
                            Суббота: 10:00 - 18:00
                            <br/>
                            Воскресенье: выходной
                        </p>
                        <p>
                            Контактный телефон: +7 (495) 123-45-67
                            <br/>
                            Электронная почта: info@smartshop.com
                        </p>
                    </Box>
                    <MapContainer className='map-container m-2' center={position} zoom={13}
                                  style={{height: '300px', width: '50%'}}>
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

            <Box className="how_to_get_order" display="flex" justifyContent="space-between">
                <Box className="make-order-steps">

                    <PlaceIcon className="icon">
                        Приехать в магазин Белая Техника, выбранный при оформлении заказа на сайте
                    </PlaceIcon>
                    <MessageIcon className="icon"/> Назвать номер заказа продавцу
                    <PaymentIcon className="icon"/> Оплатить
                    <CheckCircleOutlineIcon className="icon"/> Забрать товар
                </Box>
                <Box className="make-order-image">
                    <Image src={OrderImage} alt="order image" />
                </Box>
            </Box>


        </Container>
    );
}

export default Addresses;
