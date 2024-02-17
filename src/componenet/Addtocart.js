import React, { useState,useEffect } from 'react'
import Products from './Products'


const Addtocart = () => {

    const [produc,setProduc] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3001/lo')
      .then(response => response.json())
      .then(data => setProduc(data))
      .catch(error => console.error('Error fetching data:', error));

    },[])
   
    

    return (
        <div style={{display:"flex"}}>
        <section className='py-4 container' >
        <div  style={{display:"flex", overflowX: "auto"}}>
          {produc.map((item, index) => {
            return(
              <Products 
                imagedata={item.imagedata}
                title={item.title}
                desc={item.desc}
                price={item.price}
                item={item}
                key={index}
              />
            )

})}
        </div>
      </section>
      
    </div>
    )
}

export default Addtocart

/*{data.productData.map((item,index)=>{
                    return(
                        <Products 
                        title={item.title} 
                        desc={item.desc} 
                        price={item.price} 
                        
                        item={item}
                        key={index}/>
                    )
                })}*/

                /* const [produc,setProduc] = useState([])
        useEffect(()=>{
            fetch('http://localhost:3001/lo')
          .then(response => response.json())
          .then(data => setProduc(data))
          .catch(error => console.error('Error fetching data:', error));

        },[])
        const base64ImageData = Buffer.from(item.imagedata.data).toString('base64');

    
  return (
    <div>
        <section className='py-4 container'>
            <div className='row justify-content-center'>
                {produc.map((item,index)=>{
                    return(
                        <div>
                        <img src={`data:image/jpg;base64,${base64ImageData}`} />
                        <Products 
                        
                        title={item.title} 
                        desc={item.desc} 
                        price={item.price} 
                        
                        item={item}
                        key={index}/>
                        </div>
                    )
                })}


            </div>
        </section>
      
    </div>
  )*/