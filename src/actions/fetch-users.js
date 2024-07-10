'use server'

export async function fetchProducts(page, limit) {
    const skip = (page - 1) * limit;
    const apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,description`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}