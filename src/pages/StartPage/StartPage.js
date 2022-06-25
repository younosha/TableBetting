import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import styles from './StartPage.module.css';
import TextField from '@mui/material/TextField';
import { Context } from '../../context';

export const StartPage = () => {
    const {form, setForm} = useContext(Context);

    return <div className={styles.container}>
        <h3 className={styles.title}>Введите начальные данные</h3>
        <TextField 
            id="outlined-basic" 
            label="Количество игроков" 
            variant="outlined" 
            type="number" 
            className={styles.field} 
            value={form.numberRow} 
            onChange={e => setForm({...form, numberRow: e.target.value})}
        />
        <TextField 
            id="outlined-basic" 
            label="Количество боев" 
            variant="outlined" 
            type="number" 
            className={styles.field} 
            value={form.numberCol} 
            onChange={e => setForm({...form, numberCol: e.target.value})}
        />
        <Link to="/main" className={styles.link}>Готово</Link>
    </div>
}