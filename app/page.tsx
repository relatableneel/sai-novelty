"use client";

import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";


export default function Home() {


const [products,setProducts] =
useState<any[]>([]);


const [selectedCategory,setSelectedCategory] =
useState("All");


const [search,setSearch] =
useState("");

const [openImages,setOpenImages] =
useState<string[]>([]);

const [imageIndex,setImageIndex] =
useState(0);


useEffect(()=>{


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



getProducts();


},[]);





const categories = [

"All",

...new Set(

products.map(
(item)=>item.category
)

)

];




const filteredProducts =
products.filter((item)=>{


const categoryMatch =
selectedCategory==="All" ||
item.category===selectedCategory;


const searchMatch =
item.name
?.toLowerCase()
.includes(
search.toLowerCase()
);


return (
categoryMatch &&
searchMatch
);


});







function whatsappMessage(item:any){


const message =
`જય શ્રી કૃષ્ણ 🌸

મને આ પ્રોડક્ટ વિશે માહિતી જોઈએ છે:

🛍️ પ્રોડક્ટ: ${item.name}
📂 કેટેગરી: ${item.category}
💰 કિંમત: ₹${item.price}

📸 પ્રોડક્ટ ફોટો:
${item.images?.[0]}

આ પ્રોડક્ટ ઉપલબ્ધ છે?

આભાર 😊`;



window.open(

`https://wa.me/919173388079?text=${encodeURIComponent(message)}`,

"_blank"

);


}






return (

<main
className="
min-h-screen
bg-[#fff5f8]
pb-20
text-gray-900
"
>




{/* Header */}

<div
className="
bg-white
p-5
shadow-sm
sticky
top-0
z-10
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
w-20
h-20
object-contain
"
/>

<div>

<h1 className="
text-3xl
font-bold
text-pink-700
">
Sai Novelty
</h1>


<p className="
text-sm
text-gray-500
">
by Sarika S Badgujar
</p>

</div>

</div>




<p
className="
text-sm
mt-3
text-gray-700
"
>

Jewellery • Fashion • Accessories ✨

</p>




<input

placeholder="Search your favourite collection..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="
mt-5
w-full
rounded-full
border
px-5
py-3
outline-none
text-sm
bg-white
text-gray-900
placeholder-gray-500
"

/>


</div>








{/* Categories */}

<div className="px-4 py-5">


<h2
className="
font-semibold
mb-2
text-gray-800
"
>

Shop Categories

</h2>




<div
className="
grid
grid-cols-3
gap-3
"
>


{
categories.map((cat)=>(


<button

key={cat}

onClick={()=>
setSelectedCategory(cat)
}

className={`
py-3
rounded-2xl
shadow
text-sm
font-medium

${selectedCategory===cat

?
"bg-pink-600 text-white"

:

"bg-white text-gray-900"

}

`}

>

{cat}

</button>


))

}


</div>


</div>







<div
className="
px-4
flex
justify-between
items-center
"
>


<h2
className="
font-bold
text-xl
text-gray-900
"
>

New Arrivals 💕

</h2>



<p
className="
text-xs
text-pink-600
"
>

Latest Collection

</p>


</div>







{/* Products */}


<div
className="
grid
grid-cols-2
gap-4
p-4
"
>


{
filteredProducts.map((item:any)=>(


<div

key={item.id}

className="
bg-white
rounded-3xl
overflow-hidden
shadow-md
relative
"
>



<span
className="
absolute
top-2
left-2
bg-pink-600
text-white
text-xs
px-3
py-1
rounded-full
"
>

{
item.available
?
"New"
:
"Sold Out"
}

</span>




<img

src={item.images?.[0]}

onClick={()=>{

setOpenImages(item.images);

setImageIndex(0);

}}

className="
h-36
w-full
object-cover
cursor-pointer
"

/>




<div className="p-3">


<h3
className="
font-semibold
text-sm
text-gray-900
"
>

{item.name}

</h3>




<p
className="
text-xs
text-gray-600
"
>

{item.category}

</p>




<p
className="
text-pink-600
font-bold
mt-1
"
>

₹ {item.price}

</p>





{
item.available
?
(

<button

onClick={()=>
whatsappMessage(item)
}

className="
mt-3
w-full
bg-green-500
text-white
rounded-full
py-2
text-xs
font-medium
"

>

💬 Enquire

</button>

)

:

(

<button

disabled

className="
mt-3
w-full
bg-gray-400
text-white
rounded-full
py-2
text-xs
font-medium
"

>

Sold Out

</button>

)

}



</div>


</div>


))

}


</div>









<footer
className="
bg-white
mx-4
mt-6
mb-6
rounded-3xl
p-5
text-center
shadow
text-gray-900
"
>

<h2
className="
text-xl
font-bold
text-pink-700
"
>

🌸 Sai Novelty

</h2>

<p
className="
text-gray-600
text-sm
mt-1
"
>

by Sarika S Badgujar

</p>

<p
className="
mt-6
font-semibold
text-pink-700
"
>

🛍️ Visit Our Shop

</p>



<p
className="
mt-3
leading-relaxed
text-gray-700
"
>

📍 115, Shiv-Shakti Row House,<br/>
Pardi-Kande, Sachin,<br/>
Surat - 394230

</p>




<a

href="https://wa.me/919173388079"

target="_blank"

className="
block
mt-5
bg-green-500
text-white
py-3
rounded-full
font-medium
"

>

💬 Contact on WhatsApp

</a>



<p
className="
text-xs
text-gray-500
mt-5
"
>

New Collections Added Regularly ✨

</p>


</footer>

{
openImages.length > 0 && (

<div
className="
fixed
inset-0
bg-black/90
z-50
flex
items-center
justify-center
"
>


<button

onClick={()=>
setOpenImages([])
}

className="
absolute
top-5
right-5
text-white
text-3xl
"
>

×


</button>



<img

src={openImages[imageIndex]}

className="
max-h-[80vh]
max-w-[90vw]
rounded-xl
"

/>



{openImages.length > 1 && (

<div
className="
absolute
bottom-8
flex
gap-8
"
>


<button

onClick={()=>
setImageIndex(
imageIndex===0
?
openImages.length-1
:
imageIndex-1
)
}

className="
text-white
text-3xl
"
>

←

</button>



<button

onClick={()=>
setImageIndex(
imageIndex===openImages.length-1
?
0
:
imageIndex+1
)
}

className="
text-white
text-3xl
"
>

→

</button>


</div>

)}


</div>

)
}

</main>


);


}