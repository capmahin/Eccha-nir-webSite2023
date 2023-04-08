import React,{useEffect,useState} from 'react'
import Layout from "../../components/Layout/Layout"
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from 'react-hot-toast';
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  //handle Form
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category',{name});
      if(data?.success){
        toast.success(`${name} is created`);
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  }

  //get all category
  const getAllCategory = async() =>{
    try {
      const {data} = await axios.get('/api/v1/category/get-category');
      if(data.success){
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  };

  useEffect(()=>{
    getAllCategory();
  },[])
  return (
    <Layout title={'Dashboard-Create Category'}>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Create Category</h1>
          <div className="p-3 w-50">
             <CategoryForm
             
             />
          </div>
          <div className="w-75">
          <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   
     {
      categories?.map(c =>(
        <>
        <tr>
        <td key={c._id}>{c.name}</td>
        <td><button className="btn btn-success">Edit</button></td>
        </tr>
        </>
      ))
     }
    
  </tbody>
</table>

          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default CreateCategory