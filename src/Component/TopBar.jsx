import React,{ useState } from 'react'

export function TopBar(data){
    //console.log(data)
    const [name, setName] = useState(data.name);
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark" style={{backgroundColor: '#e3f2fd'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Rick And Morty</a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                <a className="nav-link" href="#">Show favorites <span className="sr-only">(current)</span></a>
                </li>                
            </ul>
            <form className="form-inline my-2 my-lg-0 needs-validation" noValidate id="search-form" onSubmit={(e)=>data.onClickSearch(e.target)}>
                <input className="form-control mr-sm-2" 
                type="search"                 
                placeholder="Search" 
                aria-label="Search"                
                onChange={(e)=>data.onChange(e.target.value)}
                required/>
                <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit"  onClick={(e)=>data.onClickSearch(e.target)}              
                >Search</button>
            </form>
            </div>
        </nav>
    )
}