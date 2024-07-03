"use server"

import { httpSever } from "../instance/http";

export const getAllToursServer = async (page:number =1 , pageSize:number =10) => {
    
    const res = await httpSever.get(
        `/tour/all?pageNo=${page}&pageSize=${pageSize}`,
        {
            cache: 'no-store',
        },
    );
    return { data :res.payload };
}
    