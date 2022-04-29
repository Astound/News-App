import React, { Component } from 'react'
import Loading from './Loading';
import Newsitem from './Newsitem'
import Scsummary from './Ssummary';

export class News extends Component {
  
  constructor(){
    super();
    console.log("I am news constructor");
    this.state={
      articles: [],
      loading : true,
      page:1,
      totalResults:250
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1522522a981d4877b91daa55425b5c2e&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false })
  }
  handleP=async()=>{
    this.setState({
      page: this.state.page-1
    })
    console.log("Previous")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1522522a981d4877b91daa55425b5c2e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,loading:false })
  
   }
  handleN=async()=>{
    console.log("next")
    if(this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize)){
    this.setState({
      page: this.state.page+1
    })
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1522522a981d4877b91daa55425b5c2e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,loading:false })
   }
  }
  render() {
    
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'30px 0px'}}>Headlines</h1>
        {this.state.loading&&<Loading/>}
        <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>      
            <Newsitem 
            title={element.title?element.title.slice(0,45):''} 
            description={element.description?element.description.slice(0,101):''} 
            imageUrl={element.urlToImage?element.urlToImage:"https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?cs=srgb&dl=pexels-fiona-art-5186869.jpg&fm=jpg"} 
            newsUrl={element.url}
            publishedat={element.publishedAt.slice(0,10)}
            />
            </div>
          })
          }
        </div>
        <div className='container my-3'>
        <Scsummary/>
      </div>
            <div className="container d-flex justify-content-between my-2">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleP}>&larr; Prev</button>
            <button disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleN}>Next &rarr;</button>
          
        </div>
      </div>
    )
  }
}

export default News
