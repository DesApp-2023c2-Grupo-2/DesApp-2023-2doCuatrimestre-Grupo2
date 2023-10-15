import { urlBD } from '../connectDB';
export default async function updateMaterial(id, data) {
  
    try {
      
        const requestJson = JSON.stringify(data);

        const response = await fetch(`${urlBD}/api/material/update/` + id, {
            method: "PATCH",
            body: requestJson,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseText = await response.text();
        console.log(responseText);
    } catch (ex) {
        console.log(ex);
    }

};
