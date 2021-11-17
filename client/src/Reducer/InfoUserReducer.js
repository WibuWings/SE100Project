const infoUserInitialState = {
    avatar: "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg",
    firstName: "NAME",
    lastName: "NO",
    email: "",
    old: "",
    gender: "",
    storeName: "",
    tel: "",
    province: "",
    district: "",
    address: "",
    _id: ""
},

    infoUserReducer = (state = infoUserInitialState, action) => {
        switch (action.type) {
            case "UPDATA_DATA_USER":
                return {
                    ...state, 
                    _id: action.data.manager._id,
                    email: action.data.manager.email,
                    firstName: action.data.manager.firstName, 
                    lastName: action.data.manager.lastName,
                    old: action.data.manager.old, 
                    gender: action.data.manager.gender,
                    storeName: action.data.store.storeName, 
                    tel: action.data.manager.phoneNumber,
                    province: action.data.manager.province,
                    district: action.data.manager.district, 
                    address: action.data.manager.address,    
                }
            case "UPDATA_DATA_EMPLOYEE":
                return {
                    ...state,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                    cardID: action.data.cardID,
                    address: action.data.address,
                    tel : action.data.phoneNumber,
                    email: action.data.email,
                    managerID: action.data.managerID,
                    employeeID: action.data._id.employeeID,
                }
            case "UPDATA_PROFILE_DATA_USER":
                return {
                    ...state, 
                    email: action.data.email,
                    firstName: action.data.firstName, 
                    lastName: action.data.lastName,
                    old: action.data.old, 
                    gender: action.data.gender,
                    storeName: action.data.storeName, 
                    tel: action.data.phoneNumber,
                    province: action.data.province,
                    district: action.data.district, 
                    address: action.data.address,   
                }
            case "UPDATE_AVATAR":
                return {
                    ...state,
                    avatar: action.avatar
                }
            case "SET_DATA_USER":
                console.log("action.data", action.data);
                return action.data;
            case "RESET_INFO_USER":
                return {}
            default:
                return state
        }
    }

export default infoUserReducer;