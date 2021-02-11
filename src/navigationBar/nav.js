import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table';
import { Button, Card, CardText, Input } from "reactstrap";
import NavData from "../components/NavData/navData";
import Dialog from '../components/Dialog/dialog';
import { socketConnChat } from '../components/Sockets/socketio';
import { normalFetch } from '../components/Fetch/Fetch';
import "../navigationBar/nav.css";

let arrayOfIds = [];

function Nav() {
    const [Open, setOpen] = useState(false);
    const [Block, setBlock] = useState("nothing");
    const [Close, setClose] = useState("closedNav");
    const [dialog, setDialog] = useState(false);
    const [newFlowers, setNewFlowers] = useState(1);
    const [newTable, setNewTable] = useState(null);
    const [order, setOrder] = useState("");
    const [kauppa, setKauppa] = useState("");
    const [alisatieto, setAlisatieto] = useState("");
    const [ostotilaus, setOstotilaus] = useState("");

    useEffect(() => {
        if (Open) {
            setBlock("blocked");
            setClose("openNav");
        } else {
            setBlock("nothing");
            setClose("closedNav");
        }
        return () => {
            if (Open) {
                setOpen(false);
            }
        }
    }, [Open])

    const addFlowers = async () => {
        let products = await createProducts();

        await normalFetch('orders/put/id/' + order, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                products: products
            })
        })
        let newTableData = await newTableGetter(order);
        socketConnChat();
        setNewTable(newTableData);
    }

    const createProducts = async () => {
        let i;
        for (i = 0; i < newFlowers; i++) {
            let id = await normalFetch('products/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            })
            arrayOfIds.push(id.createdProduct._id);
        }
        return arrayOfIds;
    }

    const newTableGetter = async (id) => {
        let newTableData = await normalFetch('orders/get/id/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
        return newTableData;
    }

    const closeAndCreate = async () => {
        let arrayOfIds = await createProducts();

        let checkdata = await normalFetch('orders/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                kauppa: "Vakio",
                alisatieto: "",
                date: sessionStorage.getItem("date"),
                toimituspvm: sessionStorage.getItem("date"),
                products: arrayOfIds
            })
        })
        setOrder(checkdata.createdOrder._id);

        let newTableData = await newTableGetter(checkdata.createdOrder._id);

        socketConnChat();
        setNewTable(newTableData);
        setBlock("nothing");
        setClose("closedNav");
        setOpen(false);
        setDialog(true);
    }

    const addValuesToTable = async () => {
        let asiakas = kauppa;
        let asiakaslisatieto = alisatieto;
        let keraysPVM = sessionStorage.getItem("date");
        let toimitusaika = sessionStorage.getItem("date");
        let orderLisatieto = ostotilaus;


        if (asiakas.length < 1) {
            asiakas = newTable.products.kauppa;
        }

        if (asiakaslisatieto.length < 1) {
            asiakaslisatieto = newTable.products.alisatieto;
        }

        if (keraysPVM.length < 1) {
            keraysPVM = newTable.products.date;
        }

        if (toimitusaika.length < 1) {
            toimitusaika = newTable.products.toimituspvm;
        }

        if (orderLisatieto.length < 1) {
            orderLisatieto = newTable.products.orderLisatieto;
        }

        await normalFetch('orders/put/id/' + order, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                kauppa: asiakas,
                alisatieto: asiakaslisatieto,
                date: keraysPVM,
                toimituspvm: toimitusaika,
                orderLisatieto: orderLisatieto
            })
        })
        setDialog(false)
    }

    const updateProducts = async () => {
        async function sendData(kukka, toimi, kerays, lisatieto, id) {
            await normalFetch('products/put/id/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    kukka: kukka,
                    toimi: toimi,
                    kerays: kerays,
                    lisatieto: lisatieto
                }),
            })
        }
        arrayOfIds.map((id) => {
            let kukka = document.getElementById(`kukka/${id}`).value;
            let kerays = document.getElementById(`kerays/${id}`).value;
            let toimi = document.getElementById(`toimi/${id}`).value;
            let lisatieto = document.getElementById(`lisatieto/${id}`).value;
            if (kukka.length < 1) {
                kukka = "vakio";
            }

            if (toimi.length < 1) {
                toimi = 0;
            }

            if (kerays.length < 1) {
                kerays = "Ryönä";
            }

            if (lisatieto.length < 1) {
                lisatieto = "";
            }
            sendData(kukka, toimi, kerays, lisatieto, id)
        })
        socketConnChat();
    }

    const emptyData = () => {
        setKauppa("");
        setAlisatieto("");
        setOstotilaus("");
        setNewFlowers(1)
        arrayOfIds = [];
    }

    return (
        <div className="navBar">
            <Button onClick={() => setOpen(!Open)}>OPEN</Button>
            <div className={Close}>
                <div className="navSide">
                    <NavData close={closeAndCreate} />
                </div>
            </div>
            <div onClick={() => setOpen(false)} className={Block} />
            {newTable !== null ? <Dialog isOpen={dialog} onLoad={false} onClose={() => setDialog(false) + emptyData()}>
                <Card className="dialogNav">
                    <div className="dialogMainData">
                        <div className="dialogDateData">
                            <div>
                                <CardText>Keräyspäivämäärä</CardText>
                                <Input placeholder={newTable.date}></Input>
                                <Input onChange={(e) => setKauppa(e.target.value)} value={kauppa} placeholder={newTable.kauppa}></Input>
                            </div>
                            <div>
                                <CardText>Toimituspäivämäärä</CardText>
                                <Input placeholder={newTable.toimituspvm}></Input>
                            </div>

                        </div>
                        <div>
                            <Input onChange={(e) => setAlisatieto(e.target.value)} value={alisatieto} type="textarea" placeholder={newTable.alisatieto}></Input>
                            <Input onChange={(e) => setOstotilaus(e.target.value)} value={ostotilaus} placeholder={"Ostotilaus"}></Input>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Tuote</Th>
                                <Th>Kerätään</Th>
                                <Th>Keräyspiste</Th>
                                <Th>Lisätietoa</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {newTable.products.map((item) => {
                                return (
                                    <Tr key={item._id}>
                                        <Td><Input id={`kukka/${item._id}`} placeholder={item.kukka}></Input></Td>
                                        <Td><Input id={`toimi/${item._id}`} type="number" placeholder={item.toimi}></Input></Td>
                                        <Td><Input id={`kerays/${item._id}`} type="select" placeholder={item.kerays}>
                                            <option>Ryönä</option>
                                            <option>Tuusjärvi</option>
                                        </Input>
                                        </Td>
                                        <Td><Input id={`lisatieto/${item._id}`} placeholder={item.lisatieto}></Input></Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                    <div className="dialogButtons">
                        <div>
                            <Button onClick={() => addFlowers()} className="createFlowersButton">Lisää kukka</Button>
                            <Input onChange={(e) => setNewFlowers(e.target.value)} value={newFlowers} min={1} max={10} className="createFlowersInput" type="number"></Input>
                        </div>
                        <Button onClick={() => addValuesToTable() + updateProducts() + emptyData()}>Luo taulukko</Button>
                    </div>
                </Card>
            </Dialog> : null}
        </div>
    )
}

export default Nav;