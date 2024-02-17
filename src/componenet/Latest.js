import React,{useEffect, useState} from 'react'


const Latest = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/latest',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          
        }
       
    })
    .then((response)=>response.json())
    .then((data) => {
        console.log(data);
        setData(data);
       
      })
    .catch((err)=>console.log(err))

    },[])

   
    const fillData=data.filter((person)=>person.lastName)

   
    const ddataId=data.length>0?data[data.length-1].lastName:null;


  return (
    <div>
        {ddataId}     
    </div>
   
        )
}

export default Latest
/*{data.map((item,i)=>{
            <div key={i}>
                 {item.name}
                </div>
           
        })}*/ 

        /*  <ul>
        {fillData.map((person,i)=>(
            <li key={i}>
                 
            </li>
        ))}
        </ul>*/