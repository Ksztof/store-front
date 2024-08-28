import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { getProducts } from "../../redux/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ProductDetails } from "../../types/productTypes";
import { Product } from "../product/Product";
import styles from './Products.module.scss';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PRODUCTS_PER_PAGE = 3;
const LOCAL_STORAGE_KEY = 'currentPage';

export const Products: React.FC = () => {
    const dispatch = useAppDispatch();
    const isDataLoading = useSelector((state: RootState) => state.product.loading);
    const products = useSelector((state: RootState) => state.product.productsData);

    const [currentPage, setCurrentPage] = useState<number>(() => {
        const savedPage = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    useEffect(() => {
        if (!isDataLoading) {
            dispatch(getProducts());
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, currentPage.toString());
    }, [currentPage]);

    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const handleNextPage = () => {
        if (indexOfLastProduct < products.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.productsContainer}>
            {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
                <>
                    {currentProducts.map((product: ProductDetails) => (
                        <Product key={product.id} productId={product.id} />
                    ))}
                </>
            ) : (
                <p>No available products</p>
            )}

            <div className={styles.paginationContainer}>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                >
                    <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.activePage : ''}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};
