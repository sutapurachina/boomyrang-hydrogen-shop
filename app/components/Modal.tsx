import { Form } from "@remix-run/react";
import cls from '@/styles/modal.module.css';

export function Modal() {
  return (
    <div className={cls.modal}>
      <div className={cls.modalTitle}>Введите цифровой ключ</div>
      <form action="/" className={cls.modalForm}>
        <div className={cls.modalFormField}>
          <label htmlFor="key">Цифровой ключ</label>
          <input type="text" name="key" placeholder="Введите ваш цифровой ключ" />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
