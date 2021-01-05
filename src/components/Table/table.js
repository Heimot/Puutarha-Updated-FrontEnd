import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../Table/table.css';

function TableUI(props) {
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
                            <Td>{item.keratty}</Td>
                            <Td>{item.kerattymaara}</Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}

export default TableUI;