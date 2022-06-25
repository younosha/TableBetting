import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../../context';
import styles from './MainPage.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const MainPage = () => {
    const {form} = useContext(Context);
    const [col, setCol] = useState([]);
    const [row, setRow] = useState([]);
    const [head, setHead] = useState([]);
    const [checkForm, setCheckForm] = useState({
        name: '',
        col: ''
    });

    const checkFunc = () => {
        const rows = Array.from(document.getElementsByClassName('row'));
        rows.forEach(row => {
            const cols = Array.from(row.childNodes);
            cols.forEach(col => {
                if (col.id.includes('1')) {
                    col.style.background = '#90abff';
                    col.firstChild.style.background = '#90abff';
                    return false;
                }
                if (col.id.includes(cols.length)) {
                    col.style.background = '#f5ed48';
                    col.firstChild.style.background = '#f5ed48';
                    return false;
                }
                if (col.id.includes(Number(checkForm.col) + 1)) {
                    if (col.firstChild.value.toLowerCase().includes(checkForm.name.toLowerCase())) {
                        col.style.background = 'green';
                        col.firstChild.style.color = 'white';
                        col.firstChild.style.background = 'green';
                        col.className = 'yes';
                    } else {
                        col.firstChild.style.color = 'white';
                        col.firstChild.style.background = 'red';
                        col.style.background = 'red';
                    }
                }
            });
            let count = 1;
            cols.forEach(i => {
                if (i.className === 'yes') {
                    count += 1;
                };
            })
            cols[cols.length - 1].firstChild.value = `${count}`
        })
        setCheckForm({
            name: '',
            col: ''
        })
    }

    useEffect(() => {
        const newCol = [];
        const newRow = [];
        for(let i = 0; i < Number(form.numberRow); i++){
            newRow.push(i);
        }
        for(let i = 0; i < Number(form.numberCol) + 2; i++){
            newCol.push(i);
        }
        const newHead = newCol.map((e, index) => {
            if (index === 0) {
                return 'Игрок'
            }
            if (index === newCol.length - 1) {
                return 'Очки'
            }
            return `Бой-${e}`
        });
        setCol([...newCol])
        setRow([...newRow])
        setHead([...newHead])
    }, [form.numberRow, form.numberCol]);

    return <div className={styles.contaner}>
        <div className={styles.checkForm}>
            <TextField 
                id="outlined-basic" 
                label="Имя победителя" 
                variant="outlined" 
                className={styles.field} 
                value={checkForm.name} 
                onChange={e => setCheckForm({...checkForm, name: e.target.value})}
            />
            <TextField 
                id="outlined-basic" 
                label="Номер боя" 
                variant="outlined" 
                type="number" 
                className={styles.field} 
                value={checkForm.col} 
                onChange={e => setCheckForm({...checkForm, col: e.target.value})}
            />
            <Button 
                variant="contained" 
                onClick={checkFunc}
                disabled={!checkForm.name.length || !checkForm.col.length}
            >
                OK
            </Button>
        </div>
        <table>
            <tbody>
                <tr>{head.map(e => <th key={Date.now() + Math.random()}>{e}</th>)}</tr>
                {row.map((_, index) => {
                    return <tr key={index} className="row">
                        {col.map((_, idx) => {
                            return <th key={idx} id={`col-${idx + 1}`}><input className={styles.inputTable} size={idx === col.length - 1 ? 3 : idx === 0 ? 20 : 10} style={{textAlign: idx === 0  ? 'start' : 'center'}}/></th>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}