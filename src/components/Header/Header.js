// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';
import citiBandLogo from '../../images/citiBandLogo.png';

export const Header = () => (
    <div>
        Header <img className="m-3" height="72" src={citiBandLogo} alt="Citi Band Logo" />
    </div>
);