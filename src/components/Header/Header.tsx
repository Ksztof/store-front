import Navbar from "../navbar/Navbar"
import styles from "./Header.module.scss";
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Navbar />
        </header>
    )
}