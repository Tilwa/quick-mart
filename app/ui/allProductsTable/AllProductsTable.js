"use client";

import { useQuery } from "@tanstack/react-query";
import "./AllProductsTable.css";
import { getProducts } from "@/app/_hooks/product/useFetchProduct";
import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import TableRow from "./TableRow";

function AllProductsTable() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
    staleTime: 0,
  });

  console.log(products);

  if (isLoading) return <SpinnerMini />;
  return (
    <div className="all-products-table">
      <table className="all-products-table-main">
        <thead>
          <tr className="all-products-table-row">
            <th className="all-products-table-heading">
              <input type="checkbox" />
            </th>
            <th className="all-products-table-heading">Id</th>
            <th className="all-products-table-heading">Title</th>
            <th className="all-products-table-heading">Description</th>
            <th className="all-products-table-heading">Brand</th>
            <th className="all-products-table-heading">Category</th>
            <th className="all-products-table-heading">OfferPrice</th>
            <th className="all-products-table-heading">Price</th>
            <th className="all-products-table-heading">InStock</th>
            <th className="all-products-table-heading">Image1</th>
            <th className="all-products-table-heading">Image2</th>
            <th className="all-products-table-heading">Image3</th>
            <th className="all-products-table-heading">Image4</th>
            <th className="all-products-table-heading">Image5</th>
            <th className="all-products-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.products?.map((product) => (
            <TableRow product={product} key={product.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProductsTable;
