import React from 'react';
import { Form } from 'react-bootstrap';

export default function Textarea(props) {
  return (
    <Form.Group className="mb-3" controlId={props.property}>
        <Form.Label>{props.printer || props.property.charAt(0).toUpperCase() + props.property.slice(1)} :</Form.Label>

        <Form.Control as="textarea" rows={3} name={props.property}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.printer || props.property.charAt(0).toUpperCase() + props.property.slice(1)}
          required={props.required || false}
          className='shadow-0 input-large'
        />
      </Form.Group>
  );
}