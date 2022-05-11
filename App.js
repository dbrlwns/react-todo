import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data';
import { useState } from 'react';
import { Card, Button, } from 'react-bootstrap';

function App() {

  const [datas, setDatas] = useState([...Data]);
  const [inputTodo, setInputTodo] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [dataId, setDataId] = useState(Data.length + 1);  


  return (
    <div className="App">
    
      {
        datas.map((data, i) => {
          return (
            <div className='element' key={i}>
              <Modal data={data} datas={datas} setDatas={setDatas} inputTodo={inputTodo} setInputTodo={setInputTodo} />
            </div>
          )
        })
      }
      <div className='inputPart'>
      <input type='text' placeholder='doing' value={ inputTodo } onChange={(e) => { setInputTodo(e.target.value) }} />
      <input type='text' placeholder='date' value={ inputDate } onChange={(e) => { setInputDate(e.target.value) }} />
      <Button className='m-3' variant='success' onClick={() => {
        let newObj = { id: (dataId), todo: inputTodo, when: inputDate };
        setDatas([...datas, newObj]);
        setInputTodo('');
        setInputDate('');
        setDataId(dataId+1);
        
      }} > 추가하기 </Button>
      </div>
    </div>



  );
}

const Modal = (props) => {
  const [revise, setRivise] = useState(0);
  const [reviseContent, setRiviseContent] = useState(props.data.todo);

  return (
    <Card className='container'>
      <Card.Body className='row'>
        <Card.Title className='col-sm-3'>{ props.data.todo }</Card.Title>
        <Card.Text className='col-sm-3'>
          { props.data.when }
        </Card.Text>
        <Button className='del ml-5 ' variant="danger" onClick={() => {
                let findOne = props.datas.find((ele) => ele.id === props.data.id);
                let num = props.datas.indexOf(findOne);
                let newArr = [...props.datas];
                newArr.splice(num, 1);
                props.setDatas(newArr);
              }}>Del</Button>
        <Button className='edit ml-5' variant="primary" onClick={() => {
          setRivise(!revise);
          
        }} >Edit</Button>
        { revise ? <div>
        <input type='text' value={reviseContent}  onChange={(e) => {
          setRiviseContent(e.target.value)
        }}></input> 
        <button onClick={() => { 
          let findOne = props.datas.find((ele) => ele.id === props.data.id);
          let num = props.datas.indexOf(findOne);
          let newArr = [...props.datas];
          newArr[num].todo = reviseContent;
          props.setDatas(newArr);
          setRivise(!revise);
         }}>done</button> </div> 
        : null }
        
      </Card.Body>
    </Card>
  )
}

export default App;
