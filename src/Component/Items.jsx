import React, {Component} from 'react'
import {addFavorite,returnFavorite} from './Service/Service'

export default class Items extends Component{
    constructor(props){
        super(props)
        this.state={            
            items:props.items,            
        }
    }
    componentDidMount(){
        
    }

    onClickIcon(e){        
        let obj = e.target.id
        let temp = returnFavorite()
        let favorites = returnFavorite()
        
        if(temp.length<5 ){
            
            temp.push(JSON.parse(obj))
            
        }
        addFavorite(temp)
        
        
    }
    fillCardItem(e){        
        return this.props.items.map(
            cn=>{
                return(
                    <div className="col-12 col-sm-6 col-md-3 col-lg-4" style={{padding:10}}>
                        <div className="card" style={{maxWidth:540, padding:5}}>
                        <div className="row no-gutters">
                            <div className="col-md-5">
                            <img src={cn.image} className="card-img" alt="..." style={{width:'100%'}} />
                            </div>
                            <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{cn.name}</h5>
                                <p className="card-text">
                                    Specie: <b>{cn.species}</b><br/>
                                    Episodes: <b>{cn.episode.length}</b><br/>
                                    status: <span style={{color:cn.status==='Alive'?'green':'red'}}><b>{cn.status}</b></span>
                                </p>
                                <p className="card-text">
                                    <i class="far fa-star"
                                    id={JSON.stringify(cn)}                                    
                                    onClick={this.onClickIcon.bind(this)}
                                    ></i>
                                    
                                </p>
                                <p className="card-text">
                                <small className="text-muted">{cn.gender}</small>
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>                    
                );
            }
        )
    }

    render(){        
        return(            
            <div className="row">
                {this.fillCardItem()}                
            </div>
        );
    }
}