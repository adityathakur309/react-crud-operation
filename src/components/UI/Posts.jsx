import { memo, useState } from "react"
import { Card } from "./Card"
import { Form } from "..//UI/Form"
export  const Posts = memo(({posts,setPosts}) =>{
    let [updateDataApi,setUpdateDataApi] = useState({});

    

    return (
        <div>
           <Form posts={posts} setPosts={setPosts} updateDataApi={updateDataApi.post} setUpdateDataApi={setUpdateDataApi}/>

            <ol className="flex gap-5 flex-wrap">
                {posts.map((post) => {
                    return <Card key={post.id} post={post} posts={posts} setPosts={setPosts}  setUpdateDataApi={setUpdateDataApi}/>
                })}

            </ol>
        </div>
    )
})