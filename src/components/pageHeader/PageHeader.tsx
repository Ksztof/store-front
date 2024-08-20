import Navbar from "../navbars/Navbar"
import styles from "./PageHeader.module.scss";
import React from 'react';

export const PageHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <Navbar />
        </header>
    )
}