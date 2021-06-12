import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Input, Label } from 'reactstrap'

class TextAreaReact extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { id, placeholder, value, onChangeMessageValue } = this.props;
        return (
            <Form>
                <FormGroup>
                    {/* <Label for="exampleText">Text Area</Label> */}
                    <Input 
                        type="textarea" 
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChangeMessageValue} />
                </FormGroup>
        </Form>
        )
    }
}

TextAreaReact.propTypes = {

}

export default TextAreaReact