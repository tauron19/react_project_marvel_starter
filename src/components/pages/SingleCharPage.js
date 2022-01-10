import './singleCharPage.scss';
import { useParams, Link} from 'react-router-dom'

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {error, loading, clearError, getCharacter} = useMarvelService()


    useEffect(() =>{
        updateChar()
    }, [charId])

    
    const updateChar = () =>{
        clearError();
        getCharacter(charId)
        .then(onCharLoaded)
        
    }
    
    const onCharLoaded = (char) => {
        setChar(char);
      
    }

    
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/>: null;
        const content = !(loading || error || !char) ? <View char={char}/> :null


    return (
        <>
        
        {errorMessage}
        {spinner}
        {content}
         </>

    )          
}

const View = ({char}) => {
    const {thumbnail, name, description } = char;


    return(
        
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        <Link to="/" className="single-char__back">Back to all</Link>
    </div>
    
)

}

export default SingleCharPage;