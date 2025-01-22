import React, { useEffect, useState } from "react";

function HomePage({userId}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/api/users-template/${userId}`)
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch(() => {
            // Gérer les erreurs, par exemple en définissant des valeurs par défaut
            setData({});
          });
    }, [userId]);

    // Valeurs par défaut
    const defaultData = {
        headerColor: "#f0f0f0",
        headerTitle: "Bienvenue sur mon site",
        mainContent: "Contenu par défaut en cours de chargement.",
        footerContent: "© 2025 Mon Site",
    };

    const finalData = {
        headerColor: data?.headerColor ?? defaultData.headerColor,
        headerTitle: data?.headerTitle ?? defaultData.headerTitle,
        mainContent: data?.mainContent ?? defaultData.mainContent,
        footerContent: data?.footerContent ?? defaultData.footerContent,
    };

    if (!data) return <p>Chargement...</p>;

    return (
        <div>
            <header style={{ backgroundColor: finalData.headerColor }}>
                <h1>{finalData.headerTitle}</h1>
            </header>
            <main>
                <p>{finalData.mainContent}</p>
            </main>
            <footer>
                <p>{finalData.footerContent}</p>
            </footer>
        </div>
    )
}

export default HomePage