const API_URL = 'https://rickandmortyapi.com/api'
export const fetchPageItems= (page)=>{     
    return fetch(`${API_URL}/character?page=${page}`)
}

export const searchItems= (name)=>{     
    return fetch(`${API_URL}/character/?name=${name}`)
}

export const addFavorite = (obj)=>{
    sessionStorage.setItem("favorites",JSON.stringify(obj))
}

export const returnFavorite = ()=>{
    let favorites = sessionStorage.getItem("favorites")
    if (favorites === null) return []
    return JSON.parse(favorites)  
}