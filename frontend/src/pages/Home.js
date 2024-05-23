import { Fragment, useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import { useSearchParams } from "react-router-dom";

export default function Home(){
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Log the searchParams value to the console for debugging
        console.log("SearchParams:", searchParams.toString());

        // Make the fetch request using searchParams
        fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
            .then(res => res.json())
            .then(res => setProducts(res.products))
            .catch(error => console.error('Error fetching products:', error));
    }, [searchParams]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map(product => <ProductCart key={product._id} product={product} />)}
                </div>
            </section>
        </Fragment>
    );
}
