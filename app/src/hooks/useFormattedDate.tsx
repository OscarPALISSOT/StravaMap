import { useState, useEffect } from "react";

const useFormattedDate = (date: number) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(
        () => setFormattedDate(new Date(date).toLocaleDateString()),
        []
    );

    return formattedDate;
};

export default useFormattedDate;