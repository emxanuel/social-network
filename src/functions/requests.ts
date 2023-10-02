import axios from "axios";
import { country } from "../types";

const getCountries = async (
    setCountries: React.Dispatch<React.SetStateAction<country[]>>
) => {
    try {
        const request = await axios.get(
            "https://restcountries.com/v3.1/all?fields=name"
        );
        setCountries(request.data);
    } catch (e) {
        console.log(e);
    }
};

export { getCountries };
