//@ts-ignore
import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [done,setDone] = useState(false)
  const [description,setDescription] = useState("")
  const [items,setItems] = useState<any>([])
  const [refetch,setRefetch] = useState(false)
  useEffect(()=>{
    axios.get("http://localhost:3000/api/tasks").then((res:any)=>{
      setItems(res.data.tasks)
      console.log(res.data.tasks)
    }).catch((err)=>{
      console.log(err)
    })
  },[refetch])
  const [slected,setSelected] = useState(0)
  
  const Addnew = () =>
  {
      const dataobj = {
        description:description,
        check:done,
      }
      console.log("dataobj",dataobj)
      axios.post("http://localhost:3000/api/tasks",dataobj).then((res)=>{
        console.log(res)
        setRefetch(prev=>!prev)
      })
      setDone(false)
      setDescription("")
  }
  const handleDelete =  async (id : number) =>{
    axios.delete(`http://localhost:3000/api/tasks/${id}`).then((res)=>{
      console.log(res)
      setRefetch(prev=>!prev)
    }).catch((err)=>[
      console.log(err)
    ])
  }

  const handleEdit = (id : number,description : string,check : boolean) => {
    setDone(check)
    setDescription(description)
    setSelected(id)
  }
  
  const SaveEdit = ()=>{
    const dataobj = {
      description:description,
      check:done,
    }
    console.log(slected)
    axios.put(`http://localhost:3000/api/tasks/${slected}`,dataobj).then((res)=>{
      console.log(res)
      setRefetch(prev=>!prev)
    }).catch((err)=>[
      console.log(err)
    ])
    setDescription("")
    setDone(false)
    setSelected(0)
  }


  return (
    <div>
      <div className='container'>
          <input type='checkbox' checked={done} className='container-item' onChange={()=>setDone(prev=>!prev)}/>
          <input className='container-item' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          {
            slected ?  <button className='container-item' onClick={()=>SaveEdit()}>Save</button> : <button className='container-item' onClick={()=>Addnew()}>Add</button> 
          }
      </div>
      {
        //@ts-ignore
        items.map((item)=>{
          return (
            <div key={item._id}>
              <div className='container'>
                <input type='checkbox' checked={item.check} className='container-item' readOnly/>
                <div className='container-item'>{item.description}</div>
                <button className='container-item' onClick={()=>handleEdit(item._id,item.description,item.check)}>Edit</button>
                <button className='container-item' onClick={()=>handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default App