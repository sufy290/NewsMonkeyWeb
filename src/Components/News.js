import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

        static defaultProps = {
            country : "in",
            pageSize : 6,
            category : "general"
        }
        static propTypes = {
            country : PropTypes.string,
            pageSize :PropTypes.number,
            category : PropTypes.string
        }
    
        Capitalize = (str)=>{
            return str.charAt(0).toUpperCase() + str.slice(1);
            }

    constructor(props){
        super(props);
        this.state = {
            articles:[],
            loading:false,
            page :1,
            totalResults :9339
        }
        document.title = `${this.Capitalize(this.props.category)}- NewsMonkey`;
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89c1afe6514f438f9f6f981b1cf87a6d&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles:parseData.articles || [],
            totalResults : parseData.totalResults || this.state.totalResults,
            loading:false
        })
    }

    handlePrevClick = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=89c1afe6514f438f9f6f981b1cf87a6d&page=${this.state.page -1}&pageSize=${this.props.pageSize}` ;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            page : this.state.page -1,
            articles:parseData.articles,
            loading:false
        })
    }

    handleNextClick = async()=>{  
        if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=89c1afe6514f438f9f6f981b1cf87a6d&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
            page : this.state.page+1,
            articles:parseData.articles,
            loading:false
        })
    }
    }


    render() {
        return (

            <div className="container my-2">
                    <h1 className="text-center" style={{margin:"35px", marginTop:"75px"}}> NewsMonkey - Top News.</h1>
                    {/* {!this.state.loading && <Spinner/>} */}
                    <div className="row my-2">
                        {!this.state.loading ? this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,55):""}
                            imgurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt}/>
                        </div>
                        }):<div className="d-flex justify-content-center w-100"><Spinner/></div>}
                    </div>
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
                    </div>
            </div>

           
                    

                    
        );
    }
}


