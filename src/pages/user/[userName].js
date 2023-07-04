import { useRouter } from "next/router"

export default function UserDetailPage() {
    const router = useRouter();
    const userName = router.query.userName;
    return (
        <Box>

        </Box>
    )
}
