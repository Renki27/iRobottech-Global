import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";

class DropdownPage extends React.Component {
  render() {
    return (
      <Dropdown>
        <DropdownToggle nav caret>
          Descargas
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem  className="nav-link d-none d-md-block" href="/download/formularioEstudiante.pdf">
            Folmulario de registro para estudiantes
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>



    );
  }
}
export default DropdownPage;
