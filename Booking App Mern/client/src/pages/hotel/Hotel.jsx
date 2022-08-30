import {   faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './hotel.css'
import useFetch from '../../components/hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'
const Hotel = ()=>{
    const location = useLocation()
    //console.log(location)
    const id = location.pathname.split("/")[2]
    //console.log(id)
    const [slideNumber,setSlideNumber] = useState(0)
    const[open,setOpen] = useState(false)
    const[openModal,setOpenModal] = useState(false)

    const {data,loading,error,reFetch} = useFetch(`/hotels/find/${id}`)

    const {date,options} = React.useContext(SearchContext)
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }

    const days = dayDifference(date[0].endDate, date[0].startDate);

    const handleClick = ()=>{
      if(user){
        setOpenModal(true)
      }else{
        navigate("/login")
      }
    }

     //console.log(days)

    // console.log(data)
    // console.log(location.pathname)

    const photos = [
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
        },
        {
          src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
        },
      ];

      const handleOpen = (i)=>{
        setOpen(true)
        setSlideNumber(i)
      }
      const handleMove = (direction)=>{
          let newNumberMove;
          if(direction==="l"){
            newNumberMove = slideNumber === 0 ? 5 : slideNumber-1
          }else{
            newNumberMove = slideNumber===5 ?  0 : slideNumber+1;
          }
          setSlideNumber(newNumberMove)
      }

    return(
        <div> 
            <Navbar  />
            <Header type="list"  />
            {loading ? ("Loading") : 
            <div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark}  className="close"  onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow"  onClick={()=>handleMove("l")} />
                    <div className='slideWrapper'>
                        <img src={photos[slideNumber].src} alt=''  className='sliderImg' />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")} />
                </div>}
                <div className="hotelWrapper">
                    <button onClick={handleClick} className='bookNow'>Reserve or Book Now! </button> 
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location - {data.distance} meter from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free aiport taxi
                    </span>
                    <div className='hotelImages'>
                  {photos.map((photo,i)=>(
                        <div className='hotelImgWrapper' key={i}>
                            <img onClick={()=>handleOpen(i)}  src={photos[i].src} alt="" className="hotelImg"  />
                        </div>
                    ))}    
                    </div>
                    <div className='hotelDetails'>

                        <div className='hotelDetailsText'>
                        <h1 className="hotelTitle">{data.title}</h1>
                        <p className="hotelDesc">
                            {/* {data.desc} */}
                            Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                            Street Apartments has accommodations with air conditioning and
                            free WiFi. The units come with hardwood floors and feature a
                            fully equipped kitchenette with a microwave, a flat-screen TV,
                            and a private bathroom with shower and a hairdryer. A fridge is
                            also offered, as well as an electric tea pot and a coffee
                            machine. Popular points of interest near the apartment include
                            Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                            airport is John Paul II International Kraków–Balice, 16.1 km
                            from Tower Street Apartments, and the property offers a paid
                            airport shuttle service.
                          </p>
                          </div>

                        <div className='hotelDetailsPrice'>
                        <h1>Perfect for a {days}-night stay!</h1>
                        <span>
                            Located in the real heart of Krakow, this property has an
                            excellent location score of 9.8!
                        </span>
                        <h2>
                            <b>${days * data.cheapestPrice * options.room }</b> ({days} nights)
                        </h2>
                        <button onClick={handleClick}>Reserve or Book Now!</button>
                        </div>
 
                    </div> 
                </div>

                <MailList  />
                <br></br>
                <Footer  />
            </div>}

            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel