'use client';

import { useProfile } from "@/modules/profile/hooks";

const page = () => {
    const { data, isLoading, isError } = useProfile();
    console.log(data, 'profile data');
    return (
        <div>
            this is profile page
        </div>
    );
};

export default page;