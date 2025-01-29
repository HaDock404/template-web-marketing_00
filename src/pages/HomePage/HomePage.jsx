import React, { useEffect, useState } from "react";

function HomePage({userId}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    /*useEffect(() => {
        //fetch(`http://localhost:3001/api/users-template/${userId}`)
        fetch(`http://localhost:3001/api/templates`)
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch(() => {
            // Gérer les erreurs, par exemple en définissant des valeurs par défaut
            setData({});
          });
    }, [userId]);
    */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/templates`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                setData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    //console.log(data)

    // Valeurs par défaut
    const defaultData = {
        headerColor: "#f0f0f0",
        name: "Bienvenue sur mon site",
        data_00: "Contenu par défaut en cours de chargement.",
        footerContent: "© 2025 Mon Site",
    };

    const finalData = {
        headerColor: data?.headerColor ?? defaultData.headerColor,
        name: Array.isArray(data) && data.length > 0 ? data[2]?.name : defaultData.name,
        data_00: Array.isArray(data) && data.length > 0 ? data[2]?.data_00 : defaultData.data_00,
        footerContent: data?.footerContent ?? defaultData.footerContent,
    };

    if (!data) return <p>Chargement...</p>;

    return (
        <div>
            <header style={{ backgroundColor: finalData.headerColor }}>
                <h1>{finalData.name}</h1>
            </header>
            <main>
                <p>{finalData.data_00}</p>
            </main>
            <footer>
                <p>{finalData.footerContent}</p>
            </footer>
        </div>
    )
}

export default HomePage