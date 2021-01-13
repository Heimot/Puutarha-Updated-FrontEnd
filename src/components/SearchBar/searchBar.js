import { Button, Input } from "reactstrap";
import { useState } from 'react';
import '../SearchBar/searchBar.css';

function SearchBar(props) {
    let [searchValue, setSearchValue] = useState({ search: "", searchOption: "Kukka" });

    const searchOnChange = (e) => {
        let { name, value } = e.target;
        setSearchValue({ ...searchValue, [name]: value });
    }

    return (
        <div>
            <div className="search">
                <Input onChange={(e) => searchOnChange(e)} className="selectSearchOption" type="select" name="searchOption">
                    <option>Kukka</option>
                    <option>Kauppa</option>
                </Input>
                <Input name="search" onChange={(e) => searchOnChange(e) + props.stop(e.target.value)} value={searchValue.search} ></Input>
                <Button className="searcBtn" onClick={() => props.search(searchValue)}>Etsi</Button>
            </div>
        </div>
    )
}

export default SearchBar;