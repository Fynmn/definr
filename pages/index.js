import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import data from "../src/data.json";
import Modal from "../components/Modal";
import { ModalContext } from "../contexts/ModalContext";
import { FaGithub } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";

export default function Home() {
  var difflib = require("difflib");

  // function to output the meaning of the word that the user wants to search
  // this function has a word parameter which takes in the word that the user wants to search
  async function renderMeaning(word) {
    // checks if the word is in our json file
    if (Object.keys(data).includes(word)) {
      return data[word];
      // if not, it checks if the word has close matches
    } else if (difflib.getCloseMatches(word, Object.keys(data)).length > 0) {
      // asks the user if the user wanted to search for the closest match of the word
      const ans = prompt(
        "Do you mean " +
          JSON.stringify(difflib.getCloseMatches(word, Object.keys(data))[0]) +
          "? (Type 'yes' or 'no')"
      );
      // checks if the user responds, 'yes'
      if (ans == "yes") {
        setInput(difflib.getCloseMatches(word, Object.keys(data))[0]);
        return data[difflib.getCloseMatches(word, Object.keys(data))[0]];
        // checks if the user responds, 'no'
      } else if (ans == "no") {
        return ["The word you entered doesn't exist. Please double check it."];
        // this executes if the user responds neither 'yes' or 'no'
      } else {
        return ["We didn't understand your entry. Please search again."];
      }
      // this executes if the word is not in the json file and doesn't have any close matches
    } else {
      return ["The word you entered doesn't exist. Please double check it."];
    }
  }

  const [input, setInput] = useState();
  const [meaning, setMeaning] = useState();
  const [nullInput, setNullInput] = useState(false);
  const { value, setValue } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input && input.length > 0) {
      const output = await renderMeaning(input.toLowerCase());
      setMeaning(output);
    } else {
      // toggleValue();
      setValue(true);
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/dictionary.png" />
        <title>Definr</title>
      </Head>
      {value ? <Modal></Modal> : null}
      {/* Search */}
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="w-full bg-blue-800 h-20 flex flex-col items-center justify-center text-white py-16 gap-y-2">
            <h1 className="text-2xl font-semibold font-voces">Definr</h1>
            <h2 className="font-light font-voces opacity-80">
              Your Online Lexical Guide
            </h2>
          </div>
          <div className="mt-20 flex flex-col justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center items-center space-x-2 px-8"
            >
              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter a word to search"
                className="font-voces input input-bordered input-primary w-full max-w-xs border-4 border-blue-800 p-2 placeholder-gray-400 placeholder-opacity-50"
                onChange={(e) => setInput(e.target.value)}
              />
              {/* Search Button */}
              <input
                type="submit"
                value="Search"
                className="font-voces w-52 p-2 rounded-lg text-white bg-blue-800 hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-900"
              />
            </form>
            {/* <Modal></Modal> */}
          </div>
          {/* End of Search */}

          <div className="py-8 mb-16 px-8">
            {meaning == null || input.length == 0 ? (
              <div></div>
            ) : (
              <div className="mb-4 flex justify-center items-center">
                <div className="card bg-base-100 shadow-xl border-2 border-gray-100 w-96">
                  <div className="card-body">
                    <h2 className="font-voces card-title text-blue-800">
                      {input && input}
                    </h2>
                  </div>
                </div>
              </div>
            )}

            {/* Meaning */}
            {meaning == null || input.length == 0 ? (
              <div></div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl border-2 border-gray-100">
                  <div className="card-body">
                    {input && input ? (
                      meaning &&
                      meaning.map((meaning, i) =>
                        meaning ===
                        "The word you entered doesn't exist. Please double check it." ? (
                          <div className="flex flex-row">
                            <div key={i} className="font-voces text-red-500">
                              {meaning}
                            </div>
                          </div>
                        ) : meaning ==
                          "We didn't understand your entry. Please search again." ? (
                          <div className="flex flex-row">
                            <div key={i} className="font-voces text-red-500">
                              {meaning}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row">
                            <div className="font-voces text-blue-800 font-bold">
                              {i + 1}&nbsp;
                            </div>
                            <div key={i} className="font-voces">
                              {meaning}
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* End of Meaning */}
        </div>

        <div className="w-full bg-blue-800 h-20 flex flex-col justify-center items-center gap-y-4 text-white py-24 sm:py-16">
          <a href="https://github.com/Fynmn/definr" target="_blank">
            <span className="flex flex-col sm:flex-row justify-center items-center gap-x-1 hover:text-blue-200 active:animate-ping text-xs sm:text-base">
              <div className="flex items-center gap-x-1">
                <p>Give the repository of this project a</p>
                <span className="text-yellow-400">
                  <GiRoundStar />
                </span>
                <p>on</p>
                <FaGithub />
              </div>
              <div>
                <p>you amazing hooman 😎</p>
              </div>
            </span>
          </a>
          <span class="flex flex-wrap justify-center px-16 items-center">
            <p class="mr-1">Copyright</p>
            <p class="text-lg mr-1 flex">©</p>
            <p class="mr-1">2023 Definr.</p>
            <p class="">All rights reserved.</p>
          </span>
        </div>
      </div>
    </>
  );
}
