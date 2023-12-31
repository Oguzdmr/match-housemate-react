const config  = require("../config")

class AuthService {
    login = async (email, password) => {
        let status = 0
        let res;

        await fetch(config.baseUrl + "/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
          })
          .then((response) => {
            status = (response || {}).status; 
            
            return (response || {}).json() || {}})
          .then((result) => {
            res = result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };

    register = async (name, lastname, email, username, password, birthday, gender, image) => {
        let status = ""
        let res = ""

        await fetch(config.baseUrl + "/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstName": name || "",
                "lastName": lastname || "",
                "username": username || "" ,
                "password": password || "",
                "email": email || "",
                "birthDay": birthday || "",
                "gender": gender,
                "profilePhoto":image || ""
            }),
          })
          .then((response) => {
            status = (response || {}).status; 
            
            return (response || {}).json() || {}})
          .then((result) => {
            res = result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status, response:res};
      };
      
    refreshToken = async (refToken) => {
      let res;

      await fetch("https://uat.api.memoreng.helloworldeducation.com/api/auth/createtokenbyrefreshtoken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "token": refToken,
            }),
          })
          .then((response) => {return (response || {}).json() || {}})
          .then((result) => {
            res = result;
          })
          .catch((error) => {console.log("error", error)});

      return res;
    }

    createTokenByClient = async () => {
      let res;

      await fetch("https://uat.api.memoreng.helloworldeducation.com/api/auth/createtokenbyclient", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": "SpaApp",
              "secret": "?Vj3N$:S5>zAJ-Nm5}&]:fB&-#JG82*J"
            }),
          })
          .then((response) => {return (response || {}).json() || {}})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

      return res;
    }

    confirmEmail = async (user, token) => {
      let status = 0
      let res;

      await fetch(config.baseUrl + "/api/auth/confirmemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "userId": user ,
              "token": token
          }),
        })
        .then((response) => {
          status = (response || {}).status; 
          
          return (response || {}).json() || {}})
        .then((result) => {
          res = result;

          (status === 200 || status === 201) && localStorage.setItem("data", JSON.stringify(result || {}));
        })
        .catch((error) => {console.log("error", error)});

        return {status:status, response:res};
    };
}

export default AuthService;