import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../components/hooks/useFetch'

const List = ()=>{

    const location = useLocation()
    //console.log(location)
    const [openDate , setOpenDate] =  useState(false)
    const [date , setDate] =  useState(location.state.date)
    const [destination , setDestination] = useState(location.state.destination)
    const [options , setOptions] = useState(location.state.options )
    const [min,setMin]= useState(undefined)
    const [max,setMax]= useState(undefined)

    const { data, loading, error ,reFetch } = useFetch(
        `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
        );

    

    //console.log(data)

    const handleClick = ()=>{
        reFetch()
    }

    return(
        <div>
            <Navbar/>
            <Header type="list"/>
            <div className="listContainer">
                <div className='listWrapper'>
                    <div className="listSearch">
                       <h1 className="lsTitle">Search</h1>
                       <div className='lsItem'>
                           <label>Destination</label>
                           <input placeholder={destination}  type="text"  />
                       </div>
                       <div className='lsItem'>
                           <label>Check -in Date</label>
                           <span onClick={()=>setOpenDate(!openDate)} >{`${format(date[0].startDate,"MM/dd/yyyy")} to  ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                           {openDate && <DateRange
                           onChange={item => setDate([item.selection])}
                           minDate={new Date()}
                           ranges={date}
                           
                           />}                     
                       </div>

                       <div className='lsItem'>
                            <label>Options</label>
                            <div className='lsOptions'>
                            <div className="lsOptionItem">
                                <span className='lsOptionPrice'>Min 
                                <small>Per Night</small></span>
                                <input type="number" onChange={e=>setMin(e.target.value)} className='lsOptionInput' />
                            </div>

                            <div className="lsOptionItem">
                                <span className='lsOptionPrice'>Max 
                                <small>Per Night</small></span>
                                <input type="number" onChange={e=>setMax(e.target.value)} className='lsOptionInput' />
                            </div>

                            <div className="lsOptionItem">
                                <span className='lsOptionPrice'>
                                    Adult
                                </span>
                                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult}/>
                            </div>

                            <div className="lsOptionItem">
                                <span className='lsOptionPrice'>
                                    Children
                                    </span>
                                <input type="number"min={0} className='lsOptionInput' placeholder={options.children}/>
                            </div>

                            <div className="lsOptionItem">
                                <span className='lsOptionPrice'>
                                    Room
                                </span>
                                <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
                            </div>

                       </div>
                       </div>
                       <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                       {loading ? ("Loading") : 
                       <>
                       {data.map((item)=>{
                            return <SearchItem key={item._id} item={item}   />
                       })}
                       </> }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List