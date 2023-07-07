// import { setRefreshToken } from "../../redux/auth-slice/auth-slice";
// import { setAuthToken } from "./api";
// import { apiEndpoints } from "./ApiEndpoint";
// import { getAPI } from "./ApiRequest";

// export const refreshToken = (userData) => {
//   return async (dispatch) => {
//     const getApiToken = async () => {
//       const response = await getAPI(apiEndpoints.createToken, userData);
//       console.log(response.authToken);
//       if (response.authToken !== undefined) {
//         if (response.statusCode === "200") {
//           //Login
//           setAuthToken(response.authToken);
//           dispatch(setRefreshToken({ token: response.authToken }));
//         }
//       }

//       if (response.statusText !== "OK") {
//         throw new Error("GET REQ FAILED");
//       }
//       return response.data;
//     };

//     try {
//       let response = await getApiToken();
//       console.log(response);
//     } catch (err) {
//       console.log("ERROR REFRESH TOKEN!!!!");
//     }
//   };
// };
