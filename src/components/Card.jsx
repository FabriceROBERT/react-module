import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Card() {
  const { id } = useParams();
  const [cardInfo, setCardInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
      .then((res) => {
        setCardInfo(res.data.data[0]);
        console.log(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, [id]);

  if (!cardInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-5 items-center justify-center w-full h-screen">
        <div className="">
          <div className="relative mb-20 w-[200px] h-[200px]">
            <img src={cardInfo.card_images[0].image_url} alt={cardInfo.name} />
          </div>
        </div>
        {/* Deuxieme Carte */}
        <div className="p-5 bg-fuchsia-900 shadow-lg text-white rounded-md py-5 w-[600px] h-[350px] flex flex-col items-center">
          <h2 className="text-center text-2xl font-bold underline mb-10">
            {cardInfo.name}
          </h2>
          <div className="flex flex-col items-center">
            {cardInfo.atk && cardInfo.def ? (
              <div className="flex flex-col items-center">
                <span> Attack : {cardInfo.atk} </span>
                <span> Defense : {cardInfo.def} </span>
                <span> Attribute : {cardInfo.attribute} </span>
                <span> Level : {cardInfo.level} </span>
                <span> Type : {cardInfo.type} </span>
                <span> Race : {cardInfo.race} </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span> Type : {cardInfo.type} </span>
                <span> Race : {cardInfo.race} </span>
              </div>
            )}
          </div>
          <div className="overflow-y-auto">
            <h5 className="mt-5">Description :</h5>
            <p className="text-sm">{cardInfo.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
