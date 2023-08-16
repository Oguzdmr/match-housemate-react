
class Preferences{
    updatePreferences = async (smokingAllowed,guestsAllowed,petsAllowed,foreignersAllowed,alcoholAllowed,duration,acceptableRoommatesMin,acceptableRoommatesMax,budget, hasHome, address) =>{
        let status = 0
        let res;
        await fetch("https://api.roomie.helloworldeducation.com/api/preferences", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authentication": 'Bearer {token}'
            },
            body: JSON.stringify({
                "smokingAllowed": parseInt(smokingAllowed),
                "guestsAllowed": parseInt(guestsAllowed),
                "petsAllowed": parseInt(petsAllowed),
                "foreignersAllowed": parseInt(foreignersAllowed),
                "alcoholAllowed": parseInt(alcoholAllowed),
                "duration": parseInt(duration),
                "acceptableRoommatesMin": parseInt(acceptableRoommatesMin),
                "acceptableRoommatesMax": parseInt(acceptableRoommatesMax),
                "budgetMin": parseInt(budget.split('-')[0]),
                "budgetMax": parseInt(budget.split('-')[1]),
                "hasHome": hasHome,
                "address": address
            }),
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };
}
export default Preferences;