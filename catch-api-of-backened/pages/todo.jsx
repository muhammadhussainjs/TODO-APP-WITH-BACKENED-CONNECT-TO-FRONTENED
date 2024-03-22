import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Todo = () => {

  const inputvalue = useRef(null)
  const descvalue = useRef(null)
  const amountvalue = useRef(null)
  const [data , setData] = useState([])
  // const param = useParams()

  useEffect(()=>{
    getData()

  },[])

 

 
    
  const submit = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('https://todo-app-with-backened.vercel.app/ads/post', {
        title: inputvalue.current.value , description : descvalue.current.value , amount : amountvalue.current.value
      });
      console.log(response.data);
    getData()
      console.log(inputvalue.current.value);
    
    
      inputvalue.current.value = ''
      descvalue.current.value = ''
      amountvalue.current.value = ''
      // Do something with the response if needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  
    const getData = async () => {
      try {
        const response = await axios.get("https://todo-app-with-backened.vercel.app/ads")
        console.log(response);
          console.log(response.data.data);
          setData( response.data.data)
        
 
        
        
      } catch (error) {
        console.log(error);  
      }
        }
  

  const deleteCall = async (id)=>{
    console.log(id);
    // const copydata = [...data]
    // copydata.splice(id , 1)
    // setData(copydata)
    try{
    const response = await axios.delete(`https://todo-app-with-backened.vercel.app/ads/delete/${id}`)
    console.log(response.data);
getData()
    }
    catch(error){
      console.log(error);
    }
    
  }
  
  const editCall = async (id) => {
    console.log(id);
    const newtitle = prompt('Enter new title:');
    const newdescription = prompt('Enter new description:');
    const newnumber = +prompt('Enter new amount:');
    if(isNaN(newnumber)){
      alert('please enter number')
      return
    }

    try {
        const response = await axios.put(`https://todo-app-with-backened.vercel.app/ads/put/${id}`, {
            title: newtitle,
            description: newdescription,
            amount: newnumber
        });

        console.log(response.data);
         getData(); // Refresh data after editing
    } catch (error) {
        console.log(error);
    }
}

  
  
  

  



  return (
    <>
    <h1>TODO APP WITH CATCH API WITH BACKENED</h1>
  <form onSubmit={submit}>
    <input type="text" ref={inputvalue} placeholder='enter title'/><br/>

    <input type="text" ref={descvalue} placeholder='enter decs'/><br/>
    <input type="number" ref={amountvalue} placeholder='enter amount'/>
    <button type='submit'>submit</button>
  </form>
  <ul>
        {data.length > 0 ? 
          data.map((item , index) => {
           return <li key={index}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{item.amount}</p>
              <button onClick={()=>{deleteCall(item._id)}}>delete</button>
              <button onClick={()=>{editCall(item._id)}}>edit</button>
            
            </li>
          }):
        
          <h1>Loading...</h1>
        }
      </ul>
  
  
    </>
    
  )
}

export default Todo