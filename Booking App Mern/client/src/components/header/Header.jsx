import React, { useContext, useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


const Header = ({type})=>{
    const [destination,setDestination] = useState("")
    const [openDate,setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

      const {user} = useContext(AuthContext);
      const [openOptions,setOpenOptions] = useState(false)
      const [options,setOptions] = useState({
          adult:1,
          children:0,
          room:0
      })

      const navigate = useNavigate()

      const handleOption = (name,operation)=>{
        return setOptions((oldValue)=>{
            console.log(options[name])
            return({
                ...oldValue,
                [name]: operation==="i" ? options[name] + 1 : options[name] - 1
            })
        })
      }
      
      const {dispatch} = React.useContext(SearchContext)
    
      const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
        navigate('/hotels',{state:{destination,
            date,
            options
        }})
      }
 
    return(
        <div className='header'>

        <div className={type==="list" ? "headerContainer listMode" : "headerContainer"}>

           <div className='headerList'>

                <div className='headerListItem active'>
                    <FontAwesomeIcon icon={faBed}  />
                    <span>Stays</span>
                </div>

                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faPlane}  />
                    <span>Flights</span>
                </div>

                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faCar}  />
                    <span>Car Rentals</span>
                </div>

                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faBed}  />
                    <span>Attractions</span>
                </div>

                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faTaxi}  />
                    <span>Airport taxis</span>
                </div>
           </div>
        { type !=="list" && 
        <>
            <h1 className='headerTitle'>A lifetime of discounts ? It's a Genius.</h1>
            <p className='headerDesc'>
                Get rewarded for your travels - unlock instant savings of 10% or more
                with a free Sherifbooking account
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            
                <div className='headerSearch'>
                    <div className='headerSearchItem'>
                        <FontAwesomeIcon icon={faBed} className="headerIcon"  />
                        <input 
                        className='headerSearchInput'
                        type="text"
                        placeholder='Where are your going ?'
                        onChange={(event)=> setDestination(event.target.value)}
                        />
                    </div>

                    <div className='headerSearchItem'>
                        <FontAwesomeIcon icon={faCalendarDay} className="headerIcon"  />
                        <span onClick={()=> setOpenDate(!openDate)} className="headerSearchText" >{`${format(date[0].startDate,"MM/dd/yyyy")} to  ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        />}
                    </div>

                    <div className='headerSearchItem'>
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"  />
                        <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText" >{`${options.adult} adult . ${options.children} children .  ${options.room} room . `}</span>

                        { openOptions  &&<div className="options">

                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                <button disabled={options.adult <= 1} onClick={()=>handleOption("adult","d")} className="optionCounterButton" >-</button>
                                <span className="optionText">{options.adult}</span>
                                <button onClick={()=>handleOption("adult","i")} className="optionCounterButton">+</button>
                                </div>
                            </div>

                            <div className="optionItem">
                                <span className="optionText">children</span>
                                <div className="optionCounter">
                                <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                                <span className="optionText">{options.children}</span>
                                <button onClick={()=>handleOption("children","i")} className="optionCounterButton">+</button>
                                </div>
                            </div>

                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                <button disabled={options.room <= 1} onClick={()=>handleOption("room","d")} className="optionCounterButton">-</button>
                                <span className="optionText">{options.room}</span>
                                <button onClick={()=>handleOption("room","i")} className="optionCounterButton">+</button>
                                </div>
                            </div>
                           
                        </div>}
                    </div>

                    <div className='headerSearchItem'>
                        <button onClick={handleSearch} className='headerBtn'>Search</button>
                    </div>

                </div> </>}

           </div>
        </div>
    )
 }

export default  Header