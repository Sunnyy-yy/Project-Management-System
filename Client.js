// import { writable } from 'svelte/store';
// export let writableArray = writable([]);
let login_status ;



let sdk = {
  // base_url: "http://35.240.248.93:8888",
  base_url: "http://65.0.142.24:8282",
  api_key : "6498a8ad1beb9d84d63035c5d1120c007fad6de706734db9689f8996707e0f7d",
  geoserver_url : "http://65.0.142.24:8600/geoserver",

  // toast: {
  //   "success": { '--toastBackground': 'green', '--toastColor': 'black' },
  //   "error": { '--toastBackground': 'red', '--toastColor': 'black' },
  //   "warning": { '--toastBackground': 'orange', '--toastColor': 'black' },
  //   "info": { '--toastBackground': 'blue', '--toastColor': 'black' }
  // },

            
  parseJwt: function ( token ) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var jsonPayload = JSON.parse(jsonPayload);
    Object.entries(jsonPayload).forEach(([k,v]) => {
    // console.log(" jwt key",k,"value",v);
    sessionStorage.setItem(k, v);
  });
  },
  login :async function (username, password ) {
    // GeApi ('POST', '/auth', {"Content-Type": "application/json"} , {"username": username , "password": password} );
    return fetch(this.base_url + '/api/v2/user/session', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": username, "password": password })
    }).then((response ) => {
      return response.json();

    }).then((resp) => {
    
     
      if (resp.hasOwnProperty('session_token')){
        this.parseJwt(resp.session_token);
        Object.entries(resp).forEach(([k,v]) => {
          sessionStorage.setItem(k, v);
        //  console.log(k,v);
        });
        //console.log("in login ..");
        // login_status.update(n => n = 1);
        return true;
      }else{
        return false;
      }
 

    });},
    // const resp = await response.json();
    // if (resp.hasOwnProperty('session_token')) {
    //   this.parseJwt(resp.session_token);
    //   Object.entries(resp).forEach(([k, v]) => {
    //     sessionStorage.setItem(k, v);
    //     console.log(k, v);
    //   });
    //   console.log("in login ..");
    //   login_status = (n => n = 1);
    //   return true;
    // } else {
    //   return false;
    // }},
    api: async function  (method, url, headers_args, body_args) {
      if (body_args) {
        body_args = JSON.stringify(body_args);
      } else { body_args = null; }
      if (headers_args) {
        
        headers_args["X-DreamFactory-Api-Key"] = this.api_key;
        headers_args["X-DreamFactory-Session-Token"] = sessionStorage.getItem("session_token");
       // console.log(headers_args);
      } else {
        headers_args = null ;
      
    }
  
  
      return fetch(this.base_url + url, {
        //mode: "no-cors",
        crossDomain:true,
        cache: 'no-cache',
        method: method,
        headers: headers_args,
        body: body_args
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else { throw new Error('Server response wasn\'t OK'); }
      }).then((json) => {
        return json; // TODO save data to session Storage and return only bool, try catch
  
      });
    }
  
  }

    // tables : function (table_name){

    //   let table ={}, headers_args={};
    //   table.col_def =[];
    //   table.data=[];
    //   headers_args["X-DreamFactory-Api-Key"] = this.api_key;
    //   headers_args["X-DreamFactory-Session-Token"] = sessionStorage.getItem("session_token");
  
  
    //   let ret_this ;
    //   return  Promise.all([
    //     fetch(this.base_url + "/api/v2/pg/_schema/"+table_name, {
    //       //mode: "no-cors",
    //       crossDomain:true,
    //       cache: 'no-cache',
    //       method: 'GET',
    //       headers: headers_args,
    //       //body: body_args
    //     }),
    //     fetch(this.base_url + "/api/v2/pg/_table/"+table_name, {
    //       //mode: "no-cors",
    //       crossDomain:true,
    //       cache: 'no-cache',
    //       method: 'GET',
    //       headers: headers_args,
    //       //body: body_args
    //     })
    //   ]).then(function (responses) {
    //     // Get a JSON object from each of the responses
    //     return Promise.all(responses.map(function (response) {
    //       return response.json();
    //     }));
    //   }).then(function (res) {
    //     // Log the data to the console
    //     // You would do something with both sets of data here
    //     table.col_def.length = 0;
    //     // console.log(res);
    //     res[0].field.forEach((element,id) => {
    //       if (element.name =='geom'  || element.name == 'hide' ){
    //       }else{
    //         table.col_def.push({
    //           title:element.label,
    //           field:element.name,
    //           visible:true
    //           })
    //       }
    //     });
  
    //     table.data.length = 0;
    //     table.data = res[1].resource;
    //     return table;
    //   }).catch(function (error) {
    //     // if there's an error, log it
    //     console.log(error);
    //   });
    // },
  




//   // IMP NOTE : {'Content-Type': "text/plain"} can work in many cases of the server is responding with CORS inspite of all setup. for GET request or any other combination
//   anyApi: function (method, url, headers_args, body_args) {
//     if (body_args) {
//       body_args = JSON.stringify(body_args);
//     } else { body_args = null; }
//     if (headers_args) {
//       // if headers added then CORS error is shown 
//     // headers_args["X-DreamFactory-Api-Key"] = this.api_key; 
//     // headers_args["X-DreamFactory-Session-Token"] = sessionStorage.getItem("session_token");
//     } else {headers_args = null; }
//     return fetch( url , {
//       crossDomain:true,
//       cache: 'no-cache',
//       mode: 'cors', // 'no-cors'
//       method: method,
//       headers: headers_args,
//       body: body_args
//     }).then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else { throw new Error('Server response wasn\'t OK'); }
//     }).then((json) => {
//       return json; // TODO save data to session Storage and return only bool, try catch
//     });
//   }
// };






// function createCount() {
//   const { subscribe, set, update } = writable(0);
//   return {
//     subscribe,
//     set,
//     update,
//     sdk: sdk
//   };
// }

// export const geoedge = createCount();
