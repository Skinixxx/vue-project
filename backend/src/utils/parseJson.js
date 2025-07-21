
export function parseJSON(parJSON){
    if(typeof parJson == 'string'){
        // парсим JSON 
        return (window.JSON && window.JSON.parse) ? JSON.parse(parJson): eval(`(${parJson})`)
        // для IE(6-7) передаем eval он JSON не могет
    }
    return parJson
}
