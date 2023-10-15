
class Match{
    getMatchUser = async () =>{
        let status = 0
        let res;

        res = await fetch("https://api.roomie.helloworldeducation.com/api/match", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer '  + ((JSON.parse(localStorage.getItem('data') || "") || {}).data || {}).accessToken || ""
            },
          })
          .then((response) => {status = response.status; return  response.json()})
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };
}
export default Match;