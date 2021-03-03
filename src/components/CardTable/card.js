import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, Button, Input } from 'reactstrap';
import { socketConnChat } from '../Sockets/socketio';
import { normalFetch } from '../Fetch/Fetch';
import EditTable from '../Table/editTable';
import Dialog from '../Dialog/dialog';
import TableUI from '../Table/table';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import './card.css';


function CardTable(props) {
    const [dialog, setDialog] = useState(false);
    const [dialogItems, setDialogItems] = useState(null);
    const [orderValues, setOrderValues] = useState({ "kpvm": "", "tpvm": "", "kauppa": "", "lisatieto": "", "ostotilaus": "" });
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (dialogItems !== null) {
            setOrderValues({ "kpvm": dialogItems.date, "tpvm": dialogItems.toimituspvm, "kauppa": dialogItems.kauppa, "lisatieto": dialogItems.lisatieto, "ostotilaus": dialogItems.ostotilaus })
            let dateS = dialogItems.date.split('/');
            let newDate = `${dateS[1]}/${dateS[0]}/${dateS[2]}`;
            setDate(new Date(newDate));
        }
    }, [dialogItems])

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
                                <DatePicker className="datePicker" value={dialogItems.date} selected={date} onChange={(date) => setDate(date)} />
                                <Input name="kauppa" onChange={(e) => setOrderValues({ ...orderValues, [e.target.name]: e.target.value })} placeholder={dialogItems.kauppa}></Input>
                            </div>
                            <div>
                                <CardText>Toimituspäivämäärä</CardText>
                                <Input placeholder={dialogItems.toimituspvm}></Input>
                            </div>
                        </div>
                        <div>
                            <Input name="lisatieto" onChange={(e) => setOrderValues({ ...orderValues, [e.target.name]: e.target.value })} placeholder={dialogItems.alisatieto} type="textarea"></Input>
                            <Input name="ostotilaus" onChange={(e) => setOrderValues({ ...orderValues, [e.target.name]: e.target.value })} placeholder={dialogItems.orderLisatieto}></Input>
                        </div>
                    </div>
                    <EditTable item={dialogItems} order={orderValues} close={() => setDialog(false)} />
                </Card>
            </Dialog> : null}
        </>
    )
}

export default CardTable;