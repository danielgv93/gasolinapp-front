import {Skeleton} from "@mantine/core";

export const DefaultSkeleton = () => {
    return (
        <>
            <Skeleton height={30} mt={26} radius="xl" />
            <Skeleton height={18} mt={26} width="70%" radius="xl" />
            <Skeleton height={30} mt={26} radius="xl" />
            <Skeleton height={18} mt={26} width="70%" radius="xl" />
            <Skeleton height={30} mt={26} radius="xl" />
            <Skeleton height={18} mt={26} width="70%" radius="xl" />
        </>
    )
}