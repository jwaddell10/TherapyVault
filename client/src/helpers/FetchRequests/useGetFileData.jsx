import { useState, useEffect } from "react";

export default function useGetFileData(fileId) {
    const [fileData, setFileData] = useState(null);
    useEffect(() => {
        const fetchFileData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/worksheet/${
                    fileId.worksheetId
                }`
            );
            const data = await response.json();
            // console.log(data.title, "data tile");
            setFileData(data);
        };
        fetchFileData();
    }, []);

    return { fileData }
}