import styles from '../css/input.module.css'

interface Props {
  labelText: string,
  inputType: string,
  onChange: React.Dispatch<React.SetStateAction<string>>,
  defaultValue?: string,
  labelClass?: string,
  inputClass?: string
}

const Input: React.FC<Props> = ({ labelText, inputType, onChange, defaultValue, labelClass, inputClass }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="" className={labelClass}>{labelText}</label>
      <input type={inputType}
        onChange={e => { onChange(e.target.value) }}
        defaultValue={defaultValue}
        className={inputClass} />
    </div>
  )
}

export default Input