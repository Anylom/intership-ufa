export async function Datta(options = {}) {
    const {id} = options;
    let url = `https://dummyjson.com/users${id? `/${id}`:''}`;
    let resp = await fetch(url); 
    let result = await resp.json();
    return result
}