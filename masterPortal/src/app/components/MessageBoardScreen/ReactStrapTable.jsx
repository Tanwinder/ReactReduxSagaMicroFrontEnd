import React from 'react';
import { Table, Input } from 'reactstrap';

export default class ReactStrapTable extends React.Component {
  render() {
    const { appMessages, onDeleteMessages, onClickUpdateMessage, onUpdateMessageValue, updateMessageValue, onSaveUpdateMessage } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th width="5%">#</th>
            <th width="20%">App Name</th>
            <th width="65%">Message</th>
            <th width="10%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            !!appMessages ?
            appMessages.map((ac, i) => {
              return(
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{ac.displayName}</td>
                  <td>
                  {
                     ac.editMode ? 
                      <Input 
                        type="text" 
                        value={updateMessageValue}
                        onChange={e => onUpdateMessageValue(e)}/>
                      :
                      ac.message
                  }
                  </td>
                  <td className="message_board_actions">
                    {
                      updateMessageValue === undefined ?
                      <i 
                      style={{color: true ? "gray" : "lightgray", cursor: 'pointer'}} 
                      className="fas fa-pen"
                      onClick={ e => onClickUpdateMessage(ac)}></i>
                      :
                      <i 
                      style={{color: !!updateMessageValue ? "gray" : "lightgray", cursor: 'pointer'}} 
                      className="fas fa-save"
                      onClick={ e => !!updateMessageValue && onSaveUpdateMessage(ac)}></i>
                    }
                    <i 
                      style={{color: updateMessageValue === undefined ? "gray" : "lightgray", cursor: 'pointer'}} 
                      className="fas fa-trash"
                      onClick={e => updateMessageValue === undefined && onDeleteMessages(ac)}
                    >
                    </i>
                  </td>
                </tr>
              )
            })
            :
            ""
          }
        </tbody>
      </Table>
    );
  }
}