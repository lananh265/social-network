import { Url } from "./url"

export default async function NapTien(ob){
    //http://localhost:4000/v0.1/naptien?coin=1000&description=nạp tiền thành viên
    const url =Url.api+"v0.1/naptien?"
                + "coin="+ob.coin
                + "&description="+ob.description
    // console.log(url)
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
     
}