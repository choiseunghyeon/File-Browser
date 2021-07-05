import axios from 'axios';

const request = async params => {
    const { method = "GET", url, body} = params;
    
    const config = {
        url,
        method,
        data: body,
    }

    return axios(config);
}
const get = async (url) => {
    const response = await request({
      url,
      method: "GET",
    });
  
    return response.data;
  };
  
const post = async (url, body) => {
const response = await request({
    url,
    method: "POST",
    body,
});

return response.data;
};

export default {
    get,
    post,
}