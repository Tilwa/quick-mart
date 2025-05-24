import AllProductsTable from "@/app/ui/allProductsTable/AllProductsTable";
import "./page.css";

function Page() {
  return (
    <div className="all-products-container">
      <div className="all-products-card">
        <div className="all-products-top">top</div>
        <div className="all-products-middle">
          <AllProductsTable />
        </div>

        <div className="all-products-bottom">bottom</div>
      </div>
    </div>
  );
}

export default Page;
