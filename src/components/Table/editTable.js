import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table';
import { useState, useEffect } from 'react';
import { Input, Button } from 'reactstrap';
import { socketConnID } from '../Sockets/socketio';
import { normalFetch } from '../Fetch/Fetch';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../Table/table.css';

function EditTable(props) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        setItems(() => props.item.products)
    }, [])

    const deleteOrder = async (id) => {
        await normalFetch('products/delete/id/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
        socketConnID(props.item._id, true);
        let filtered = items.filter((item) => {
            return item._id !== id
        })
        setItems([...filtered]);
    }

    const updateOrder = () => {
        items.map((item) => {
            let kukka = document.getElementById(`kukka/${item._id}`).value;
            let toimi = document.getElementById(`toimi/${item._id}`).value;
            let kerays = document.getElementById(`kerays/${item._id}`).value;
            let lisatieto = document.getElementById(`lisatieto/${item._id}`).value;

            if (kukka.length < 1) {
                kukka = item.kukka;
                console.log(item.kukka)
            }
            if (toimi.length < 1) {
                toimi = item.toimi;
            }
            if (kerays.length < 1) {
                kerays = item.kerays;
            }
            if (lisatieto.length < 1) {
                lisatieto = item.lisatieto;
            }

            normalFetch('products/put/id/' + item._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    kukka: kukka,
                    toimi: toimi,
                    kerays: kerays,
                    lisatieto: lisatieto
                })
            })
        });
        socketConnID(props.item._id, true);
    }

    if (items !== null) {
        return (
            <>
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
                        {items.map((item) => {
                            return (
                                <Tr key={item._id}>
                                    <Td><Input id={`kukka/${item._id}`} placeholder={item.kukka} /></Td>
                                    <Td><Input id={`toimi/${item._id}`} placeholder={item.toimi} /></Td>
                                    <Td>
                                        <Input id={`kerays/${item._id}`} type="select" defaultValue={item.kerays}>
                                            <option>Ryönä</option>
                                            <option>Tuusjärvi</option>
                                        </Input>
                                    </Td>
                                    <Td className="editInformation">
                                        <Input id={`lisatieto/${item._id}`} placeholder={item.lisatieto} />
                                        <Button className="deleteButton" onClick={() => deleteOrder(item._id)}>X</Button>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                <Button onClick={() => updateOrder()}>Update</Button>
            </>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default EditTable;