import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "./SearchForm.css";
import { Configuration, OpenAIApi } from "openai"; //configuration and OpenAIApi imported from openai

function SearchForm() {
  //two usesate create on efor searching question and second for result
  const [searchTerm, setSearchTerm] = useState("");   // search
  const [searchResults, setSearchResults] = useState(null); //Result

  //cofiguration of apikey which is inside .env.loacl file
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  // openai basepath detected from configuration 
  const openai = new OpenAIApi(configuration);
  
// button click function with async and await 
  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: searchTerm,  // searchTerm means passing the question from here 
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      });
      setSearchResults(response.data.choices[0].text.trim()); // getting response in serSearchResults from api =>comes from chatGPT
   
  };

  return (
    <div className="search-form-container">
      {/* Form Start */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="searchTerm">
          <Form.Label className="form-label">Search Term</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="form-button">
          <BsSearch /> Search
        </Button>
      </Form>
      {/* Form End */}

      {/* Result comes from searchResult -----  {{ condition if we are getting value in searchResult then send into p tag }}*/}
      {searchResults && (
        <div className="search-results-container">
          <h3>{`Search results for " ${searchTerm} "`}</h3>
          <p>{searchResults}</p>
        </div>
      )}
      {/* Result End  */}
    </div>
  );
}

export default SearchForm;
