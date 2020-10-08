import axios from "../lib/api";
//
// export const checkJwt = () => {
//     const jwt = localStorage.getItem("jwtToken");
//     if (jwt) {
//         return axios({
//             method: "get",
//             url: "/users/checkJwt",
//             headers: { Authorization: jwt }
//         })
//             .then((res) => {
//                 console.log(res.data)
//                 return res.data;
//             })
//             .catch((err) => {
//                 console.log(false)
//                 return false;
//             });
//     } else {
//         return false;
//     }
// };
