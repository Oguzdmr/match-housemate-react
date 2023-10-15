
class Preferences {
    updatePreferences = async (gender, smokingAllowed,guestsAllowed, petsAllowed, foreignersAllowed, 
      alcoholAllowed, duration, acceptableRoommatesMin, acceptableRoommatesMax, budget, hasHome, address) => {
        let status = 0
        let res;

        await fetch("https://api.roomie.helloworldeducation.com/api/preferences", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer '  + (JSON.parse(localStorage.getItem('data') || {}).data || {}).accessToken || ""
            },
            body: JSON.stringify({
                "genderPref":parseInt(gender) || 0,
                "smokingAllowed": parseInt(smokingAllowed) || 0,
                "guestsAllowed": parseInt(guestsAllowed) || 0,
                "petsAllowed": parseInt(petsAllowed) || 0, 
                "foreignersAllowed": parseInt(foreignersAllowed) || 0,
                "alcoholAllowed": parseInt(alcoholAllowed) || 0,
                "duration": parseInt(duration) || 0,
                "acceptableRoommatesMin": parseInt(acceptableRoommatesMin) || 0,
                "acceptableRoommatesMax": parseInt(acceptableRoommatesMax) || 0,
                "budgetMin": parseInt((budget || "").split('-')[0]),
                "budgetMax": parseInt((budget || "").split('-')[1] || ""),
                "hasHome": hasHome || false,
                "address": address || false
            }),
          })
          .then((response) => {
            status = response.status; 
            
            return response.json()})
          .then((result) => {
            res = result;

            let userData = (JSON.parse((window || {}).localStorage || 0) || {}).getItem('data') || {};

            ((userData.data || {}).user || {}).preferences = ((result || {}).data || {}).preferences || {};
            
            window.localStorage.setItem('data', JSON.stringify(userData));
          })
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };
}

export default Preferences;