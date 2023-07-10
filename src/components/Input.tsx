import styles from '../css/input.module.css'

const Input = (props: any) => {
  return (
    <div className={styles.container}>
        <label htmlFor="" className={props.labelClass}>{props.labelText}</label>
        <input type={props.inputType} 
        onChange={e => {props.onChange(e.target.value)}} 
        defaultValue={props.defaultValue}
        className={props.inputClass} />
      </div>
  )
}

export default Input