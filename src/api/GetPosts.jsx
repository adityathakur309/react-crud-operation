import axios from "axios";

// create instance 
let api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/"
})
// end 

// get method of axios
export const getPosts = async()=>{
    let res =await api.get("posts");
    let data = res.data;
    return data;

}
// end 
// delete method for delete post 
export const deletePost =  async(id) =>{
 return api.delete(`posts/${id}`)
    
}
// end 

// post method in crud 
export const postData = async (post) =>{
    return api.post("posts",post)
}
// end 

// update post with put method 
export const updatePostData = (id,post) =>{
    return api.put(`posts/${id}`,post)
}
// end 