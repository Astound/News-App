import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title,description,imageUrl,newsUrl,publishedat}= this.props;
    return (
      <div className='container my-3'>
            <div  className="card">
                <img  className="card-img-top" src={imageUrl} alt="..."/>
                <div  className="card-body">
                    <h5  className="card-title">{title}{title.length<45?'':'..'}</h5>
                    <p  className="card-text">{description}{description.length<100?'':'...'}</p>
                    <p  className="card-text" style={{fontSize :'10px'}}>Published On : {publishedat}</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
      </div>
    )
  }
}
export default Newsitem
