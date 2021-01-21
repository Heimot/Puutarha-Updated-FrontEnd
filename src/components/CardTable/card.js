import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import TableUI from '../Table/table';
import 'bootstrap/dist/css/bootstrap.css';

function CardTable(props) {
    return props.items.map((item) => (
            <Card key={item._id} className="text-dark">
                <CardTitle>{item.kauppa}</CardTitle>
                <CardText>{item._id}</CardText>
                <CardBody className="border rounded">
                    <TableUI products={item.products} id={item._id} />
                </CardBody>
            </Card>
    ))
}

export default CardTable;