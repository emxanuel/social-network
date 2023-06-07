import React from 'react'

const Input = (props: any) => {
  return (
    <div>
        <label htmlFor="" className={props.labelClass}>{props.labelText}</label>
        <input type={props.inputType} 
        onChange={e => {props.onChange(e.target.value)}} 
        defaultValue={props.defaultValue}
        className={props.inputClass} />
      </div>
  )
}

export default Input