export const getItem=(name)=>{
    const data=window.localStorage.getItem(name)
    try {
       return JSON.parse(data)
    } catch (error) {
       return data 
    }
}

export const setItem=(name,val)=>{
    if(typeof(val)==='object')val=JSON.stringify(val)
    window.localStorage.setItem(name,val)
}

export const removeItem=(name)=>{
    window.localStorage.removeItem(name)
}