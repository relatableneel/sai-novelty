"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/config";


export default function AdminPage() {


const [password,setPassword] =
useState("");

const [loggedIn,setLoggedIn] =
useState(false);


const [name,setName] =
useState("");

const [category,setCategory] =
useState("");

const [price,setPrice] =
useState("");

const [description,setDescription] =
useState("");

const [images,setImages] =
useState<File[]>([]);

const [loading,setLoading] =
useState(false);

const [products,setProducts] =
useState<any[]>([]);

const [adminSearch,setAdminSearch] =
useState("");

const filteredAdminProducts =
products.filter((item)=>

item.name
?.toLowerCase()
.includes(
adminSearch.toLowerCase()
)

);

const categories = [
"Earrings",
"Rings",
"Necklace",
"Kurtis",
"Dress",
"Bags",
"Accessories",
];



useEffect(()=>{


const saved =
localStorage.getItem("saiAdmin");


if(saved==="true"){

setLoggedIn(true);

getProducts();

}


},[]);



function login(){

if(password==="sai123"){

localStorage.setItem(
"saiAdmin",
"true"
);

setLoggedIn(true);

getProducts();

}
else{

alert("Wrong Password");

}

}

async function getProducts(){


const data =
await getDocs(
collection(db,"products")
);


setProducts(

data.docs.map((doc)=>(

{
id:doc.id,
...doc.data()
}

))

);


}

async function toggleAvailable(
id:string,
current:boolean
){


await updateDoc(

doc(db,"products",id),

{

available:!current

}

);


getProducts();


}





async function deleteProduct(
id:string
){


const confirmDelete =
confirm(
"Delete this product?"
);


if(!confirmDelete){
return;
}



await deleteDoc(

doc(db,"products",id)

);


getProducts();


}

async function saveProduct(){


if(loading){
return;
}


if(
!name ||
!category ||
!price ||
images.length===0
){

alert(
"Please fill all details"
);

return;

}



try{


setLoading(true);


const uploadedImages:string[]=[];


for(const image of images){


const compressedImage =
await imageCompression(
image,
{

maxSizeMB:1,

maxWidthOrHeight:1600,

useWebWorker:true,

}
);



const formData =
new FormData();



formData.append(
"file",
compressedImage
);


formData.append(
"upload_preset",
"sai_novelty"
);



const response =
await fetch(

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

collection(db,"products"),

{

name,
category,
price,
description,

images:uploadedImages,

available:true,

createdAt:
serverTimestamp(),

}

);



alert(
"Product Added Successfully 🌸"
);



setName("");
setCategory("");
setPrice("");
setDescription("");
setImages([]);


}

catch(error){

console.log(error);

alert(
"Upload failed. Try again."
);

}


finally{

setLoading(false);

}


}





if(!loggedIn){


return (

<main
className="
min-h-screen
bg-pink-50
flex
items-center
justify-center
p-5
text-gray-900
"
>


<div
className="
bg-white
p-6
rounded-3xl
shadow
w-full
"
>


<h1
className="
text-2xl
font-bold
text-center
text-pink-700
"
>

🌸 Sai Novelty

</h1>



<p
className="
text-center
text-gray-600
mt-2
"
>

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
text-gray-900
placeholder-gray-500
bg-white
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







return (

<main
className="
min-h-screen
bg-pink-50
p-5
text-gray-900
"
>


<div className="
flex
items-center
gap-3
">

<img
src="/logo.png"
className="
w-16
h-16
object-contain
"
/>

<div>

<h1 className="
text-2xl
font-bold
text-pink-700
">
Sai Novelty Admin
</h1>

<p className="
text-gray-500
text-sm
">
Manage your collection
</p>

</div>

</div>


<p
className="
text-gray-600
mt-1
"
>

Manage your collection

</p>




<div
className="
bg-white
rounded-3xl
shadow
p-5
mt-6
"
>



<h2
className="
font-semibold
text-lg
mb-4
text-gray-900
"
>

Add Product

</h2>




<input

placeholder="Product Name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="
border
rounded-xl
w-full
p-3
mb-3
text-gray-900
placeholder-gray-500
"

/>




<input

placeholder="Price ₹"

value={price}

onChange={(e)=>
setPrice(e.target.value)
}

className="
border
rounded-xl
w-full
p-3
mb-3
text-gray-900
placeholder-gray-500
"

/>




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
text-gray-900
bg-white
"

>


<option value="">
Select Category
</option>


{
categories.map((cat)=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

))
}


</select>





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
text-gray-900
placeholder-gray-500
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


<p
className="
text-pink-700
font-medium
"
>

📸 Add Product Photos

</p>


<p
className="
text-gray-600
text-sm
mt-2
"
>

{images.length} photos selected

</p>



<input

type="file"

accept="image/*"

multiple

className="hidden"

onChange={(e)=>{

if(e.target.files){

setImages(
Array.from(
e.target.files
)
);

}

}}

/>


</label>




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
<div
className="
bg-white
rounded-3xl
shadow
p-5
mt-6
"
>


<h2
className="
font-bold
text-lg
mb-4
text-gray-900
"
>

Manage Products

</h2>

<input

placeholder="Search products..."

value={adminSearch}

onChange={(e)=>
setAdminSearch(e.target.value)
}

className="
border
rounded-full
w-full
px-4
py-2
mb-4
text-gray-900
placeholder-gray-500
"

/>

<p className="text-gray-900">

Products: {products.length}

</p>

{
filteredAdminProducts.map((item:any)=>(


<div

key={item.id}

className="
border
rounded-2xl
p-3
mb-3
flex
gap-3
items-center
"
>


<img

src={item.images?.[0]}

className="
w-20
h-20
object-cover
rounded-xl
"

/>




<div className="flex-1">


<h3
className="
font-semibold
text-gray-900
text-sm
"
>

{item.name}

</h3>



<p
className="
text-sm
text-gray-600
"
>

₹ {item.price}

</p>



<p
className="
text-xs
text-gray-500
"
>

{item.category}

</p>



<p
className="
text-xs
font-medium
mt-1
"
>

{
item.available
?
"🟢 Available"
:
"🔴 Sold Out"
}

</p>





<div
className="
flex
gap-2
mt-2
"
>



<button

onClick={()=>
toggleAvailable(
item.id,
item.available
)
}

className="
bg-yellow-500
text-white
rounded-full
px-3
py-1
text-xs
"

>

{
item.available
?
"Sold Out"
:
"Available"
}

</button>





<button

onClick={()=>
deleteProduct(item.id)
}

className="
bg-red-500
text-white
rounded-full
px-3
py-1
text-xs
"

>

Delete

</button>



</div>


</div>


</div>


))

}



</div>

</main>

);

}