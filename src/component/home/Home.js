import React from 'react'

export default function Home() {

    return (
        <>
            <div id="carouselId" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselId" data-slide-to="1"></li>
                    <li data-target="#carouselId" data-slide-to="2"></li>
                    <li data-target="#carouselId" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item">
                        <img src="https://www.themobileindian.com/public/thumbs/news/2019/02/25116/flipkart-super-value-week_425_735.jpg" width="100%" height='560px' alt="Second slide" />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://storiesflistgv2.blob.core.windows.net/stories/2017/08/billion_mainbanner-V2.jpg" width="100%" height='560px' alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://rukminim1.flixcart.com/image/612/612/jqwny4w0/primer/k/d/c/50-9-to-5-naturale-aloe-aqua-gel-lakme-original-imafcthtjyfmxzfg.jpeg?q=70" width="100%" height='560px' alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://rukminim1.flixcart.com/flap/1400/1400/image/aa23cd7913431ef2.jpg?q=50" width="100%" height='560px' alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}
