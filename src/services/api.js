import { API_BASE_URL } from "../configs/AppConfig";

const options = (method, data) => {
    let opt = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if (data) {
        opt.body = JSON.stringify(data);
    }
    return opt;
};
 const api = {
    clientes: {
        async Create({data}) {
            const response = await fetch(API_BASE_URL + '/clientes', options('POST', data));
            const responseData = await response.json();
            return responseData;
        },
        async Get({id}) {
            const response = await fetch(API_BASE_URL + '/clientes/' + id, options('GET'));
            const data = await response.json();
            return data;
        },
        async GetAll({query=''}) {
            const response = await fetch(API_BASE_URL + '/clientes' + query, options('GET'));
            const data = await response.json();
            return data;
        },
        async Update({data}) {
            const response = await fetch(API_BASE_URL + '/clientes', options('PUT', data));
            const responseData = await response.json();
            return responseData;
        },
        async Delete({id}) {
            const response = await fetch(API_BASE_URL + '/clientes/' + id, options('DELETE'));
            const data = await response.json();
            return data;
        },
    },
};


export default api;
