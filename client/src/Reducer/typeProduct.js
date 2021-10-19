
const typeProductInitialState = [
    {
        type: "rau",
        name: "Rau"
    },
    {
        type: "trai_cay",
        name: "Trái cây"
    }, 
],

    typeProductReducer = (state = typeProductInitialState, action) => {
        switch (action.type) {
            default:
                return state
        }
    }

export default typeProductReducer;