import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table';
import { Input } from 'reactstrap';
import { socketConnID } from '../Sockets/socketio';
import { normalFetch } from '../Fetch/Fetch';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../Table/table.css';

function TableUI(props) {
    const changeValue = (itemState, id) => {
        let updatedState = "";
        let maara = document.getElementById(`keratty/${id}`).value;
        if (maara === "") {
            maara = document.getElementById(`keratty/${id}`).placeholder
        }
        switch (itemState) {
            case "Odottaa keräystä":
                updatedState = "Keräyksessä"
                break;
            case "Keräyksessä":
                updatedState = "Kerätty"
                break;
            case "Kerätty":
                updatedState = "Ei ole"
                break;
            case "Ei ole":
                updatedState = "Odottaa keräystä"
                break;
            default:
                break;
        }
        normalFetch(`products/patch/id/` + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify([
                {
                    propName: "keratty",
                    value: updatedState,
                },
                {
                    propName: "kerattymaara",
                    value: maara
                }
            ])
        })

        socketConnID(props.id, true);
    }
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Tuote</Th>
                    <Th>Kerätään</Th>
                    <Th>Keräyspiste</Th>
                    <Th>Lisätietoa</Th>
                    <Th>Keräämässä</Th>
                    <Th>Kerätty määrä</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.products.map((item) => {
                    return (
                        <Tr key={item._id}>
                            <Td>{item.kukka}</Td>
                            <Td>{item.toimi}</Td>
                            <Td>{item.kerays}</Td>
                            <Td>{item.lisatieto}</Td>
                            <Td className="inputTable">
                                <Input
                                    className={item.keratty === "Odottaa keräystä" ? "ok" : item.keratty === "Keräyksessä" ? "kss" : item.keratty === "Kerätty" ? "k" : item.keratty === "Ei ole" ? "eo" : "kss"}
                                    onClick={() => changeValue(item.keratty, item._id)}
                                    type="button"
                                    value={item.keratty}>
                                </Input>
                            </Td>
                            <Td className="inputValueTable"><Input type="number" className="tableText" id={`keratty/${item._id}`} placeholder={item.kerattymaara}></Input></Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}

export default TableUI;