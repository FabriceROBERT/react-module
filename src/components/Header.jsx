import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Header() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((res) => {
        const cards = res.data.data.slice(0, 70);
        setCards(cards);
        console.log(cards);
        console.log(res.data.data);

        setPrevUrl(res.data.previous);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, []);

  const filteredCards = cards.filter((card) => {
    return (
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.id.toString().includes(searchQuery)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-5xl text-white my-10">Cards list</h1>
      <div className="space-x-5 my-5 text-white bg-fuchsia-800 shadow-lg   px-5 py-2 rounded">
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          id="search"
          className="p-2 rounded border text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="flex flex-row flex-wrap gap-10 justify-center items-center w-full h-screen overflow-y-auto">
        {filteredCards.map((card) => (
          <li
            className="p-5 mb-10 bg-fuchsia-900 shadow-2xl text-white rounded-md py-5 w-[250px] h-[450px] flex flex-col items-center"
            key={card.id}
          >
            <h2 className="text-center text-lg">{card.name}</h2>
            <div className="relative mb-24 w-[200px] h-[200px]">
              <img src={card.card_images[0].image_url} alt={card.name} />
            </div>
            <Link
              className="hover:bg-fuchsia-800 mt-5 rounded shadow-md bg-fuchsia-700 justify-center p-3 text-center"
              to={`/card/${card.id}`}
            >
              More view
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
