import React, { Component } from 'react'
import Loading from './Loading';

export class Scsummary extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            status:"",
            score:[]
        }
    }
    async componentDidMount(){
        let url="https://api.cricapi.com/v1/match_scorecard?apikey=1a0c0a65-79ea-45fb-80f5-d5f288969316&offset=0&id=a467d974-b05e-4543-87d3-cb8f5e9c1c63"
        let rawdata=await fetch(url);
        let parsedData=await rawdata.json();
        this.setState({
            data:parsedData.data,
            status:parsedData.status
        })
    }
  render() {
    return (
      <div className='container'>
                <div className="card mx-auto bg-dark" style={{width:"650px", align:'center'}}>
          <div className="card-body" style={{color:'white'}}>
            <h5 className="card-title">{this.state.data.name}</h5>
            <h6 className="card-subtitle mb-2" style={{color:'red'}} >{this.state.data['status']}</h6>
            <p className="card-text">
              {this.state.data.score?this.state.data.score[0]['inning']: <Loading/>}: 
              {this.state.data.score?this.state.data.score[0]['r']: <Loading/>}-
              {this.state.data.score?this.state.data.score[0]['w']: <Loading/>} 
              ({this.state.data.score?this.state.data.score[0]['o']: <Loading/>})
                <br/>
              {this.state.data.score?this.state.data.score[1]['inning']: <Loading/>}: 
              {this.state.data.score?this.state.data.score[1]['r']: <Loading/>}-
              {this.state.data.score?this.state.data.score[1]['w']: <Loading/>} 
              ({this.state.data.score?this.state.data.score[1]['o']:<Loading/>})
              </p>
        
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    )
  }
}
export default Scsummary