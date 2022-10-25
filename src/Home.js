import './styles.css'
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Form from "./Form";
import Footer from "./Footer";
import ToDoItems from './component/ToDoItems/ToDoItems';
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from 'react';
const Home = () => {
  const { t } = useTranslation();
  const [lan,setLan]=useState(false);
  function handleClick(lang) {
    setLan(!lan);
    i18next.changeLanguage(lang)
  }
  const get_day_of_time = (d1, d2) => {
    let ms1 = d1.getTime();
    let ms2 = d2.getTime();
    return Math.ceil((ms2 - ms1) / (24*60*60*1000));
};
  const [workList,setWorkList]=useState([]);
    const [work, setWork ] = useState();
    const [day,setDay]=useState();
    const [lich, setLich]=useState();
    const [check,setCheck]=useState(false);
    const [temp,setTemp]=useState([]);
    const handleDo=(e)=>{
        setWork(e.target.value);
    }
    const handleDate=(e)=>{
      let dayFinish = new Date(e.target.value);
      let today = new Date();
      // console.log(get_day_of_time(today,dayFinish));
      setDay(get_day_of_time(today,dayFinish));
      setLich(e.target.value)
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(work&&day){
        const newItem = {
          id: uuidv4(),
          work: work,
          day: day,
          isDeleted: false,
          // isDeleted: false,
        };
  
        setWorkList([...workList, newItem]);
        // console.log(workList);
        localStorage.setItem('works', JSON.stringify(workList))
       
        setDay("");
        setLich("");
        setWork("");
      }
      // localStorage.setItem('website', workList);
    }
    const handleToggleDelete = (item) => {
      const newList = workList.map((el) => {
        if (el.id === item.id) {
          return {
            ...el,
            isDeleted: !el.isDeleted,
          };
        }
        return el;
      });
      setWorkList(newList);
      // console.log(newList);
    };
    const cnt=(x)=>{
      let tong=0;
      for(let i=0;i<x.length;i++){
        if(x[i].isDeleted===false){
          tong++;
        }
      }
      return tong;
    }
    const handleCheck=()=>{
      setCheck(!check);
      // console.log(check);
    }
    // useEffect(()=>{
    //   if(localStorage.getItem('works')){
    //       setTemp(JSON.parse(localStorage.getItem('works')));
    //     }
    //     console.log(temp);
    // },[])
    // if(localStorage.getItem('works')){
    //   setTemp(JSON.parse(localStorage.getItem('works')));
    // }
    
    // let tmp=localStorage.getItem('website');
    return (
      <div className="App">
        <div className="container">
          {/* <TodoListHeader /> */}
          <div className="header">{t('Tasks.1')} {cnt(workList)} {t('Task2.1')} ! <button onClick={handleCheck} style={{marginLeft:"40%"}}>{t('N1.1')}</button><button onClick={handleCheck} style={{marginLeft:"3%"}}>{t('N2.1')}</button></div>
          {check?workList.filter((item) => {
            return (
              item.isDeleted===false
            );
          })
          .map((item) => {
            return (
              <ToDoItems workList={workList}
              key={item.id}
              work={item.work}
              day={item.day}
              isDeleted={item.isDeleted}
              onDelete={() => handleToggleDelete(item)}
            />
            );
          }):workList
          // filter item by keyword
          
          .map((item) => {
            return (
              <ToDoItems workList={workList}
                key={item.id}
                work={item.work}
                day={item.day}
                isDeleted={item.isDeleted}
                onDelete={() => handleToggleDelete(item)}
              />
            );
          })}
          <form className="form">
        
            <input placeholder={t('Place.1')} onChange={handleDo} value={work}></input>
            <input type="date" onChange={handleDate} value={lich}></input>
            <button onClick={handleSubmit}>{t('N3.1')}</button>
            
      </form>
          {/* <TodoList /> */}
          {/* <Form /> */}
        </div>
        {/* <Footer /> */}
        <div>
      <h3>{t('Made.1')} 🔥</h3>
      <div>
        <span>{t('Label.1')}:</span>
        <span className={`languague-picker ${lan ? "selected" : ""}`} onClick={()=>handleClick('vn')}>🇻🇳</span>
        <span className={`languague-picker ${lan===false ? "selected" : ""}`} onClick={()=>handleClick('en')}>🇺🇸</span>

        {/* <span className="languague-picker selected" onClick={()=>handleClick('en')}>🇺🇸</span> */}
      </div>
    </div>
      </div>
    );
  };
export default Home;  