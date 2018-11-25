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
          <DropdownItem  className="nav-link d-none d-md-inline" href="/download/formularioEstudiante.pdf">
            Descargar Folmulario Estudiante
          </DropdownItem>
          <DropdownItem className="nav-link d-none d-md-inline" href="/download/CurriculumDePersonal.zip">
            Descargar currículum de personal
          </DropdownItem>
          {/*<DropdownItem href="#">Something else here</DropdownItem>
          <DropdownItem href="#">Something else here</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>



    );
  }
}
export default DropdownPage;
