import React from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import TableUI from '../Table/table';
import 'bootstrap/dist/css/bootstrap.css';
import './card.css';

function CardTable(props) {
    return props.items.map((item) => (
        <Card key={item._id} className="text-dark">
            <div className="cardTableOrder">
                <div className="cardTitles">
                    <CardText>Keräyspäivämäärä: {item.date}</CardText>
                    <CardText>{item.kauppa}</CardText>
                    <CardText>{item._id}</CardText>
                </div>
                <div className="cardLisatiedot">
                    <CardText>{item.alisatieto}</CardText>
                    <CardText>{item.orderLisatieto}</CardText>
                </div>
            </div>
            <CardBody className="border rounded">
                <TableUI products={item.products} id={item._id} />
                <Button>Delete</Button>
            </CardBody>
        </Card>
    ))
}

export default CardTable;