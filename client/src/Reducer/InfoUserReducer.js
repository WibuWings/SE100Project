const infoUserInitialState = {
    avatar: null,
    firstName: "Phước",
    lastName: "Lương",
    email: "aaaa",
    old: "21",
    gender: "male",
    storeName: "Phước Coffee",
    tel: "0387527010",
    province: "tinh_an_giang",
    district: "huyen_chau_phu",
    address: "43 QL 91, TT Cái Dầu"
},

    infoUserReducer = (state = infoUserInitialState, action) => {
        switch (action.type) {
            case "UPDATA_DATA_USER":
                return {
                    ...state, 
                    email: action.email,
                    firstName: action.firstName, 
                    lastName: action.lastName,
                    old: action.old, 
                    gender: action.gender,
                    storeName: action.storeName, 
                    tel: action.tel,
                    province: action.province,
                    district: action.district, 
                    address: action.address,    
                }
            case "UPDATE_AVATAR":
                return{
                    ...state,
                    avatar: action.avatar
                }
            default:
                return state
        }
    }

export default infoUserReducer;