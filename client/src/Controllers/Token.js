import axios from 'axios'

const RestApiToken = (token) => {
    axios.post(`http://localhost:5000`, {token: token})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log("lỗi");
        })
}

export default RestApiToken