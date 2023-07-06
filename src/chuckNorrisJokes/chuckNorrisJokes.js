import React, { useEffect, useState } from 'react';
import './chuckNorrisJokes.css';

function ChuckNorrisJokes() {
  const [categories, setCategories] = useState([]);
  const [joke, setJoke] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchJokeByCategory = async (category) => {
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
      const data = await response.json();
      setJoke(data.value);
      setShowDialog(true);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const handleNextJoke = () => {
    fetchJokeByCategory(categories[Math.floor(Math.random() * categories.length)]);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const capitalizeFirstWord = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1) ;
  }


  return (
    <>
    <div className='container'>
        <div className='header'>
            <h1>Chuck Norris Jokes</h1>
        </div>
        <div className="grid-container">
            {categories.map((category, index) => (
                <div className="joke-card" key={index} onClick={() => fetchJokeByCategory(category)}>
                <div className="joke-category">{capitalizeFirstWord(category)}</div>
                </div>
            ))}
            {showDialog && (
                <div className="dialog-box">
                <div className="dialog-content">
                    <div className="joke-text">{joke}</div>
                    <div className='buttons'> 
                        <button className="next-joke-button" onClick={handleNextJoke}>
                            Next Joke
                        </button>
                        <button className="close-button" onClick={handleCloseDialog}>
                            Close
                        </button>
                    </div>
                    
                </div>
        </div>
      )}
    </div>

    </div>
    
    
    </>
    
  );
}

export default ChuckNorrisJokes;
