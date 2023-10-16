import { urlBD } from '../connectDB';

export const getFullname = async() => {
    try {
        const data = await fetch(`${urlBD}/api/usuario/fullname`,{
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem("usuario").token
                    },
            })
            if(data.statusText === "Unauthorized") {throw new Error;}
        return data.json()
    } catch (error) {
        console.log(error)
    }  
}