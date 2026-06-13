"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } 
from "firebase/firestore";

import { db } from "@/firebase/config";

export default function AdminPage() {


  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

const [category, setCategory] = useState("");

const [description, setDescription] = useState("");

const [images, setImages] = useState<File[]>([]);
const [loading, setLoading] = useState(false);
const categories = [
  "Earrings",
  "Rings",
  "Necklace",
  "Kurtis",
  "Dress",
  "Bags",
  "Accessories",
];

async function saveProduct() {
if(loading){
  return;
}

setLoading(true);

  if(!name || !category || images.length === 0){

    alert("Please fill product details");

    return;

  }


  const uploadedImages:string[] = [];


  for(const image of images){


    const formData = new FormData();


    formData.append(
      "file",
      image
    );


    formData.append(
      "upload_preset",
      "sai_novelty"
    );



    const response = await fetch(

      "https://api.cloudinary.com/v1_1/drapihrhf/image/upload",

      {

        method:"POST",

        body:formData,

      }

    );



    const data =
      await response.json();



    uploadedImages.push(
      data.secure_url
    );


  }



await addDoc(
  collection(db, "products"),
  {

    name:name,

    category:category,

    description:description,

    images:uploadedImages,

    available:true,

    createdAt:serverTimestamp(),

  }
);



alert("Product Added Successfully 🌸");


setName("");

setCategory("");

setDescription("");

setImages([]);
setLoading(false);


}

useEffect(()=>{

  const savedLogin =
    localStorage.getItem("saiAdmin");


  if(savedLogin === "true"){

    setLoggedIn(true);

  }


},[]);

  function login() {


    if (password === "sai123") {

      localStorage.setItem(
        "saiAdmin",
        "true"
      );


      setLoggedIn(true);

    } else {

      alert("Wrong Password");

    }

  }



  if (loggedIn) {


  return (

    <main className="
    min-h-screen
    bg-pink-50
    p-5
    ">


      <h1 className="
      text-2xl
      font-bold
      text-pink-700
      ">

        🌸 Sai Novelty Admin

      </h1>


      <p className="
      text-gray-500
      mt-1
      ">

        Manage your collection

      </p>



      <div className="
      bg-white
      rounded-3xl
      shadow
      p-5
      mt-6
      ">


        <h2 className="
        font-semibold
        text-lg
        mb-4
        ">

          Add Product

        </h2>



<select

value={category}

onChange={(e)=>
  setCategory(e.target.value)
}

className="
border
rounded-xl
w-full
p-3
mb-3
bg-white
"

>


<option value="">
Select Category
</option>


{categories.map((cat)=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

))}


</select>



        <input

placeholder="Product Name"

value={category}

onChange={(e)=>
  setCategory(e.target.value)
}

className="
border
rounded-xl
w-full
p-3
mb-3
"

/>



        <textarea

        placeholder="Description"
value={description}

onChange={(e)=>
 setDescription(e.target.value)
}
        className="
        border
        rounded-xl
        w-full
        p-3
        mb-3
        "

        />



<label
className="
block
border-2
border-dashed
border-pink-300
rounded-2xl
p-6
text-center
mb-4
cursor-pointer
bg-pink-50
"
>


<span className="
text-pink-700
font-medium
">

📸 Add Product Photos

</span>


<p className="
text-sm
text-gray-500
mt-2
">

{images.length} photos selected

</p>


<input

type="file"

accept="image/*"

multiple

className="hidden"

onChange={(e)=>{

  if(e.target.files){

const selectedImages =
  Array.from(e.target.files);


if(selectedImages.length > 5){

  alert("Maximum 5 photos allowed");

  return;

}


setImages(selectedImages);

  }

}}

/>


</label>


<button>
Save Product
</button>



<button

disabled={loading}

onClick={saveProduct}

className="
bg-pink-600
text-white
rounded-full
py-3
w-full
disabled:opacity-50
"

>

{
loading
?
"Uploading Photos..."
:
"Save Product"
}

</button>



      </div>


    </main>

  );

}




  return (


    <main className="
    min-h-screen
    bg-pink-50
    flex
    items-center
    justify-center
    p-5
    ">


      <div className="
      bg-white
      p-6
      rounded-3xl
      shadow
      w-full
      ">


        <h1 className="
        text-2xl
        font-bold
        text-center
        text-pink-700
        ">

          🌸 Sai Novelty

        </h1>



        <p className="
        text-center
        text-gray-500
        mt-2
        ">

          Admin Login

        </p>




        <input

        type="password"

        placeholder="Enter Password"

        value={password}

        onChange={(e)=>
          setPassword(e.target.value)
        }

        className="
        border
        rounded-full
        w-full
        mt-6
        px-5
        py-3
        outline-none
        "

        />



        <button

        onClick={login}

        className="
        bg-pink-600
        text-white
        w-full
        mt-5
        rounded-full
        py-3
        "

        >

          Login

        </button>



      </div>


    </main>

  );


}