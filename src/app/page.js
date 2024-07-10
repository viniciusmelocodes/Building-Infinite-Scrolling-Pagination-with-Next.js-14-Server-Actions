"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/actions/fetch-users";
import Card from "./Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreData = async () => {
    setIsLoading(true);
    const moreData = await fetchProducts(page + 1, 10);

    console.log(moreData);
    setData((currentData) => [...currentData, ...moreData.products]);
    setPage((currentPage) => currentPage + 1);
    setIsLoading(false);
  };

  const onScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      console.log(
        window.innerHeight,
        window.scrollY,
        window.innerHeight + window.scrollY,
        document.body.offsetHeight,
        document.body.offsetHeight - 100,
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      );
      await loadMoreData();
    }
  };

  useEffect(() => {
    const fetcthData = async () => {
      const initialData = await fetchProducts(page, 10);
      setData(initialData.products);
    };

    fetcthData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading, page]);

  return (
    <div>
      {data?.map((item) => (
        <Card key={item.id} title={item.title} description={item.description} />
      ))}
      {isLoading && <p>Loading more data...</p>}
    </div>
  );
};

export default Home;
