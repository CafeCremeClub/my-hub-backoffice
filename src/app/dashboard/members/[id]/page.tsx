import React, {use} from 'react';
import MemberDetailsContent from "@/components/dashboard/members/MemberDetailsContent";

interface MemberDetailsPageProps {
    params: Promise<{
        id: string;
    }>
}

const MemberDetailsPage = ({params}: MemberDetailsPageProps) => {

    const {id} = use(params)

    return (
        <MemberDetailsContent id={id}/>
    );
};

export default MemberDetailsPage;