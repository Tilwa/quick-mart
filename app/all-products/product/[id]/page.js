"use client";

import { useState, useMemo } from "react";
import "./page.css";
import { getProductById } from "@/app/_hooks/product/useGetProductById";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Header from "@/app/_components/header/Header";
import Footer from "@/app/_components/footer/Footer";
import { usePlaceOrder } from "@/app/_hooks/order/usePlaceOrder";
import Image from "next/image";

function ProductPage() {
  const pathname = usePathname();
  const productId = Number(pathname.split("/").pop());
  const formattedPath = pathname.slice(14).split("/").join(" / ");

  function useProduct(productId) {
    return useQuery({
      queryKey: ["product", productId],
      queryFn: () => getProductById(productId),
      enabled: !!productId,
    });
  }

  const { data: product, isLoading: isFetching, error } = useProduct(productId);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fixDriveUrl = (url) => {
    if (!url) return null;
    const match = url.match(/id=([^&]+)/);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : url;
  };

  const variants = useMemo(() => {
    if (!product) return [];

    const images = [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      product.image5,
    ].filter(Boolean);

    const colors = product.colors?.map((c) => c.color.name) || [];
    const sizes = product.sizes?.map((s) => s.size.label) || [];

    const maxLength = Math.max(images.length, colors.length, sizes.length);

    return Array.from({ length: maxLength }).map((_, i) => ({
      image: fixDriveUrl(images[i]),
      color: colors[i] || null,
      size: sizes[i] || null,
    }));
  }, [product]);

  // console.log("Variants:", variants);

  const selectedVariant = variants[selectedIndex] || {};

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    quantity: "",
    emirate: "",
    address: "",
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      variant: selectedVariant,
      productId: product.id,
      productTitle: product.title,
      price: product.price,
    };

    placeOrder(orderData, {
      onSuccess: (res) => {
        alert("Order placed successfully!");
        console.log(res);
      },
      onError: (err) => {
        alert("Failed to place order.");
        console.error(err);
      },
    });
  };

  const { mutate: placeOrder, isPending, isSuccess } = usePlaceOrder();

  if (isFetching) return <p>Loading...</p>;
  if (error || !product) return <p>Product not found.</p>;

  return (
    <div className="product-page">
      <Header />
      <div id="product-path">
        {formattedPath.charAt(0).toUpperCase().concat(formattedPath.slice(1))}
      </div>

      <div className="product-container">
        <div className="product-left">
          <div className="image-thumbs-column">
            {variants.map((v, i) => (
              <img
                key={i}
                src={v.image}
                onClick={() => setSelectedIndex(i)}
                className={i === selectedIndex ? "active" : ""}
                alt={`variant-${i}`}
              />
            ))}
          </div>

          <div className="main-image-frame">
            <img
              src={selectedVariant.image}
              alt="Main Variant"
              className="main-image"
              onClick={() => window.open(selectedVariant.image, "_blank")}
            />
            <button
              className="zoom-btn"
              onClick={() => window.open(selectedVariant.image, "_blank")}
            >
              🔍 Zoom
            </button>
          </div>
        </div>

        <div className="product-right">
          <h2>{product.title}</h2>
          <p className="sold">{product.category} </p>
          <p className="price">
            {product.offerPrice} AED <span>{product.originalPrice} AED</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              required
              value={form.name}
              onChange={handleInput}
            />
            <input
              type="tel"
              placeholder="+971 Mobile"
              name="mobile"
              required
              value={form.mobile}
              onChange={handleInput}
            />

            <select
              name="quantity"
              required
              value={form.quantity}
              onChange={handleInput}
            >
              <option value="">-Select Quantity-</option>
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>

            <select
              name="emirate"
              required
              value={form.emirate}
              onChange={handleInput}
            >
              <option value="">-Select Emirate-</option>
              {["Dubai", "Abu Dhabi", "Sharjah", "Ajman"].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>

            <textarea
              name="address"
              placeholder="Delivery Address"
              required
              value={form.address}
              onChange={handleInput}
            ></textarea>

            <div className="attribute-selectors">
              <label>
                Color:
                <select
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                  {variants.map((v, i) => (
                    <option key={i} value={i}>
                      {v.color || `Variant ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Size:
                <select
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                  {variants.map((v, i) => (
                    <option key={i} value={i}>
                      {v.size || `Variant ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit">SUBMIT ORDER</button>
          </form>
        </div>
      </div>

      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      <Footer />
    </div>
  );
}

export default ProductPage;
