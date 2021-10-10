const infoUserInitialState = {
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
    address:"43 QL 91, TT Cái Dầu"
},

infoUserReducer = (state = infoUserInitialState, action) => {
    switch(action.type) {
        case "UPDATA_DATA_USER":
            return  {...state,test: action.test, province: action.province}
        default:
            return state
    }
}

export default infoUserReducer;