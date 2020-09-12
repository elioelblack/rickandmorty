import React, {Component} from 'react'
import {TopBar} from './TopBar'
import {fetchPageItems, searchItems} from './Service/Service'
import Items from './Items';
import {addFavorite,returnFavorite} from './Service/Service'

export default class Index extends Component{
    constructor(props){
        super(props)
        this.state={
            page:1,
            pages:0,
            next:2,
            prev:null,
            results:[],           
            name:'',
            favorites:''
        }
        this.returnItemPerPage = this.returnItemPerPage.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClickSearch = this.onClickSearch.bind(this)
    }
    componentDidMount(){
        this.returnItemPerPage(this.state.next)
        document.getElementById("btn-search").addEventListener("click", function(event){
            event.preventDefault()
        });  
        let favorites = returnFavorite()
        //console.log(favorites)
        if(favorites.length>0){
            let htmlBodyFavorites = 
            <div className="row">
                <div className="col">
                <ul className="list-group">
                    {
                    favorites.map(
                        cn=>{
                            return(
                            <li className="list-group-item">{cn.name}</li>
                            )
                        }
                    )
                    }                
                </ul>
                </div>
            </div>;
            this.setState({
                favorites:htmlBodyFavorites
            })
        }
    }

    onSearch(name){
        searchItems(name)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            if(data.info!==undefined){
                let {pages} = data.info                   
                this.setState({
                    results:data.results,        
                    pages        
                })
            }else{
                this.setState({
                    results:[]
                })
            } 
            
        })
    }

    returnItemPerPage(page){
        fetchPageItems(page)
        .then(response => response.json())
        .then(data => {
            //console.log(data)                    
            this.setState({
                results:data.results,        
                pages:23        
            })
        })
                
    }
    onClickNext=(e)=>{
        let {page} = this.state
        const { next, prev } = this.state;
        this.setState({
            page:page+1,
            next:next+1,
            prev:prev+1
        })
        if(next>=23){
            this.setState({next:23})            
        }   
        this.returnItemPerPage(next+1)
    }
    onClickPrev = (e)=>{
        let {page} = this.state
        const { next, prev } = this.state;        
        this.setState({
            page:page-1,
            next:next-1,
            prev:prev-1
        })
        if(prev<=0){
            this.setState({prev:null})            
        }        
        this.returnItemPerPage(this.state.prev)
    }
    
    onClickFirst(e){
        this.returnItemPerPage(1)
        this.setState({            
            next:2,
            prev:null
        })
    }

    onClickLast(e){
        this.returnItemPerPage(this.state.pages)
        let{next,prev}=this.state
        this.setState({            
            next:this.state.pages+1,
            prev:this.state.pages-1
        })
    }

    onChange(name){
        //alert(name)
        this.setState({
            name:name
        })
    }
    
    onClickSearch(e){
        alert(e.id)             
        const form = e;
        if (form.checkValidity() === false) {            
            this.setState({
                validated: true,
                isLoading:false
            });
            form.classList.add('was-validated');            
        } else {
            this.onSearch(this.state.name)
        }
    }

    render(){
        const {next,prev,results,name, pages} = this.state
        return(
            <>
                <TopBar onChange={this.onChange} name={name} onClickSearch={this.onClickSearch}/>
                <hr style={{borderBottom:1,marginTop:5}}/>                
                {(this.state.results.length>0)&&
                <nav aria-label="...">
                    <ul className="pagination justify-content-center">
                        <li className={prev === null || prev === 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" onClick={this.onClickFirst.bind(this)} href="#" tabindex="-1" aria-disabled="true">First</a>
                        </li>
                        <li className={prev === null || prev === 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" onClick={this.onClickPrev.bind(this)} href="#" tabindex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li className={prev === null || prev === 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" onClick={this.onClickPrev.bind(this)} href="#">{prev === null ? 0 : prev}</a></li>
                        <li className="page-item active" aria-current="page">
                            <a className="page-link"  href="#">{next - 1} <span className="sr-only">{next - 1}</span></a>
                        </li>
                        <li className={next === null || next >= pages ? "page-item disabled" : "page-item"} >
                            <a className="page-link" href="#" name={next} onClick={this.onClickNext.bind(this)}>{next}</a>
                        </li>
                        <li className={next === null || next >= pages ? "page-item disabled" : "page-item"}>
                            <a className="page-link" onClick={this.onClickNext.bind(this)} href="#">Next</a>
                        </li>
                        <li className={next === null || next >= pages ? "page-item disabled" : "page-item"}>
                            <a className="page-link" onClick={this.onClickLast.bind(this)} href="#">Last</a>
                        </li>
                    </ul>
                </nav>}
                <hr style={{borderBottom:1,marginTop:1}}/>
                    <Items items={results} />  
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Launch static backdrop modal
                    </button>
                    <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Favorite characters</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.favorites}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                        </div>
                        </div>
                    </div>
                    </div>             
            </>
        );
    }
}