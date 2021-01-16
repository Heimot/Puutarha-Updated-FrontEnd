import { Button } from "reactstrap";
import './navData.css';

function NavData() {

    return (
        <div className="navData">
            <div>
                WELCOME!
            </div>
            <Button className="navBtn">Kerättävät</Button>
            <Button className="navBtn">Ryönä</Button>
            <Button className="navBtn">pvm systeemi tähä</Button>
            <Button className="navBtn">Lisää uusi tilaus</Button>
            <Button className="navBtn">Eteneminen</Button>
            <Button className="navBtn">Kirjaudu ulos</Button>
        </div>
    )
}

export default NavData;