import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table';
import { Button, Card, CardText, Input } from "reactstrap";
import NavData from "../components/NavData/navData";
import Dialog from '../components/Dialog/dialog';
import { socketConnID } from '../components/Sockets/socketio';
import { normalFetch } from '../components/Fetch/Fetch';
import "../navigationBar/nav.css";

function Nav() {
    const [Open, setOpen] = useState(false);
    const [Block, setBlock] = useState("nothing");
    const [Close, setClose] = useState("closedNav");
    const [dialog, setDialog] = useState(false);
    const [newFlowers, setNewFlowers] = useState(1);
    const [newTable, setNewTable] = useState(null);

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



    const closeAndCreate = async () => {
        let i;
        let arrayOfIds = [];
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

        let newTableData = await normalFetch('orders/get/id/' + checkdata.createdOrder._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })

        socketConnID(checkdata.createdOrder._id, false);
        setNewTable(newTableData);
        setBlock("nothing");
        setClose("closedNav");
        setOpen(false);
        setDialog(true);
    }

    return (
        <div className="navBar">
            <Button onClick={() => setOpen(!Open)}>OPEN</Button>
            <div className={Close}>
                <div className="navSide">
                    <NavData close={closeAndCreate} />
                </div>
            </div>
            <div className={Block} />
            {newTable !== null ? <Dialog isOpen={dialog} onLoad={false} onClose={() => setDialog(false) + setNewFlowers(1)}>
                <Card className="dialogNav">
                    <div className="dialogMainData">
                        <div className="dialogDateData">
                            <div>
                                <CardText>Keräyspäivämäärä</CardText>
                                <Input placeholder={newTable.date}></Input>
                                <Input placeholder={newTable.kauppa}></Input>
                            </div>
                            <div>
                                <CardText>Toimituspäivämäärä</CardText>
                                <Input placeholder={newTable.toimituspvm}></Input>
                            </div>

                        </div>
                        <div>
                            <Input type="textarea" placeholder={newTable.alisatieto}></Input>
                            <Input placeholder={"Ostotilaus"}></Input>
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
                            <Button className="createFlowersButton">Lisää kukka</Button>
                            <Input onChange={(e) => setNewFlowers(e.target.value)} value={newFlowers} min={1} max={10} className="createFlowersInput" type="number"></Input>
                        </div>
                        <Button onClick={() => setNewFlowers(1)}>Luo taulukko</Button>
                    </div>
                </Card>
            </Dialog> : null}
        </div>
    )
}

export default Nav;