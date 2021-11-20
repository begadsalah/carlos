let saveToLocalStorage = (key,state) => {
    try{
    const serialized = JSON.stringify(state)
    localStorage.setItem(key,serialized)

    }catch(e){
        console.log(e)
    }
}
let loadFromStorage = (key) => {
    try{
    const serialized =  localStorage.getItem(key)
    if(serialized === null ) return false
        return JSON.parse(serialized)

    }catch(e){
        console.log(e)
        return false
    }
}
export {
    saveToLocalStorage,
    loadFromStorage
}
