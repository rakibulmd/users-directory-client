import axios from "axios";
import { useEffect } from "react";

const usePageCount = (setPageCount, pageSize, setUserCount) => {
    let userCount;
    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get(
                `https://assessment-project-server.herokuapp.com/customerCount`
            );
            setPageCount(Math.ceil(data.count / pageSize));
            userCount = data.count;
            setUserCount(userCount);
        };
        get();
    }, [pageSize, setPageCount, setUserCount]);
    return userCount;
};

export default usePageCount;
