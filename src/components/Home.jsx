import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RssFeed from "./rssfeed";
import axios from "axios";
import Countratings from "./Countratings";
import Countusers from "./Countusers";
import CitySelector from "./MapComponents/CitySelector";
import CategorySelector from "./MapComponents/CategorySelector";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSearch() {
    navigate("/map", {
      state: { city: selectedCity, category: selectedCategory },
    });
  }

  return (
    <div className="flex flex-col items-top justify-center p-4">
      <div>
        <div className="flex flex-col items-center justify-center"></div>
        <div className="pb-1 container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="w-full text-left p-4 sm:p-8 relative">
            <h1 className="font-poppins font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-black mb-4 sm:mb-8">
              Willkommen auf InclusiveTRIP
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-left ml-8 mt-[-24]">
            <div className="hidden lg:flex flex-col items-center text-center p-4 w-1/4 sm:w-1/6 h-auto font-poppins font-medium text-[20px] sm:text-[32px] leading-[30px] sm:leading-[48px] text-[#1E1E1E]">
              <div className="text-[20px] sm:text-[32px] leading-[30px] sm:leading-[48px]">
                <Countratings />
              </div>
              <div className="text-[12px] sm:text-[18px] leading-[18px] sm:leading-[27px] mt-2 ml-4 sm:ml-0">
                Bewertungen
              </div>
            </div>
            <div className="hidden lg:block w-1/12 h-[0px] border border-[#1E1E1E] rotate-90 mx-6 mt-10"></div>
            <div className="hidden lg:flex flex-col items-center text-center p-4 w-[50px] sm:w-[80px] h-auto font-poppins font-medium text-[20px] sm:text-[32px] leading-[30px] sm:leading-[48px] text-[#1E1E1E]">
              <div className="text-[20px] sm:text-[32px] leading-[30px] sm:leading-[48px]">
                <Countusers />
              </div>
              <div className="text-[12px] sm:text-[18px] leading-[18px] sm:leading-[27px] mt-2">
                Benutzer
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-4 sm:mt-8 p-2 sm:p-4 gap-4 sm:gap-6 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-left space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              <div className="p-2 sm:p-4 w-full sm:w-auto">
                <CitySelector
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              </div>
              <div className="p-2 sm:p-4 w-full sm:w-auto">
                <CategorySelector
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              <div className="p-2 sm:p-4 w-full sm:w-auto">
                <button
                  className="btn btn-outline bg-yellow-400 mt-4 sm:mt-7 w-auto"
                  onClick={handleSearch}
                >
                  Suchen
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-8 p-4 gap-6">
          <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
            <img
              className="w-[66px] h-[66px]"
              src="../images/Icon_Barrierefilter.png"
              alt="Barrierefilter"
            />
            <p className="font-poppins font-bold text-[18px] text-[#000000]">
              Barrierefilter
            </p>
            <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
              Finde den idealen Ort für deinen Ausflug, indem du nach deinen
              individuellen Bedürfnissen filterst.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
            <img
              className="w-[66px] h-[66px]"
              src="../images/Icon_Umkreissuche.png"
              alt="Umkreissuche"
            />
            <p className="font-poppins font-bold text-[18px] text-[#000000]">
              Umkreissuche
            </p>
            <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
              In welche Stadt möchtest du reisen?
            </p>
          </div>

          <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
            <img
              className="w-[66px] h-[66px]"
              src="../images/Icon_Locationfilter.png"
              alt="Locationfilter"
            />
            <p className="font-poppins font-bold text-[18px] text-[#000000]">
              Locationsfilter
            </p>
            <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
              Welche Orte möchtest du besuchen?
            </p>
          </div>
        </div>
        <p className="mt-20 p-4 font-medium font-poppins text-[rgba(30,30,30,0.5)]">
          InclusiveTRIP hilft dir, öffentliche Orte wie Restaurants, Kinos,
          Museen und vieles mehr hinsichtlich ihrer Barrierefreiheit oder
          anderer Kriterien zu bewerten und passende Locations zu finden. Unsere
          App ermöglicht es dir, Orte zu entdecken und zu bewerten, um anderen
          Menschen mit ähnlichen Bedürfnissen zu helfen, die besten Orte für
          ihren nächsten Städtetrip zu finden.
          <br />
          <br />
          Egal, ob du Rollstuhlfahrer, gehörlos, sehbeeinträchtigt oder auch mit
          einem Kinderwagen unterwegs bist oder ein Haustier dabei hast –
          InclusiveTRIP ist das Werkzeuge, um sicherzustellen, dass deine
          Umgebung zugänglich und inklusiv ist. Deine Bewertungen und
          Erfahrungen tragen dazu bei, eine Gemeinschaft zu schaffen, die
          Barrierefreiheit zur Priorität macht. Entdecke, bewerte und teile
          deine Erfahrungen mit Orten mit InclusiveTRIP!
        </p>
        <h1 className="font-poppins font-bold text-[18px] text-center pt-12 text-[#000000]">
          Blog Einträge
        </h1>
        <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center pt-2">
          {" "}
          Informiere dich über aktuelle Themen rund um das Thema Inklusion.
        </p>
        <div className="container mx-auto w-full mt-8">
          <div className="bg-[#C1DCDC] rounded-[24px] p-4">
            <div className="w-full text-left p-8 bg-white rounded-[24px]">
              <RssFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
