"use client";
import { useEffect, useState } from "react";

import { collection, getDocs } 
from "firebase/firestore";

import { db } from "@/firebase/config";
const categories = [
  "All",
  "Earrings",
  "Rings",
  "Necklace",
  "Kurtis",
  "Dress",
];



export default function Home() {
const [products, setProducts] =
useState<any[]>([]);

const [selectedCategory, setSelectedCategory] =
useState("All");
const categories = [
  "All",
  ...new Set(
    products.map(
      (item)=>item.category
    )
  )
];
const filteredProducts =

selectedCategory === "All"

?

products

:

products.filter(
  (item)=>
  item.category === selectedCategory
);

useEffect(()=>{
const filteredProducts =
selectedCategory === "All"

?

products

:

products.filter(
(item)=>
item.category === selectedCategory
);

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

function whatsappMessage(item:any){


  const message = 
`Hello Sai Novelty 🌸

I am interested in this product:

Product: ${item.name}
Category: ${item.category}

Please share price and availability.

Thank you 😊`;



  window.open(

    `https://wa.me/919173388079?text=${encodeURIComponent(message)}`,

    "_blank"

  );


}

  return (

    <main className="min-h-screen bg-[#fff5f8] pb-20">


      {/* Header */}

      <div className="
      bg-white
      p-5
      shadow-sm
      sticky
      top-0
      z-10
      ">


        <h1 className="
        text-3xl
        font-bold
        text-pink-700
        ">
          🌸 Sai Novelty
        </h1>


        <p className="
        text-sm
        text-gray-500
        mt-1
        ">
          by Sarika S Badgujar
        </p>


        <p className="
        text-sm
        mt-3
        text-gray-600
        ">
          Jewellery • Fashion • Accessories ✨
        </p>


        <input

        placeholder="Search your favourite collection..."

        className="
        mt-5
        w-full
        rounded-full
        border
        px-5
        py-3
        outline-none
        text-sm
        "

        />


      </div>




   {/* Categories */}

<div className="px-4 py-5">

  <h2 className="
  font-semibold
  mb-2
  text-gray-700
  ">
    Shop Categories
  </h2>


  <div className="
  grid
  grid-cols-3
  gap-3
  ">


    {categories.map((cat)=>(

<button

key={cat}

onClick={()=>
  setSelectedCategory(cat)
}

className="
      bg-white
      py-3
      rounded-2xl
      shadow
      text-sm
      "
      >

        {cat}

      </button>

    ))}

  </div>


</div>



      <div className="
      px-4
      flex
      justify-between
      items-center
      ">

        <h2 className="
        font-bold
        text-xl
        ">
          New Arrivals 💕
        </h2>

        <p className="
        text-xs
        text-pink-600
        ">
          Latest Collection
        </p>


      </div>




      {/* Products */}


      <div className="
      grid
      grid-cols-2
      gap-4
      p-4
      ">


        {filteredProducts.map((item)=>(

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


            <span className="
            absolute
            top-2
            left-2
            bg-pink-600
            text-white
            text-xs
            px-3
            py-1
            rounded-full
            ">
              New
            </span>



<img

src={item.images[0]}

className="
h-36
w-full
object-cover
"

/>



            <div className="p-3">


              <h3 className="
              font-semibold
              text-sm
              ">
                {item.name}
              </h3>


              <p className="
              text-xs
              text-gray-400
              ">
                {item.code}
              </p>


              <p className="
              text-xs
              text-gray-500
              ">
                {item.category}
              </p>



              <button

onClick={()=>whatsappMessage(item)}

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

                💬 Ask Price

              </button>


            </div>


          </div>


        ))}


      </div>


{/* Footer */}

<footer className="
bg-white
mx-4
mt-6
mb-6
rounded-3xl
p-5
text-center
shadow
">

  <h2 className="
  text-xl
  font-bold
  text-pink-700
  ">
    🌸 Sai Novelty
  </h2>


  <p className="
  text-sm
  text-gray-500
  mt-1
  ">
    by Sarika S Badgujar
  </p>


  <p className="
  text-sm
  text-gray-600
  mt-4
  ">
    Jewellery • Dresses • Accessories ✨
  </p>



<p className="
mt-6
font-semibold
text-pink-700
text-base
">
  🛍️ Visit Our Shop
</p>


<p className="
mt-3
leading-relaxed
">
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



  <p className="
  text-xs
  text-gray-400
  mt-5
  ">
    New Collections Added Regularly ✨
  </p>


  <p className="
  text-xs
  text-gray-400
  mt-2
  ">
    © 2026 Sai Novelty
  </p>


</footer>
      
    </main>

  );

}