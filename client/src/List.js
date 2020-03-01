
import React, { Component } from 'react';
import data from './maitrebib.json';



class List extends Component {
  
  render() {
    return (
        <div className="restaurant">
            {data.map((details,index) => {
                return <div>
                    <h1>{details.name}</h1>
                    <p>{details.adress}</p>
                    <p>{details.price}</p>
                    <p>{details.type}</p>
                    <p>{details.number}</p>
                    </div>
                
            })}
        </div>                   
        );
  }
  
}

export default List;