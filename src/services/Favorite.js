const config  = require("../config")

class Favorites {
    getFavoritesUser = async () => {
        let status = 0
        let res;

        res = await fetch(config.baseUrl + "/api/user/getfollows", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer '  + ((JSON.parse((localStorage || {}).getItem('data')) || {}).data || {}).accessToken || ""
            },
          })
          .then((response) => {
            status = (response || {}).status || ""; 
            
            return  (response || {}).json() || {}})
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };

      addFavoritesUser = async (id) =>{
        let status = 0
        let res;

        res = await fetch(config.baseUrl + "/api/user/follow?id=" + id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer '  + (JSON.parse((localStorage || {}).getItem('data') || {}).data || {}).accessToken || ""
            },
          })
          .then((response) => {
            status = (response || {}).status || ""; 
            
            return  (response || {}).json() || {}})
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };

      removeFavoritesUser = async (id) =>{
        let status = 0
        let res;

        res = await fetch(config.baseUrl + "/api/user/unfollow?id="+id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer '  + (JSON.parse((localStorage || {}).getItem('data') || {}).data || {}).accessToken || ""
            },
            
          })
          .then((response) => {
            status = (response || {}).status || ""; 
            
            return  response.json()})
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };
}

export default Favorites;