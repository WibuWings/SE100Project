const infoUserInitialState = {
    avatar: "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg",
    firstName: "Phước",
    lastName: "Lương",
    email: "aaaa",
    old: "21",
    gender: "male",
    storeName: "Phước Coffee",
    tel: "0387527010",
    province: "tinh_an_giang",
    district: "huyen_chau_phu",
    address: "43 QL 91, TT Cái Dầu",
    _id: ""
},

    infoUserReducer = (state = infoUserInitialState, action) => {
        switch (action.type) {
            case "UPDATA_DATA_USER":
                return {
                    ...state, 
                    _id: action.data._id,
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
            default:
                return state
        }
    }

export default infoUserReducer;