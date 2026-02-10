"use client"
import Image from "next/image";
import React from "react";
import './globals.css'
import { mong } from "./[slug]/page";
import Back from "./com/back";
 import { useState,useEffect } from "react";
 import Link from "next/link";
 // import Lottie from 'lottie-react';
 // import { Player, Controls } from '@lottiefiles/react-lottie-player';
import dynamic from "next/dynamic";

const Back = dynamic(() => import("./com/back"), { ssr: false });

 import { bt } from "./[slug]/page";
export default function Home() {
  const [first, setfirst] = useState({url:"",short:""})
  const [se,k] = useState("",false)
  const[s,a]= useState([])
  const[l,sl] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("items"))
   gt();
  }, [])
  const gt = async () => {
 sl("Loading");   
let u= JSON.parse(localStorage.getItem("items"))||[]
console.log(u)
if(u.length==0){
  sl("Not Found");
  return;
}
// console.log(u)
  // sl("")
  const urls = u.map((item) => `http://localhost:3000/${item.short}`);
  a(urls);  
 };
  const hand = (e)=>{
    setfirst({...first,[e.target.name]:e.target.value})
  }
  const get =async()=>{
    if(first.url =="" || first.short==""){
      alert("please fill the requird filled")
      return;
    }
const old = JSON.parse(localStorage.getItem("items")) || [];
localStorage.setItem("items", JSON.stringify([...old, first]));
  const y = await mong(first.url,first.short);
   console.log(y);
   alert("sucessfullly short your url")
   k(`http://localhost:3000/${first.short}`,true)
   setfirst({url:"",short:""})
   gt(1);
  }
   const ty = ()=>{
      k(false)
    } 
   return (
     <>
  <div className="container">
  <Back />

  <div className="card">
    <div className="logo">
      <Player autoplay loop src="/gs.json" />
    </div>

    <div className="inputs">
      <input
        name="url"
        value={first.url}
        onChange={hand}
        type="text"
        placeholder="Enter long URL"
      />

      <input
        name="short"
        value={first.short}
        onChange={hand}
        type="text"
        placeholder="Enter short name"
      />
    </div>

    <button className="btn" onClick={get}>Shorten URL</button>

    <div className="list">
      {s.map((item, i) => (
        <div className="urlCard" key={i}>
          <p>{item}</p>
          <Link href={item}>
            <button className="openBtn">Open</button>
          </Link>
        </div>
      ))}
    </div>
      {l !=="" && <h2 style={{border:'solid', color:'white',marginTop:'10px',borderRadius:'20px',boxShadow:'2px 2px 15px'}}>{l}</h2>}
  </div>
</div>
     </>
  );
}
