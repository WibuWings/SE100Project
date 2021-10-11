const infoUserInitialState = {
    avatar: null,
    firstName: "Phước",
    lastName: "Lương",
    email: "lngthinphc@gmail.com",
    old: "21",
    gender: "male",
    storeName: "Phước Coffee",
    tel: "0387527010",
    salary: "20000",
    province: "tinh_an_giang",
    district: "huyen_chau_phu",
    address: "43 QL 91, TT Cái Dầu"
},

    infoUserReducer = (state = infoUserInitialState, action) => {
        switch (action.type) {
            case "UPDATA_DATA_USER":
                return {
                    ...state, 
                    firstName: action.firstName, 
                    lastName: action.lastName,
                    old: action.old, 
                    gender: action.gender,
                    storeName: action.storeName, 
                    tel: action.tel,
                    salary: action.salary, 
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