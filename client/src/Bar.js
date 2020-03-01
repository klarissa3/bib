
import React, { Component } from 'react';
import maitre from './maitre.jpg';
import bib from './bib.jpg';
import x from './x.png';

class Header extends Component {
    render(){
      return(
        
        <header class="header-wrapper">
             <nav class="navbar">
                <a class="navbar-brand">
                    <img class="logo maitre" src={maitre}/>
                    <img class="logo x" src={x}/>
                    <img class="logo bib" src={bib}/>
                </a>
                <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">List</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Map
                            </a>
                        </li>
                    </ul>
                <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
             </nav>
        </header>
       
     
      );
  
    }
    
  }

  export default Header;