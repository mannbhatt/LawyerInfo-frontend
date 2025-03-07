
export const fetchProtectedData = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No token found, please log in.");
    return null; 
  }

  try {
    const response = await fetch("http://localhost:5000/protected", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch protected data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    return null;
  }
};
