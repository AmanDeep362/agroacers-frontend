import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon
} from "react-share";
import "../../Styles/cropdetails.css"
import Loader from "../Loader";
import axios from "axios";
import SimilarProduct from "./MorePageBlog";
import CommentBox from "../../CommentBox/CommentBox";
import ReactQuill from "react-quill";

const CRopDetails = (e) => {

    const { id } = useParams();
    const [blogData,setblogData] = useState([]);
    const [IsLoading,setIsLoading] = useState(false);    
    const [userData, setUserData] = useState({});
   
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () =>{
            if(id){
                const {data} = await axios.get("/cropdata/" + id);
                setblogData(data);
                setIsLoading(true);
            }
        }
        fetchdata();
        window.scroll(0,0)

    }, [id]);
    
    const deleteBlog = async ()=>{
            const id = blogData._id;
            console.log(blogData._id);
            const res =  await fetch("/deleteBlog" ,{
      method : "POST",
      headers : { 
          "content-Type" : "application/json"
      },
      body : JSON.stringify({
          id
      })
    })
    if(res.status===200){
        window.alert("blog is")
        navigate("/crops", { replace: true });
    }
  }
    
  const EDITBLOG = ()=>{
        const [changeBlog,setchangeBlog] =useState({
            title:blogData.title,Image:blogData.Image
        })
        const [Quill,setQuill]=useState({
            Description:blogData.Description
                })
        console.log(Quill);
        const postChanges = async ()=>{
            const id = blogData._id
            const {title,Image} = changeBlog;
            const Description = Quill;
            console.log(blogData._id);
            const res =  await fetch("/updateBlog" ,{
                method : "POST",
                headers : { 
                  "content-Type" : "application/json"
                },
                body : JSON.stringify({
                  id,title,Description,Image
                })
            })
            if(res.status===200){
            window.alert("blog is Updated")
            window.location.reload()
            }
        }
        
        if(userData.isAdmin===true){
          return(
                <>
                <div className="admin-btn-container">
            
                <button type="button" style={{margin:"20px"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa fa-edit"></i>  Edit this Blog
                </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form method="POST" >
                            <label htmlFor="title">Title :</label> <br />
                          <input style={{width:"90%"}} type="text" defaultValue={blogData.title} onChange={(e)=>{setchangeBlog({...changeBlog,[e.target.name]:e.target.value})}} placeholder="ENTER THE TITLE..."  name="title"  id="title" /> <br />
                            <label htmlFor="title">Image :</label><br />
                          <input style={{width:"90%"}} defaultValue={blogData.Image} onChange={(e)=>{setchangeBlog({...changeBlog,[e.target.name]:e.target.value})}} type="text" placeholder="add img url"   name="Image"  id="title" /><br />
                          <label htmlFor="description">Description :</label>
                          <ReactQuill style={{width:"90%"}}   defaultValue={blogData.Description} className="description" onChange={(e)=>{setQuill(e);}}         theme="snow"/>
                        
                        
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" onClick={postChanges} className="btn btn-primary">Save changes</button>
                        </div>
                        </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" style={{margin:"20px"}} className="btn btn-danger admin-access-btn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                  <i className="fa fa-trash"></i>  Delete this Blog
                  </button>

                  <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel2">Delete Blog</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        Do you want to Delete the Blog?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button onClick={deleteBlog} type="button" className="btn btn-primary">Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
                </>
            )
        }
        else{
            return(
                <>
                </>
            )
        }
    }
   
 useEffect(()=>{
   
    const callAboutPage = async () => {
        try {
            const res = await fetch('/aboutuser', {
                method: "GET",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
           
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);

            
        }
    }
    callAboutPage();
 },[])
    

    
  

    useEffect(() => {
       const mountdesc = () => {
          if (IsLoading) {
            // console.log("Render The Description");
            document.getElementById("crop-blog-description").innerHTML = blogData.Description;
          }
       }
       mountdesc()
    }, [blogData.Description, IsLoading])
   
    if(!IsLoading){
      return(
        <Loader />
      )
    }
      
    return(
        <>
        <div className="crop-blog-container">
            <div className="crop-blog-header">
                <h1>{blogData.title}</h1>
                <p><cite>Last Updated : {blogData.time}</cite></p>
            </div>

            <div className="crop-blog-image-container">
                {/* Image of Crop  */}
                <img className="img-fluid" src={blogData.Image} alt={blogData.title} />
            </div>
                {/* Share Area of Crop  */}
                <div className="share-blog-container">

                    <FacebookShareButton style={{marginRight:"2%"}} url={window.location.href} >
                        <FacebookIcon  size={50} round={true}/>
                    </FacebookShareButton>

                    <WhatsappShareButton  style={{marginRight:"2%"}} url={window.location.href} >
                        <WhatsappIcon size={50} round={true}/>
                    </WhatsappShareButton>

                    <TwitterShareButton style={{marginRight:"2%"}}  url={window.location.href}  hashtags="#kisan #AgroAcers #website for helping India">
                        <TwitterIcon  size={50} round={true} />
                    </TwitterShareButton>

                    <LinkedinShareButton  style={{marginRight:"2%"}} url={window.location.href} >
                        <LinkedinIcon  size={50} round={true}/>
                    </LinkedinShareButton>

                    <EmailShareButton  style={{marginRight:"2%"}} url={window.location.href} >
                        <EmailIcon  size={50} round={true}/>
                    </EmailShareButton>

                    <TelegramShareButton url={window.location.href} >
                        <TelegramIcon  size={50} round={true}/>
                    </TelegramShareButton>
                </div>

              
            <div id="crop-blog-description" className="crop-blog-des-containior">
                {blogData.Description}
            </div>

            <hr />

            <div className="author-details">
              <h3>Article Contributed by : </h3>
              <span className="Author-name"><img style={{width:"3%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWp0MYJDYDd4v9GVzKp4wdx6MoIv-qeQdSwg&usqp=CAU" alt="USER" /> {blogData.Author}</span>
            </div>
            <EDITBLOG/>
            <hr />
            {/* More Products  */}
           <CommentBox Cropname={blogData.title}/>
            <SimilarProduct category={blogData.category} title={blogData.title} />
        </div>
        
        </>
    );
}

export default CRopDetails;






