import React, { Component } from 'react'

export class NewsItems extends Component {
    
    render() {
        let {title,description,imgurl,newsurl,publishedAt,author} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                        <img src={!imgurl?"https://images.livemint.com/img/2021/11/21/600x338/FINTECH-CRYPTO-BITCOIN-2_1637514433428_1637514471621.JPG":imgurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small class="text-muted">by {author?author:"unknown"} : {publishedAt}</small></p>
                            <a href={newsurl} rel="noreferrer" target={"_blank"} className="btn btn-sm btn-dark">Read More..</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
