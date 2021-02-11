import React, { useState } from 'react';
import { Card, CardBody, CardText, Button, Input } from 'reactstrap';
import { socketConnChat } from '../Sockets/socketio';
import { normalFetch } from '../Fetch/Fetch';
import EditTable from '../Table/editTable';
import Dialog from '../Dialog/dialog';
import TableUI from '../Table/table';
import 'bootstrap/dist/css/bootstrap.css';
import './card.css';


function CardTable(props) {
    const [dialog, setDialog] = useState(false);
    const [dialogItems, setDialogItems] = useState(null);

    const DeleteOrder = async (item) => {
        item.products.map(async (product) => {
            await normalFetch('products/delete/id/' + product._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            })
        })

        await normalFetch('orders/delete/id/' + item._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        console.log("Order deleted!")
        socketConnChat();
    }

    return (
        <>
            {props.items.map((item) => (
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
                        <Button onClick={() => setDialogItems(item) + setDialog(true)}>Edit</Button>
                        <Button onClick={() => DeleteOrder(item)}>Delete</Button>
                    </CardBody>
                </Card>
            ))}
            {dialog ? <Dialog isOpen={dialog} onLoad={false} onClose={() => setDialog(false)}>
                <Card>
                    <div className="dialogMainData">
                        <div className="dialogDateData">
                            <div>
                                <CardText>Keräyspäivämäärä</CardText>
                                <Input placeholder={dialogItems.date}></Input>
                                <Input onChange={(e) => console.log("f")} value={dialogItems.kauppa} placeholder={dialogItems.kauppa}></Input>
                            </div>
                            <div>
                                <CardText>Toimituspäivämäärä</CardText>
                                <Input placeholder={dialogItems.toimituspvm}></Input>
                            </div>
                        </div>
                        <div>
                            <Input onChange={(e) => console.log("F")} value={dialogItems.alisatieto} type="textarea"></Input>
                            <Input onChange={(e) => console.log("F")} value={dialogItems.ostotilaus} placeholder={"Ostotilaus"}></Input>
                        </div>
                    </div>
                    <EditTable item={dialogItems} />
                </Card>
            </Dialog> : null}
        </>
    )
}

export default CardTable;