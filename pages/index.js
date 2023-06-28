import { useContext, useEffect, useState } from "react";
import data from "../src/data.json";
import Modal from "../components/Modal";
import { ModalContext } from "../contexts/ModalContext";

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
      const output = await renderMeaning(input);
      setMeaning(output);
    } else {
      // toggleValue();
      setValue(true);
    }
  };

  return (
    <>
      {value ? <Modal></Modal> : null}
      {/* Search */}
      <div className="mt-20 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-center items-center space-x-2"
        >
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter word to search here"
            className="input input-bordered input-primary w-full max-w-xs border-4 border-pink-300 p-2"
            onChange={(e) => setInput(e.target.value)}
          />
          {/* Search Button */}
          <input
            type="submit"
            value="Search"
            className="w-52 p-2 rounded-lg text-white bg-pink-300 hover:bg-pink-400 active:bg-pink-500 focus:outline-none focus:ring focus:ring-pink-300"
          />
        </form>
        {/* <Modal></Modal> */}
      </div>
      {/* End of Search */}

      {/* Meaning */}
      {meaning == null ? (
        <div></div>
      ) : (
        <div className="mt-5 flex flex-row justify-center items-center">
          <div className="card w-96 bg-base-100 shadow-xl border-2 border-gray-100">
            <div className="card-body">
              <h2 className="font-voces card-title text-pink-500">
                {input && input}
              </h2>
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
                      <div className="font-voces text-pink-400 font-bold">
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
      {/* End of Meaning */}
    </>
  );
}
