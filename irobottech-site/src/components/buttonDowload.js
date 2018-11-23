import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class DropdownPage extends React.Component {
  render() {
    return (
      <Dropdown size = "sm">
        <DropdownToggle caret color="dark">
          DESCARGAS
        </DropdownToggle>
        <DropdownMenu caret color="primary">
          <DropdownItem  href="/download/formularioEstudiante.pdf">Descargar Folmulario Estudiante</DropdownItem>
         <DropdownItem href="/download/CurriculumDePersonal.zip">Decargar currículum de personal</DropdownItem>
          {/*<DropdownItem href="#">Something else here</DropdownItem>
          <DropdownItem href="#">Something else here</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
export default DropdownPage;




