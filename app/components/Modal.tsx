import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import cls from '@/styles/modal.module.css';


export function Modal() {
  const [key, setKey] = useState('');
  const [keyDirty, setKeyDirty] = useState(false);
  const [keyError, setKeyError] = useState('Пользователь не найден');
  const [formValid, setFormValid] = useState(false);

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'key':
        setKeyDirty(true);
        break;
    }
  }
  
  useEffect(() => keyError && keyDirty ? setFormValid(true) : setFormValid(false), [keyError, keyDirty]);

  const keyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    setKeyDirty(true);
    if(e.target.value.length)  {
      setKeyError('Пользователь не найден');
    }else {
      setKeyError('');
    }
  }
  
  return (
    <div className={cls.modal}>
      <div className={cls.modalTitle}>Введите цифровой ключ</div>
      <form action="/" className={cls.modalForm}>
        <div className={cls.modalFormField}>
          <label htmlFor="key">Цифровой ключ</label>
          <input type="text" onChange={e => keyHandler(e)} className={keyDirty && keyError ? cls.modalFormInputError : ''} value={key}  name="key" placeholder="Введите ваш цифровой ключ" />
          {keyDirty && keyError && <div className={cls.modalFormError}>{keyError}</div>}
        </div>
        <button disabled={!formValid} type="submit">Войти</button>
      </form>
    </div>
  );
}
