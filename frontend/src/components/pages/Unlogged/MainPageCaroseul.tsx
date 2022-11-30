function MainPageCaroseul(){



    return <div className="" style={{height:"100%",width: "100%" }}>
        <div id="car" className="carousel slide" data-bs-ride="carousel"  style={{height:"100%",width: "100%" }}>
            <div className=" carousel-inner"  style={{height:"100%",width: "100%" }}>
                <div className="carousel-item active"  style={{height:"100%",width: "100%" }}>
                <img src={require('./../../../images/carouselImages/image1.jpg')} className="d-block w-100" alt="..."  style={{height:"100%",width: "100%" }}/>

                </div>

                <div className="carousel-item "  style={{height:"100%"}}> 
                <img src={require('../../../images/carouselImages/image2.jpg')} className="d-block w-100" alt="..."  style={{height:"100%",width: "100%" }}/>

                </div>

              

            </div>
            <button className=" carousel-control-prev" type="button" data-bs-target={"#car"} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className=" visually-hidden">Previous</span>
            </button>
            <button className=" carousel-control-next" type="button" data-bs-target="#car" data-bs-slide="next">
                <span className=" carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    </div>
}


export default MainPageCaroseul;