import useFetch from '../hooks/useFetch';
import './featuredProperties.css'



const FeaturedProperties = ()=>{
    const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
    const imageProperty = [
        "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",        
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"

    ]
    return(
        <div className="fp">

         { loading ? ("Loading") : (<>  {data.map((item,i)=>{

        return <div className="fpItem" key={item._id}>
                <img
                src={imageProperty[i]}
                alt=""
                className="fpImg"
                />
                <span className="fpName">{item.name} </span>
                <span className="fpCity">{item.city} </span>
                <span className="fpPrice">Starting from ${item.cheapestPrice} </span>

                {item.rating &&<div className="fpRating">
                <button className="">{item.rating}</button>
                <span>Excellent</span>
                </div>}

            </div> })}

            </>)}
        </div>
    )
}

export default FeaturedProperties


// import "./featured.css";

// const Featured = () => {
//   return (
//     <div className="featured">
//       <div className="featuredItem">
//         <img
//           src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
//           alt=""
//           className="featuredImg"
//         />
//         <div className="featuredTitles">
//           <h1>Dublin</h1>
//           <h2>123 properties</h2>
//         </div>
//       </div>

//       <div className="featuredItem">
//         <img
//           src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
//           alt=""
//           className="featuredImg"
//         />
//         <div className="featuredTitles">
//           <h1>Reno</h1>
//           <h2>533 properties</h2>
//         </div>
//       </div>
//       <div className="featuredItem">
//         <img
//           src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
//           alt=""
//           className="featuredImg"
//         />
//         <div className="featuredTitles">
//           <h1>Austin</h1>
//           <h2>532 properties</h2>
//         </div>
//       </div>
//     </div>
//   );
// };
